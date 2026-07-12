import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

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

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'ID da imagem ausente.' }, { status: 400 });
    }

    const client = createPublicSupabaseClient();

    if ('error' in client) {
      return NextResponse.json({ error: client.error }, { status: 500 });
    }

    const { data, error } = await client.supabase
      .from('post_images')
      .select('mime_type, base64_data')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Imagem nao encontrada.' }, { status: 404 });
    }

    const binary = Buffer.from(data.base64_data, 'base64');

    return new NextResponse(binary, {
      status: 200,
      headers: {
        'Content-Type': data.mime_type,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro inesperado ao carregar imagem.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
