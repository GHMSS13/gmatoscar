'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Loader2, LogIn, LogOut, PlusCircle } from 'lucide-react';

interface PostFormState {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  read_time: string;
  image_url: string;
  external_url: string;
  featured: boolean;
  hot: boolean;
  published: boolean;
}

const initialFormState: PostFormState = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: 'Lançamentos',
  date: new Date().toISOString().slice(0, 10),
  read_time: '3 min',
  image_url: '',
  external_url: '',
  featured: false,
  hot: false,
  published: true,
};

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [form, setForm] = useState<PostFormState>(initialFormState);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      if (session?.user?.email) {
        await verifyAdmin(session.user.email);
      }
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session?.user?.email) {
        await verifyAdmin(session.user.email);
      } else {
        setIsAdmin(false);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const getAdminRedirect = () => `${window.location.origin}/admin`;

  const verifyAdmin = async (email: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    setLoading(true);
    const { data, error } = await supabase
      .from('admins')
      .select('email, role')
      .ilike('email', normalizedEmail)
      .limit(1)
      .maybeSingle();

    setLoading(false);
    if (error) {
      setIsAdmin(false);
      setMessage(`Falha ao validar admin: ${error.message}`);
      return;
    }

    if (!data) {
      setIsAdmin(false);
      return;
    }

    setIsAdmin(Boolean(data));
  };

  const handleSignIn = async () => {
    setLoading(true);
    const redirectTo = getAdminRedirect();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo },
    });
    setLoading(false);
  };

  const handleSignOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setSession(null);
    setIsAdmin(false);
    setLoading(false);
    router.push('/');
  };

  const handleInput = (field: keyof PostFormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!session?.user?.email) {
      setMessage('É necessário fazer login primeiro.');
      return;
    }
    if (!isAdmin) {
      setMessage('Seu usuário não tem permissão de administrador. Adicione seu email na tabela admins.');
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim().toLowerCase(),
        excerpt: form.excerpt.trim(),
        content: form.content.trim(),
        category: form.category.trim(),
        date: form.date,
        read_time: form.read_time.trim(),
        image_url: form.image_url.trim(),
        external_url: form.external_url.trim() || null,
        featured: form.featured,
        hot: form.hot,
        published: form.published,
      };

      const insertPromise = supabase.from('posts').insert([payload]);
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Tempo limite ao salvar post. Verifique conexão e policies no Supabase.')), 15000);
      });

      const response = await Promise.race([insertPromise, timeoutPromise]);

      if (response.error) {
        setMessage(response.error.message);
        return;
      }

      setMessage('Post criado com sucesso!');
      setForm(initialFormState);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Falha ao criar post.';
      setMessage(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] pb-20 pt-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 bg-[#111] border border-[#222] rounded-2xl p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-[#dc2626] text-xs uppercase tracking-[0.35em] font-bold font-rajdhani mb-3">
                Área administrativa
              </p>
              <h1 className="text-3xl sm:text-4xl font-rajdhani font-bold text-white">
                Criar novo post
              </h1>
              <p className="text-white/50 mt-2 max-w-2xl text-sm font-exo">
                Faça login com Google e publique artigos diretamente no Supabase. O login não é exigido para a área pública do site.
              </p>
              <p className="text-white/40 mt-2 max-w-2xl text-sm font-exo">
                Esta área é exclusiva para contas autorizadas na tabela <code>admins</code> do Supabase.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 justify-end">
              {session?.user ? (
                <>
                  <span className="text-white/70 text-sm font-exo">{session.user.email}</span>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#dc2626] px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#b91c1c]"
                  >
                    <LogOut size={16} /> Sair
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleSignIn}
                  disabled={loading}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#dc2626] px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#b91c1c] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <LogIn size={16} />}
                  Entrar com Google
                </button>
              )}
            </div>
          </div>

          {!session?.user && (
            <div className="rounded-xl border border-[#333] bg-[#0f0f0f] p-4 text-sm text-white/80">
              Faça login com Google para acessar o formulário de criação de posts.
            </div>
          )}

          {session?.user && !isAdmin && (
            <div className="rounded-xl border border-[#333] bg-[#0f0f0f] p-4 text-sm text-yellow-300">
              Você está logado, mas seu e-mail ainda não está configurado como admin no banco. Insira seu email na tabela <code>admins</code> do Supabase para habilitar a criação de posts.
            </div>
          )}

          {session?.user && isAdmin && (
            <div className="rounded-2xl border border-[#222] bg-[#0b0b0b] p-4 sm:p-6">
              <form onSubmit={handleSubmit} className="grid gap-6">
                <div className="grid gap-6 lg:grid-cols-2">
                <label className="block">
                  <span className="text-white/70 text-sm font-exo">Título</span>
                  <input
                    value={form.title}
                    onChange={(event) => handleInput('title', event.target.value)}
                    className="mt-2 w-full rounded-xl border border-[#222] bg-[#0a0a0a] px-4 py-3 text-white outline-none transition-all focus:border-[#dc2626]"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-white/70 text-sm font-exo">Slug</span>
                  <input
                    value={form.slug}
                    onChange={(event) => handleInput('slug', event.target.value)}
                    className="mt-2 w-full rounded-xl border border-[#222] bg-[#0a0a0a] px-4 py-3 text-white outline-none transition-all focus:border-[#dc2626]"
                    required
                    placeholder="ex: ferrari-f80-1200cv"
                  />
                </label>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <label className="block">
                  <span className="text-white/70 text-sm font-exo">Categoria</span>
                  <input
                    value={form.category}
                    onChange={(event) => handleInput('category', event.target.value)}
                    className="mt-2 w-full rounded-xl border border-[#222] bg-[#0a0a0a] px-4 py-3 text-white outline-none transition-all focus:border-[#dc2626]"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-white/70 text-sm font-exo">Data</span>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(event) => handleInput('date', event.target.value)}
                    className="mt-2 w-full rounded-xl border border-[#222] bg-[#0a0a0a] px-4 py-3 text-white outline-none transition-all focus:border-[#dc2626]"
                    required
                  />
                </label>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <label className="block">
                  <span className="text-white/70 text-sm font-exo">Tempo de leitura</span>
                  <input
                    value={form.read_time}
                    onChange={(event) => handleInput('read_time', event.target.value)}
                    className="mt-2 w-full rounded-xl border border-[#222] bg-[#0a0a0a] px-4 py-3 text-white outline-none transition-all focus:border-[#dc2626]"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-white/70 text-sm font-exo">Imagem URL</span>
                  <input
                    value={form.image_url}
                    onChange={(event) => handleInput('image_url', event.target.value)}
                    className="mt-2 w-full rounded-xl border border-[#222] bg-[#0a0a0a] px-4 py-3 text-white outline-none transition-all focus:border-[#dc2626]"
                    placeholder="https://..."
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-white/70 text-sm font-exo">URL externa (opcional)</span>
                <input
                  value={form.external_url}
                  onChange={(event) => handleInput('external_url', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-[#222] bg-[#0a0a0a] px-4 py-3 text-white outline-none transition-all focus:border-[#dc2626]"
                  placeholder="https://..."
                />
              </label>
              <label className="block">
                <span className="text-white/70 text-sm font-exo">Resumo / Excerpt</span>
                <textarea
                  value={form.excerpt}
                  onChange={(event) => handleInput('excerpt', event.target.value)}
                  className="mt-2 w-full min-h-[120px] rounded-2xl border border-[#222] bg-[#0a0a0a] px-4 py-3 text-white outline-none transition-all focus:border-[#dc2626]"
                  required
                />
              </label>
              <label className="block">
                <span className="text-white/70 text-sm font-exo">Conteúdo (Markdown)</span>
                <textarea
                  value={form.content}
                  onChange={(event) => handleInput('content', event.target.value)}
                  className="mt-2 w-full min-h-[220px] rounded-2xl border border-[#222] bg-[#0a0a0a] px-4 py-3 text-white outline-none transition-all focus:border-[#dc2626]"
                  required
                  placeholder="Use markdown para formatar texto e links."
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <label className="inline-flex items-center gap-3 rounded-xl border border-[#222] bg-[#0a0a0a] px-4 py-3">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(event) => handleInput('featured', event.target.checked)}
                    className="h-4 w-4 rounded border-[#444] bg-[#111] text-[#dc2626] focus:ring-[#dc2626]"
                  />
                  <span className="text-white/80 text-sm font-exo">Destaque</span>
                </label>
                <label className="inline-flex items-center gap-3 rounded-xl border border-[#222] bg-[#0a0a0a] px-4 py-3">
                  <input
                    type="checkbox"
                    checked={form.hot}
                    onChange={(event) => handleInput('hot', event.target.checked)}
                    className="h-4 w-4 rounded border-[#444] bg-[#111] text-[#dc2626] focus:ring-[#dc2626]"
                  />
                  <span className="text-white/80 text-sm font-exo">Hot</span>
                </label>
                <label className="inline-flex items-center gap-3 rounded-xl border border-[#222] bg-[#0a0a0a] px-4 py-3">
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={(event) => handleInput('published', event.target.checked)}
                    className="h-4 w-4 rounded border-[#444] bg-[#111] text-[#dc2626] focus:ring-[#dc2626]"
                  />
                  <span className="text-white/80 text-sm font-exo">Publicado</span>
                </label>
              </div>

              {message && (
                <p className="text-sm text-white/80">{message}</p>
              )}

              <button
                disabled={saving || !isAdmin}
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#dc2626] px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#b91c1c] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <PlusCircle size={18} />
                {saving ? 'Salvando...' : 'Criar post'}
              </button>
            </form>
          </div>
          )}

          <div className="rounded-2xl border border-[#222] bg-[#0f0f0f] p-5 text-sm text-white/70">
            <h2 className="font-semibold text-white mb-3">Configuração manual do admin</h2>
            <p className="mb-3">
              Insira o email do Google do administrador diretamente na tabela <code className="text-[#dc2626]">admins</code> do Supabase.
            </p>
            <pre className="overflow-x-auto rounded-xl bg-[#111] p-4 text-xs text-white/70">
{`insert into public.admins (email) values ('seu-email@gmail.com');`}
            </pre>
            <p className="mt-3">
              Após adicionar o email, faça login com o mesmo Google em <code className="text-[#dc2626]">/admin</code>.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
