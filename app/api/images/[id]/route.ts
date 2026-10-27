import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp';

export const runtime = 'nodejs';

const MAX_RESPONSIVE_IMAGE_WIDTH = 3840;
const AVIF_QUALITY = 62;

const createPublicSupabaseClient = () => {
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
    }),
  } as const;
};

const sanitizeFileName = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const requestedFileName = searchParams.get('filename')?.trim() ?? '';
    const requestedWidth = searchParams.get('width');

    if (!id) {
      return NextResponse.json({ error: 'ID da imagem ausente.' }, { status: 400 });
    }

    const client = createPublicSupabaseClient();

    if ('error' in client) {
      return NextResponse.json({ error: client.error }, { status: 500 });
    }

    const { data, error } = await client.supabase
      .from('post_images')
      .select('file_name, mime_type, base64_data')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Imagem nao encontrada.' }, { status: 404 });
    }

    const binary = Buffer.from(data.base64_data, 'base64');
    let responseBody = binary;
    let contentType = data.mime_type;

    if (requestedWidth !== null) {
      const width = Number(requestedWidth);

      if (!Number.isInteger(width) || width < 1 || width > MAX_RESPONSIVE_IMAGE_WIDTH) {
        return NextResponse.json({ error: 'Largura da imagem inválida.' }, { status: 400 });
      }

      responseBody = await sharp(binary)
        .rotate()
        .resize(width, undefined, { withoutEnlargement: true })
        .avif({ quality: AVIF_QUALITY, effort: 4 })
        .toBuffer();
      contentType = 'image/avif';
    }

    const fallbackName = sanitizeFileName(data.file_name ?? 'imagem');
    const safeName = sanitizeFileName(requestedFileName) || fallbackName || 'imagem';

    return new NextResponse(responseBody, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Disposition': `inline; filename="${safeName}"`,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro inesperado ao carregar imagem.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
