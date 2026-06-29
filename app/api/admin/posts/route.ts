import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

interface PostPayload {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  read_time: string;
  image_url: string;
  external_url: string | null;
  featured: boolean;
  hot: boolean;
  published: boolean;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const post = body?.post as PostPayload | undefined;
    const accessToken = body?.accessToken as string | undefined;

    if (!post) {
      return NextResponse.json({ error: 'Payload de post ausente.' }, { status: 400 });
    }

    if (!accessToken) {
      return NextResponse.json({ error: 'Sessao expirada. Faca login novamente.' }, { status: 401 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ error: 'Supabase nao configurado no ambiente.' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      global: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });

    const { error } = await supabase.from('posts').insert([post]);

    if (error) {
      const missingPostsTable =
        error.code === 'PGRST205' ||
        (error.message.toLowerCase().includes('public.posts') &&
          error.message.toLowerCase().includes('schema cache'));

      if (missingPostsTable) {
        return NextResponse.json(
          {
            error:
              "Tabela public.posts nao encontrada no Supabase. Execute o script supabase/posts_schema.sql no SQL Editor e tente novamente.",
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
              'Permissao negada para inserir post. Verifique se seu email esta na tabela admins e se as policies RLS da tabela posts foram aplicadas.',
          },
          { status: 403 }
        );
      }

      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro inesperado ao criar post.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
