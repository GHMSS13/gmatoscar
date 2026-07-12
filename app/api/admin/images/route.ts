import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

interface UploadImagePayload {
  fileName: string;
  mimeType: string;
  base64Data: string;
}

const createAuthorizedSupabaseClient = (accessToken: string) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return { error: 'Supabase nao configurado no ambiente.' } as const;
  }

  return {
    supabase: createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      global: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    }),
  } as const;
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, Number(searchParams.get('page') ?? '1'));
    const pageSize = Math.min(50, Math.max(1, Number(searchParams.get('pageSize') ?? '10')));

    const authorizationHeader = request.headers.get('authorization');
    const accessToken = authorizationHeader?.startsWith('Bearer ')
      ? authorizationHeader.slice('Bearer '.length)
      : undefined;

    if (!accessToken) {
      return NextResponse.json({ error: 'Sessao expirada. Faca login novamente.' }, { status: 401 });
    }

    const client = createAuthorizedSupabaseClient(accessToken);

    if ('error' in client) {
      return NextResponse.json({ error: client.error }, { status: 500 });
    }

    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;

    const { data, error, count } = await client.supabase
      .from('post_images')
      .select('id, file_name, mime_type, base64_data, created_at', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(start, end);

    if (error) {
      const missingImagesTable =
        error.code === 'PGRST205' ||
        (error.message.toLowerCase().includes('public.post_images') &&
          error.message.toLowerCase().includes('schema cache'));

      if (missingImagesTable) {
        return NextResponse.json(
          {
            error:
              'Tabela public.post_images nao encontrada. Execute o script supabase/images_schema.sql no SQL Editor e tente novamente.',
          },
          { status: 500 }
        );
      }

      const rlsDenied =
        error.code === '42501' || error.message.toLowerCase().includes('row-level security');

      if (rlsDenied) {
        return NextResponse.json(
          {
            error:
              'Permissao negada para listar imagens. Verifique se seu email esta na tabela admins e se as policies RLS da tabela post_images foram aplicadas.',
          },
          { status: 403 }
        );
      }

      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const items = (data ?? []).map((item) => ({
      id: item.id,
      file_name: item.file_name,
      mime_type: item.mime_type,
      created_at: item.created_at,
      image_url: `/api/images/${item.id}`,
      preview_data_url: `data:${item.mime_type};base64,${item.base64_data}`,
    }));

    const total = count ?? 0;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    return NextResponse.json({
      items,
      page,
      pageSize,
      total,
      totalPages,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro inesperado ao carregar imagens.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = body as UploadImagePayload | undefined;
    const accessToken = body?.accessToken as string | undefined;

    if (!payload?.fileName || !payload?.mimeType || !payload?.base64Data) {
      return NextResponse.json({ error: 'Dados da imagem ausentes.' }, { status: 400 });
    }

    if (!accessToken) {
      return NextResponse.json({ error: 'Sessao expirada. Faca login novamente.' }, { status: 401 });
    }

    if (!payload.mimeType.startsWith('image/')) {
      return NextResponse.json({ error: 'Formato de arquivo invalido.' }, { status: 400 });
    }

    const estimatedSizeInBytes = Math.floor((payload.base64Data.length * 3) / 4);
    const maxSizeInBytes = 5 * 1024 * 1024;

    if (estimatedSizeInBytes > maxSizeInBytes) {
      return NextResponse.json({ error: 'A imagem deve ter no maximo 5MB.' }, { status: 400 });
    }

    const client = createAuthorizedSupabaseClient(accessToken);

    if ('error' in client) {
      return NextResponse.json({ error: client.error }, { status: 500 });
    }

    const { data, error } = await client.supabase
      .from('post_images')
      .insert([
        {
          file_name: payload.fileName,
          mime_type: payload.mimeType,
          base64_data: payload.base64Data,
        },
      ])
      .select('id')
      .single();

    if (error) {
      const missingImagesTable =
        error.code === 'PGRST205' ||
        (error.message.toLowerCase().includes('public.post_images') &&
          error.message.toLowerCase().includes('schema cache'));

      if (missingImagesTable) {
        return NextResponse.json(
          {
            error:
              'Tabela public.post_images nao encontrada. Execute o script supabase/images_schema.sql no SQL Editor e tente novamente.',
          },
          { status: 500 }
        );
      }

      const rlsDenied =
        error.code === '42501' || error.message.toLowerCase().includes('row-level security');

      if (rlsDenied) {
        return NextResponse.json(
          {
            error:
              'Permissao negada para salvar imagem. Verifique se seu email esta na tabela admins e se as policies RLS da tabela post_images foram aplicadas.',
          },
          { status: 403 }
        );
      }

      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro inesperado ao enviar imagem.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
