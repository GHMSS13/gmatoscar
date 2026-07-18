import { NextResponse } from 'next/server';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

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

type SupabaseClientResult =
  | { ok: true; supabase: SupabaseClient }
  | { ok: false; error: string };

const isRlsViolation = (message: string) => {
  const normalized = message.toLowerCase();
  return (
    normalized.includes('row-level security') ||
    normalized.includes('violates row-level security') ||
    normalized.includes('new row violates')
  );
};

const rlsPostsGuidance =
  'Permissao negada pelo RLS da tabela posts. Adicione seu e-mail na tabela public.admins e/ou configure SUPABASE_SERVICE_ROLE_KEY no Vercel (Project Settings > Environment Variables), depois redeploy.';

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

/**
 * Prefers service role for server operations, but gracefully falls back
 * to the authenticated admin JWT client when the service key is unavailable.
 */
const createDbClient = (accessToken: string): SupabaseClientResult => {
  const serviceClient = createServiceClient();
  if (serviceClient.ok) {
    return serviceClient;
  }

  const userClient = createUserClient(accessToken);
  if (userClient.ok) {
    return userClient;
  }

  return serviceClient;
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

  // First check: is this email in the hardcoded allow-list?
  if (ALLOWED_ADMIN_EMAILS.includes(email)) {
    return { email };
  }

  // Second check: is this email in the admins table?
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
    const postId = searchParams.get('postId');
    const query = searchParams.get('q')?.trim() ?? '';
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

    const client = createDbClient(accessToken);
    if (!client.ok) {
      return NextResponse.json({ error: client.error }, { status: 500 });
    }

    if (!postId) {
      const { data, error } = await client.supabase
        .from('posts')
        .select('id, title, slug, category, date, published')
        .order('created_at', { ascending: false });

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      const normalizedQuery = query.toLowerCase();
      const filteredData = normalizedQuery
        ? (data ?? []).filter((post) =>
            [post.title, post.slug, post.category].some((value) =>
              String(value).toLowerCase().includes(normalizedQuery)
            )
          )
        : data;

      return NextResponse.json(filteredData);
    }

    const { data, error } = await client.supabase
      .from('posts')
      .select('*')
      .eq('id', postId)
      .single();

    if (error) {
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

    const auth = await verifyAdminToken(accessToken);
    if ('error' in auth) {
      return NextResponse.json({ error: auth.error }, { status: 403 });
    }

    const client = createDbClient(accessToken);
    if (!client.ok) {
      return NextResponse.json({ error: client.error }, { status: 500 });
    }

    const { error } = await client.supabase.from('posts').insert([post]);

    if (error) {
      if (isRlsViolation(error.message)) {
        return NextResponse.json({ error: rlsPostsGuidance }, { status: 403 });
      }

      const missingPostsTable =
        error.code === 'PGRST205' ||
        (error.message.toLowerCase().includes('public.posts') &&
          error.message.toLowerCase().includes('schema cache'));

      if (missingPostsTable) {
        return NextResponse.json(
          { error: 'Tabela public.posts nao encontrada no Supabase. Execute o script supabase/posts_schema.sql no SQL Editor e tente novamente.' },
          { status: 500 }
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

    const auth = await verifyAdminToken(accessToken);
    if ('error' in auth) {
      return NextResponse.json({ error: auth.error }, { status: 403 });
    }

    const client = createDbClient(accessToken);
    if (!client.ok) {
      return NextResponse.json({ error: client.error }, { status: 500 });
    }

    const { data, error } = await client.supabase
      .from('posts')
      .update(post)
      .eq('id', postId)
      .select('id')
      .maybeSingle();

    if (error) {
      if (isRlsViolation(error.message)) {
        return NextResponse.json({ error: rlsPostsGuidance }, { status: 403 });
      }

      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Nenhum post foi atualizado. O post pode não existir.' },
        { status: 404 }
      );
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

    const auth = await verifyAdminToken(accessToken);
    if ('error' in auth) {
      return NextResponse.json({ error: auth.error }, { status: 403 });
    }

    const client = createDbClient(accessToken);
    if (!client.ok) {
      return NextResponse.json({ error: client.error }, { status: 500 });
    }

    const { error } = await client.supabase
      .from('posts')
      .delete()
      .eq('id', postId);

    if (error) {
      if (isRlsViolation(error.message)) {
        return NextResponse.json({ error: rlsPostsGuidance }, { status: 403 });
      }

      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro inesperado ao deletar post.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
