import { NextResponse } from 'next/server';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import sharp from 'sharp';

export const runtime = 'nodejs';

interface UploadImagePayload {
  fileName: string;
  mimeType: string;
  base64Data: string;
}

interface UploadImagesRequestBody {
  accessToken?: string;
  image?: UploadImagePayload;
  images?: UploadImagePayload[];
}

type SupabaseClientResult =
  | { ok: true; supabase: SupabaseClient }
  | { ok: false; error: string };

const AVIF_QUALITY = 62;

const replaceExtensionWithAvif = (fileName: string) => {
  const trimmed = fileName.trim();
  const withoutExtension = trimmed.replace(/\.[a-z0-9]+$/i, '');
  const fallback = withoutExtension.length > 0 ? withoutExtension : 'imagem';
  return `${fallback}.avif`;
};

const convertBase64ImageToAvif = async (base64Data: string) => {
  const inputBuffer = Buffer.from(base64Data, 'base64');
  const avifBuffer = await sharp(inputBuffer)
    .rotate()
    .avif({ quality: AVIF_QUALITY, effort: 4 })
    .toBuffer();

  return avifBuffer.toString('base64');
};

const ALLOWED_ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? 'gustavohmssilva13@gmail.com')
  .split(',')
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

/** Client that uses the service role key — bypasses RLS, server-side only. */
const createServiceClient = (): SupabaseClientResult => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return {
      ok: false,
      error:
        'Supabase service role key não configurada no ambiente. Adicione SUPABASE_SERVICE_ROLE_KEY nas variáveis de ambiente do servidor.',
    } as const;
  }

  return {
    ok: true,
    supabase: createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    }),
  } as const;
};

/** Client that uses the user JWT — respects RLS, used only for identity verification. */
const createUserClient = (accessToken: string): SupabaseClientResult => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !anonKey) {
    return { ok: false, error: 'Supabase não configurado no ambiente.' } as const;
  }

  return {
    ok: true,
    supabase: createClient(supabaseUrl, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: `Bearer ${accessToken}` } },
    }),
  } as const;
};

/** Verifies the access token and returns the user's email, or an error string. */
async function verifyAdminToken(accessToken: string): Promise<{ email: string } | { error: string }> {
  const client = createUserClient(accessToken);
  if (!client.ok) return { error: client.error };

  const { data: { user }, error } = await client.supabase.auth.getUser();

  if (error || !user?.email) {
    return { error: 'Sessão inválida ou expirada. Faça login novamente.' };
  }

  const email = user.email.trim().toLowerCase();

  // First check: hardcoded allow-list
  if (ALLOWED_ADMIN_EMAILS.includes(email)) {
    return { email };
  }

  // Second check: admins table
  const serviceClient = createServiceClient();
  if (!serviceClient.ok) return { error: serviceClient.error };

  const { data: adminRow } = await serviceClient.supabase
    .from('admins')
    .select('email')
    .ilike('email', email)
    .maybeSingle();

  if (!adminRow) {
    return { error: `Acesso negado. O e-mail "${email}" não está autorizado como admin.` };
  }

  return { email };
}

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

    const auth = await verifyAdminToken(accessToken);
    if ('error' in auth) {
      return NextResponse.json({ error: auth.error }, { status: 403 });
    }

    const client = createServiceClient();
    if (!client.ok) {
      return NextResponse.json({ error: client.error }, { status: 500 });
    }

    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;

    const { data, error, count } = await client.supabase
      .from('post_images')
      .select('id, file_name, mime_type, base64_data, created_at', { count: 'exact' })
      .order('id', { ascending: false })
      .range(start, end);

    if (error) {
      const missingImagesTable =
        error.code === 'PGRST205' ||
        (error.message.toLowerCase().includes('public.post_images') &&
          error.message.toLowerCase().includes('schema cache'));

      if (missingImagesTable) {
        return NextResponse.json(
          { error: 'Tabela public.post_images nao encontrada. Execute o script supabase/images_schema.sql no SQL Editor e tente novamente.' },
          { status: 500 }
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

    return NextResponse.json({ items, page, pageSize, total, totalPages });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro inesperado ao carregar imagens.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as UploadImagesRequestBody;
    const accessToken = body?.accessToken;

    const inputImages = body.images ?? (body.image ? [body.image] : []);

    if (inputImages.length === 0) {
      return NextResponse.json({ error: 'Dados da imagem ausentes.' }, { status: 400 });
    }

    if (inputImages.length > 20) {
      return NextResponse.json({ error: 'Envie no maximo 20 imagens por vez.' }, { status: 400 });
    }

    if (!accessToken) {
      return NextResponse.json({ error: 'Sessao expirada. Faca login novamente.' }, { status: 401 });
    }

    const auth = await verifyAdminToken(accessToken);
    if ('error' in auth) {
      return NextResponse.json({ error: auth.error }, { status: 403 });
    }

    const maxSizeInBytes = 5 * 1024 * 1024;
    for (const payload of inputImages) {
      if (!payload?.fileName || !payload?.mimeType || !payload?.base64Data) {
        return NextResponse.json({ error: 'Dados da imagem ausentes.' }, { status: 400 });
      }

      if (!payload.mimeType.startsWith('image/')) {
        return NextResponse.json({ error: `Formato de arquivo invalido: ${payload.fileName}` }, { status: 400 });
      }

      const estimatedSizeInBytes = Math.floor((payload.base64Data.length * 3) / 4);
      if (estimatedSizeInBytes > maxSizeInBytes) {
        return NextResponse.json(
          { error: `A imagem ${payload.fileName} deve ter no maximo 5MB.` },
          { status: 400 }
        );
      }
    }

    const client = createServiceClient();
    if (!client.ok) {
      return NextResponse.json({ error: client.error }, { status: 500 });
    }

    const rows = await Promise.all(
      inputImages.map(async (payload) => ({
        file_name: replaceExtensionWithAvif(payload.fileName),
        mime_type: 'image/avif',
        base64_data: await convertBase64ImageToAvif(payload.base64Data),
      }))
    );

    const { data, error } = await client.supabase
      .from('post_images')
      .insert(rows)
      .select('id');

    if (error) {
      const missingImagesTable =
        error.code === 'PGRST205' ||
        (error.message.toLowerCase().includes('public.post_images') &&
          error.message.toLowerCase().includes('schema cache'));

      if (missingImagesTable) {
        return NextResponse.json(
          { error: 'Tabela public.post_images nao encontrada. Execute o script supabase/images_schema.sql no SQL Editor e tente novamente.' },
          { status: 500 }
        );
      }

      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const createdIds = (data ?? []).map((item) => item.id);

    if (createdIds.length === 0) {
      return NextResponse.json({ error: 'Nenhuma imagem foi salva.' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      ids: createdIds,
      id: createdIds[0],
      count: createdIds.length,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro inesperado ao enviar imagem.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
