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
    const postId = searchParams.get('postId');
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

    if (!postId) {
      const { data, error } = await client.supabase
        .from('posts')
        .select('id, title, slug, category, date, published')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) {
        const rlsDenied =
          error.code === '42501' || error.message.toLowerCase().includes('row-level security');

        if (rlsDenied) {
          return NextResponse.json(
            {
              error:
                'Permissao negada para listar posts. Verifique se seu email esta na tabela admins e se as policies RLS da tabela posts foram aplicadas.',
            },
            { status: 403 }
          );
        }

        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json(data);
    }

    const { data, error } = await client.supabase.from('posts').select('*').eq('id', postId).single();

    if (error) {
      const rlsDenied =
        error.code === '42501' || error.message.toLowerCase().includes('row-level security');

      if (rlsDenied) {
        return NextResponse.json(
          {
            error:
              'Permissao negada para carregar post. Verifique se seu email esta na tabela admins e se as policies RLS da tabela posts foram aplicadas.',
          },
          { status: 403 }
        );
      }

      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro inesperado ao carregar post.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
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

    const client = createAuthorizedSupabaseClient(accessToken);

    if ('error' in client) {
      return NextResponse.json({ error: client.error }, { status: 500 });
    }

    const { error } = await client.supabase.from('posts').insert([post]);

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

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const post = body?.post as PostPayload | undefined;
    const postId = body?.postId as string | undefined;
    const accessToken = body?.accessToken as string | undefined;

    if (!post) {
      return NextResponse.json({ error: 'Payload de post ausente.' }, { status: 400 });
    }

    if (!postId) {
      return NextResponse.json({ error: 'ID do post ausente.' }, { status: 400 });
    }

    if (!accessToken) {
      return NextResponse.json({ error: 'Sessao expirada. Faca login novamente.' }, { status: 401 });
    }

    const client = createAuthorizedSupabaseClient(accessToken);

    if ('error' in client) {
      return NextResponse.json({ error: client.error }, { status: 500 });
    }

    const { error } = await client.supabase
      .from('posts')
      .update(post)
      .eq('id', postId);

    if (error) {
      const rlsDenied =
        error.code === '42501' || error.message.toLowerCase().includes('row-level security');

      if (rlsDenied) {
        return NextResponse.json(
          {
            error:
              'Permissao negada para atualizar post. Verifique se seu email esta na tabela admins e se as policies RLS da tabela posts foram aplicadas.',
          },
          { status: 403 }
        );
      }

      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro inesperado ao atualizar post.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const postId = body?.postId as string | undefined;
    const accessToken = body?.accessToken as string | undefined;

    if (!postId) {
      return NextResponse.json({ error: 'ID do post ausente.' }, { status: 400 });
    }

    if (!accessToken) {
      return NextResponse.json({ error: 'Sessao expirada. Faca login novamente.' }, { status: 401 });
    }

    const client = createAuthorizedSupabaseClient(accessToken);

    if ('error' in client) {
      return NextResponse.json({ error: client.error }, { status: 500 });
    }

    const { error } = await client.supabase
      .from('posts')
      .delete()
      .eq('id', postId);

    if (error) {
      const rlsDenied =
        error.code === '42501' || error.message.toLowerCase().includes('row-level security');

      if (rlsDenied) {
        return NextResponse.json(
          {
            error:
              'Permissao negada para deletar post. Verifique se seu email esta na tabela admins e se as policies RLS da tabela posts foram aplicadas.',
          },
          { status: 403 }
        );
      }

      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro inesperado ao deletar post.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
