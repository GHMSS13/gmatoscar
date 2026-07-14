'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Loader2, LogIn, LogOut, PlusCircle, Edit, Trash2, ImagePlus } from 'lucide-react';
import MarkdownContent from '@/lib/articleContent';

interface PostFormState {
  id?: string;
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

interface PublishedPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  published: boolean;
}

interface LibraryImage {
  id: string;
  file_name: string;
  mime_type: string;
  image_url: string;
  preview_data_url: string;
  created_at: string;
}

interface LibraryResponse {
  items: LibraryImage[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
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

const ADMIN_REDIRECT_STORAGE_KEY = 'gmatoscar-admin-redirect';
const IMAGE_PAGE_SIZE = 10;
const IMAGE_URL_PREFIX = '/api/images/';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const quillModules = {
  toolbar: [
    [{ font: [] }, { size: ['small', false, 'large', 'huge'] }],
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['blockquote', 'code-block'],
    ['link', 'image'],
    ['clean'],
  ],
};

const quillFormats = [
  'font',
  'size',
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'color',
  'background',
  'align',
  'list',
  'bullet',
  'blockquote',
  'code-block',
  'link',
  'image',
];

const extractImageIdFromUrl = (url: string) => {
  const trimmedUrl = url.trim();

  if (!trimmedUrl.startsWith(IMAGE_URL_PREFIX)) {
    return null;
  }

  const id = trimmedUrl.slice(IMAGE_URL_PREFIX.length).split('?')[0].split('#')[0].trim();
  return id.length > 0 ? id : null;
};

const sanitizeSeoFileName = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

const stripFileExtension = (value: string) => value.replace(/\.[a-z0-9]+$/i, '');

const normalizeDimension = (value: string, fallback: string) => {
  const trimmed = value.trim();
  if (!trimmed) return fallback;

  if (/^\d+$/.test(trimmed)) {
    return `${trimmed}px`;
  }

  return trimmed;
};

const isEditorContentEmpty = (content: string) => {
  const plainText = content
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .trim();

  return plainText.length === 0;
};

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [form, setForm] = useState<PostFormState>(initialFormState);
  const [publishedPosts, setPublishedPosts] = useState<PublishedPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [libraryImages, setLibraryImages] = useState<LibraryImage[]>([]);
  const [loadingLibrary, setLoadingLibrary] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [libraryPage, setLibraryPage] = useState(1);
  const [libraryTotalPages, setLibraryTotalPages] = useState(1);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  
  // Novos estados para o editor profissional e inserção de imagem
  const [editorTab, setEditorTab] = useState<'write' | 'preview'>('write');
  const [insertImageMetadata, setInsertImageMetadata] = useState<{
    url: string;
    seoFileName: string;
    width: string;
    height: string;
    isOpen: boolean;
  }>({
    url: '',
    seoFileName: '',
    width: '1600px',
    height: '1067px',
    isOpen: false,
  });

  const router = useRouter();
  const isMissingPostsSchema =
    message?.toLowerCase().includes('public.posts') ||
    message?.toLowerCase().includes('schema cache') ||
    false;
  const allowedAdminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? 'gustavohmssilva13@gmail.com')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  const fetchPublishedPosts = async () => {
    if (!session?.access_token) {
      setPublishedPosts([]);
      return;
    }

    setLoadingPosts(true);

    try {
      const response = await fetch('/api/admin/posts', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error ?? 'Erro ao buscar posts publicados');
        return;
      }

      setPublishedPosts(data as PublishedPost[]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao buscar posts publicados';
      setMessage(errorMessage);
    } finally {
      setLoadingPosts(false);
    }
  };

  const fetchImageLibrary = async (page: number) => {
    if (!session?.access_token) {
      setLibraryImages([]);
      setLibraryTotalPages(1);
      return;
    }

    setLoadingLibrary(true);

    try {
      const response = await fetch(`/api/admin/images?page=${page}&pageSize=${IMAGE_PAGE_SIZE}`, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error ?? 'Erro ao carregar banco de imagens');
        return;
      }

      const payload = data as LibraryResponse;
      setLibraryImages(payload.items);
      setLibraryTotalPages(Math.max(payload.totalPages, 1));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao carregar banco de imagens';
      setMessage(errorMessage);
    } finally {
      setLoadingLibrary(false);
    }
  };

  // Upload múltiplo de imagens
  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      return;
    }

    if (!session?.access_token) {
      setMessage('Sessão expirada. Faça login novamente.');
      event.target.value = '';
      return;
    }

    const fileList = Array.from(files);

    // Validação de tipo de arquivo
    const invalidFile = fileList.find(f => !f.type.startsWith('image/'));
    if (invalidFile) {
      setMessage('Selecione apenas arquivos de imagem.');
      event.target.value = '';
      return;
    }

    // Validação de tamanho (5MB)
    const maxFileSizeInBytes = 5 * 1024 * 1024;
    const oversizedFile = fileList.find(f => f.size > maxFileSizeInBytes);
    if (oversizedFile) {
      setMessage(`A imagem "${oversizedFile.name}" excede o limite de 5MB.`);
      event.target.value = '';
      return;
    }

    setUploadingImage(true);
    setMessage(null);

    try {
      // Ler todas as imagens em paralelo para base64
      const uploadPayloads = await Promise.all(
        fileList.map((file) => {
          return new Promise<{ fileName: string; mimeType: string; base64Data: string }>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              const result = String(reader.result ?? '');
              const base64Data = result.includes(',') ? result.split(',')[1] : '';
              resolve({
                fileName: file.name,
                mimeType: file.type,
                base64Data,
              });
            };
            reader.onerror = () => reject(new Error(`Falha ao ler o arquivo ${file.name}`));
            reader.readAsDataURL(file);
          });
        })
      );

      const response = await fetch('/api/admin/images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken: session.access_token,
          images: uploadPayloads,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error ?? 'Erro ao salvar imagens.');
        return;
      }

      // Define a primeira imagem enviada como imagem principal do post por padrão
      if (data.ids && data.ids.length > 0) {
        const firstImageUrl = `${IMAGE_URL_PREFIX}${data.ids[0]}`;
        setForm((prev) => ({ ...prev, image_url: firstImageUrl }));
        setSelectedImageId(data.ids[0]);
      } else if (data.id) {
        const imageUrl = `${IMAGE_URL_PREFIX}${data.id}`;
        setForm((prev) => ({ ...prev, image_url: imageUrl }));
        setSelectedImageId(data.id);
      }

      setLibraryPage(1);
      await fetchImageLibrary(1);
      setMessage(`${fileList.length} imagem(ns) enviada(s) com sucesso para o banco.`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao enviar imagens.';
      setMessage(errorMessage);
    } finally {
      setUploadingImage(false);
      event.target.value = '';
    }
  };

  const handleSelectLibraryImage = (imageId: string) => {
    const imageUrl = `${IMAGE_URL_PREFIX}${imageId}`;
    setForm((prev) => ({ ...prev, image_url: imageUrl }));
    setSelectedImageId(imageId);
  };

  // Auxiliar para inserir texto na área de escrita do post
  const insertTextAtCursor = (before: string, after: string = '') => {
    const textarea = document.getElementById('post-content-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    const replacement = before + selectedText + after;

    const newValue = text.substring(0, start) + replacement + text.substring(end);
    setForm((prev) => ({ ...prev, content: newValue }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  // Confirmação de inserção da imagem do banco no post
  const handleConfirmInsertImage = () => {
    const { url, seoFileName, width, height } = insertImageMetadata;
    const normalizedSeoName = sanitizeSeoFileName(stripFileExtension(seoFileName)) || 'imagem-artigo';
    const imageUrlWithFileName = `${url}${url.includes('?') ? '&' : '?'}filename=${encodeURIComponent(normalizedSeoName)}`;

    // Keep alt hidden in UI by not rendering figcaption, while preserving accessibility text.
    const tag = `<img src="${imageUrlWithFileName}" alt="${normalizedSeoName}" style="width: ${normalizeDimension(width, '1600px')}; height: ${normalizeDimension(height, '1067px')};" />`;

    insertTextAtCursor(tag);
    setInsertImageMetadata((prev) => ({ ...prev, isOpen: false }));
  };

  const loadPostForEdit = async (postId: string) => {
    if (!session?.access_token) {
      setMessage('Sessao expirada. Faca login novamente.');
      return;
    }

    setLoadingPosts(true);

    try {
      const response = await fetch(`/api/admin/posts?postId=${encodeURIComponent(postId)}`, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error ?? 'Erro ao carregar post para edição');
        return;
      }

      setForm({
        id: data.id,
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        date: data.date,
        read_time: data.read_time,
        image_url: data.image_url,
        external_url: data.external_url || '',
        featured: data.featured,
        hot: data.hot,
        published: data.published,
      });
      setSelectedImageId(extractImageIdFromUrl(data.image_url));
      setEditingId(postId);
      setMessage(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao carregar post para edição';
      setMessage(errorMessage);
    } finally {
      setLoadingPosts(false);
    }
  };

  const deletePost = async (postId: string) => {
    if (!confirm('Tem certeza que deseja deletar este post?')) return;

    setSaving(true);
    try {
      const response = await fetch('/api/admin/posts', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          accessToken: session.access_token,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setMessage(data.error ?? 'Erro ao deletar post');
        return;
      }

      setMessage('Post deletado com sucesso!');
      await fetchPublishedPosts();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao deletar post';
      setMessage(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      if (session?.user?.email) {
        await verifyAdmin(session.user.email);
      } else {
        setIsAdmin(false);
      }
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setSession(null);
        setIsAdmin(false);
        setLibraryImages([]);
        setLibraryTotalPages(1);
        setLibraryPage(1);
        setSelectedImageId(null);
        return;
      }

      if (event === 'SIGNED_IN' && !session?.user?.email) {
        window.location.reload();
        return;
      }

      setSession(session);
      if (session?.user?.email) {
        await verifyAdmin(session.user.email);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isAdmin && session?.access_token) {
      fetchPublishedPosts();
    }
  }, [isAdmin, session?.access_token]);

  useEffect(() => {
    if (isAdmin && session?.access_token) {
      fetchImageLibrary(libraryPage);
    }
  }, [isAdmin, session?.access_token, libraryPage]);

  const verifyAdmin = async (email: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const isFallbackAdmin = allowedAdminEmails.includes(normalizedEmail);

    if (isFallbackAdmin) {
      setIsAdmin(true);
      setMessage(null);
      return;
    }

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
      setMessage('Seu e-mail não foi encontrado na lista de admins. Verifique tabela admins e policies RLS no Supabase.');
      return;
    }

    setIsAdmin(Boolean(data));
    setMessage(null);
  };

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const protocol = window.location.protocol;
      const host = window.location.host;
      const redirectTo = `${protocol}//${host}/admin`;

      window.localStorage.setItem(
        ADMIN_REDIRECT_STORAGE_KEY,
        JSON.stringify({ path: '/admin', createdAt: Date.now() })
      );

      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
    } catch (error) {
      window.localStorage.removeItem(ADMIN_REDIRECT_STORAGE_KEY);
      setMessage('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    window.localStorage.removeItem(ADMIN_REDIRECT_STORAGE_KEY);
    const authStorageKey = (supabase.auth as any).storageKey as string | undefined;
    if (authStorageKey) {
      localStorage.removeItem(authStorageKey);
    }

    setSession(null);
    setIsAdmin(false);
    setMessage(null);

    supabase.auth.signOut().catch(() => {
      // Session is already cleared locally.
    });

    setLoading(false);

    if (authStorageKey) {
      localStorage.removeItem(`${authStorageKey}-code-verifier`);
    }

    router.replace('/admin');
    router.refresh();
    window.location.assign('/admin');
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
        featured: false,
        hot: form.hot,
        published: form.published,
      };

      const method = form.id ? 'PUT' : 'POST';
      const requestBody = form.id 
        ? { post: payload, postId: form.id, accessToken: session.access_token }
        : { post: payload, accessToken: session.access_token };

      const response = await fetch('/api/admin/posts', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error ?? 'Falha ao salvar post.');
        return;
      }

      setMessage(form.id ? 'Post atualizado com sucesso!' : 'Post criado com sucesso!');
      setForm(initialFormState);
      setEditingId(null);
      setSelectedImageId(null);
      await fetchPublishedPosts();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Falha ao salvar post.';
      setMessage(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setForm(initialFormState);
    setEditingId(null);
    setSelectedImageId(null);
  };

  useEffect(() => {
    setSelectedImageId(extractImageIdFromUrl(form.image_url));
  }, [form.image_url]);

  useEffect(() => {
    if (!session?.user) {
      setMessage(null);
    }
  }, [session?.user]);

  return (
    <main className="min-h-screen bg-white pb-20 pt-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 bg-white border border-[#e5e7eb] rounded-2xl p-8 shadow-xl">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-[#dc2626] text-xs uppercase tracking-[0.35em] font-bold font-rajdhani mb-3">
                Área administrativa
              </p>
              <h1 className="text-3xl sm:text-4xl font-rajdhani font-bold text-[#111827]">
                Painel Administrativo
              </h1>
              <p className="text-[#4b5563] mt-2 max-w-2xl text-sm font-exo">
                Faça login com Google e publique artigos diretamente no Supabase. O login não é exigido para a área pública do site.
              </p>
              <p className="text-[#6b7280] mt-2 max-w-2xl text-sm font-exo">
                Esta área é exclusiva para contas autorizadas na tabela <code>admins</code> do Supabase.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 justify-end">
              {session?.user ? (
                <>
                  <span className="text-[#374151] text-sm font-exo">{session.user.email}</span>
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
            <div className="rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-4 text-sm text-[#4b5563]">
              Faça login com Google para acessar o formulário de criação de posts.
            </div>
          )}

          {session?.user && !isAdmin && (
            <div className="rounded-xl border border-[#fde68a] bg-[#fffbeb] p-4 text-sm text-[#92400e]">
              Você está logado, mas seu e-mail ainda não está configurado como admin no banco. Insira seu email na tabela <code>admins</code> do Supabase para habilitar a criação de posts.
            </div>
          )}

          {message && (
            <div className="rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-4 text-sm text-[#4b5563]">
              {message}
            </div>
          )}

          {isMissingPostsSchema && (
            <div className="rounded-2xl border border-[#fecaca] bg-[#fff1f2] p-5 text-sm text-[#7f1d1d]">
              <h2 className="font-semibold text-[#7f1d1d] mb-3">Correção rápida: criar tabela de posts</h2>
              <p className="mb-3">
                Abra o SQL Editor do Supabase e execute o conteúdo de <code className="text-[#dc2626]">supabase/posts_schema.sql</code>.
              </p>
              <p>
                Depois, atualize esta página e tente publicar novamente.
              </p>
            </div>
          )}

          {/* PRIMEIRO CONTAINER: Banco de Imagens (Agora no topo sob requisição) */}
          {session?.user && isAdmin && (
            <div id="banco-de-imagens-container" className="transition-all duration-500 rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] p-4 sm:p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-rajdhani font-bold text-[#111827]">Banco de imagens</h2>
                  <p className="text-sm font-exo text-[#4b5563] mt-1">
                    Envie imagens e selecione uma como capa ou insira no meio do texto com tamanhos customizados. Suporta envio múltiplo.
                  </p>
                </div>
                <label className="inline-flex items-center justify-center gap-2 rounded-full bg-[#111827] px-4 py-2 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#1f2937] cursor-pointer transition-colors">
                  {uploadingImage ? <Loader2 size={16} className="animate-spin" /> : <PlusCircle size={16} />}
                  {uploadingImage ? 'Enviando...' : 'Anexar imagens'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploadingImage}
                    multiple
                  />
                </label>
              </div>

              {loadingLibrary ? (
                <div className="mt-6 rounded-xl border border-[#e5e7eb] bg-white p-6 text-center text-[#6b7280]">
                  <div className="inline-flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    Carregando imagens...
                  </div>
                </div>
              ) : libraryImages.length === 0 ? (
                <div className="mt-6 rounded-xl border border-[#e5e7eb] bg-white p-6 text-center text-[#6b7280]">
                  Nenhuma imagem no banco ainda. Clique em "Anexar imagens" para enviar.
                </div>
              ) : (
                <>
                  <div className="mt-6 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {libraryImages.map((image) => {
                      const isSelected = selectedImageId === image.id;

                      return (
                        <div
                          key={image.id}
                          className={`rounded-xl border bg-white p-3 flex flex-col justify-between ${isSelected ? 'border-[#dc2626] ring-1 ring-[#dc2626]' : 'border-[#e5e7eb]'}`}
                        >
                          <div>
                            <div className="relative h-24 w-full overflow-hidden rounded-lg bg-[#f3f4f6]">
                              <img
                                src={image.preview_data_url}
                                alt={image.file_name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <p className="mt-2 truncate text-[11px] font-exo text-[#4b5563]" title={image.file_name}>
                              {image.file_name}
                            </p>
                          </div>
                          <div className="flex gap-1.5 mt-3">
                            <button
                              type="button"
                              onClick={() => handleSelectLibraryImage(image.id)}
                              className={`flex-1 inline-flex items-center justify-center rounded-lg py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors ${isSelected ? 'bg-[#dc2626] text-white' : 'bg-[#e5e7eb] text-[#111827] hover:bg-[#d1d5db]'}`}
                              title="Usar como imagem principal do post"
                            >
                              Capa
                            </button>
                            <button
                              type="button"
                              onClick={() => setInsertImageMetadata({
                                url: image.image_url,
                                seoFileName: stripFileExtension(image.file_name) || 'imagem-artigo',
                                width: '1600px',
                                height: '1067px',
                                isOpen: true
                              })}
                              className="flex-1 inline-flex items-center justify-center rounded-lg bg-[#111827] text-white hover:bg-[#1f2937] py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors"
                              title="Inserir no conteúdo do post"
                            >
                              Inserir
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setLibraryPage((prev) => Math.max(prev - 1, 1))}
                      disabled={libraryPage <= 1 || loadingLibrary}
                      className="inline-flex items-center justify-center rounded-lg border border-[#d1d5db] bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#111827] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Anterior
                    </button>
                    <p className="text-xs font-exo text-[#6b7280]">
                      Página {libraryPage} de {libraryTotalPages}
                    </p>
                    <button
                      type="button"
                      onClick={() => setLibraryPage((prev) => Math.min(prev + 1, libraryTotalPages))}
                      disabled={libraryPage >= libraryTotalPages || loadingLibrary}
                      className="inline-flex items-center justify-center rounded-lg border border-[#d1d5db] bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#111827] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Próxima
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* SEGUNDO CONTAINER: Formulário de Post */}
          {session?.user && isAdmin && (
            <div className="rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] p-4 sm:p-6 shadow-sm">
              <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-6">
                {editingId ? 'Editar post' : 'Criar novo post'}
              </h2>
              
              <form onSubmit={handleSubmit} className="grid gap-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <label className="block">
                    <span className="text-[#374151] text-sm font-exo">Título</span>
                    <input
                      value={form.title}
                      onChange={(event) => handleInput('title', event.target.value)}
                      className="mt-2 w-full rounded-xl border border-[#d1d5db] bg-white px-4 py-3 text-[#111827] outline-none transition-all focus:border-[#dc2626]"
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="text-[#374151] text-sm font-exo">Slug</span>
                    <input
                      value={form.slug}
                      onChange={(event) => handleInput('slug', event.target.value)}
                      className="mt-2 w-full rounded-xl border border-[#d1d5db] bg-white px-4 py-3 text-[#111827] outline-none transition-all focus:border-[#dc2626]"
                      required
                      placeholder="ex: ferrari-f80-1200cv"
                    />
                  </label>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  <label className="block">
                    <span className="text-[#374151] text-sm font-exo">Categoria</span>
                    <input
                      value={form.category}
                      onChange={(event) => handleInput('category', event.target.value)}
                      className="mt-2 w-full rounded-xl border border-[#d1d5db] bg-white px-4 py-3 text-[#111827] outline-none transition-all focus:border-[#dc2626]"
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="text-[#374151] text-sm font-exo">Data</span>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(event) => handleInput('date', event.target.value)}
                      className="mt-2 w-full rounded-xl border border-[#d1d5db] bg-white px-4 py-3 text-[#111827] outline-none transition-all focus:border-[#dc2626]"
                      required
                    />
                  </label>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  <label className="block">
                    <span className="text-[#374151] text-sm font-exo">Tempo de leitura</span>
                    <input
                      value={form.read_time}
                      onChange={(event) => handleInput('read_time', event.target.value)}
                      className="mt-2 w-full rounded-xl border border-[#d1d5db] bg-white px-4 py-3 text-[#111827] outline-none transition-all focus:border-[#dc2626]"
                      required
                    />
                  </label>
                  <div className="block">
                    <span className="text-[#374151] text-sm font-exo">Imagem de Capa (Post)</span>
                    <div className="mt-2 flex items-center gap-4 rounded-xl border border-[#d1d5db] bg-white px-4 py-2.5 min-h-[50px]">
                      {form.image_url ? (
                        <>
                          <div className="relative h-10 w-14 overflow-hidden rounded bg-[#f3f4f6] flex-shrink-0 border border-[#e5e7eb]">
                            <img
                              src={form.image_url}
                              alt="Capa"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-exo text-[#111827] truncate font-semibold">
                              Imagem Selecionada
                            </p>
                            <p className="text-[10px] font-mono text-[#6b7280] truncate">
                              {form.image_url}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setForm((prev) => ({ ...prev, image_url: '' }));
                              setSelectedImageId(null);
                            }}
                            className="text-xs font-bold text-[#dc2626] hover:text-[#b91c1c] transition-colors uppercase tracking-wider font-rajdhani px-2 py-1 rounded hover:bg-[#dc2626]/5"
                          >
                            Remover
                          </button>
                        </>
                      ) : (
                        <p className="text-xs font-exo text-[#6b7280]">
                          Nenhuma capa selecionada. Clique em <strong className="text-[#dc2626]">Capa</strong> em alguma imagem do banco acima.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <label className="block">
                  <span className="text-[#374151] text-sm font-exo">URL externa (opcional)</span>
                  <input
                    value={form.external_url}
                    onChange={(event) => handleInput('external_url', event.target.value)}
                    className="mt-2 w-full rounded-xl border border-[#d1d5db] bg-white px-4 py-3 text-[#111827] outline-none transition-all focus:border-[#dc2626]"
                    placeholder="https://..."
                  />
                </label>
                
                <label className="block">
                  <span className="text-[#374151] text-sm font-exo">Resumo / Excerpt</span>
                  <textarea
                    value={form.excerpt}
                    onChange={(event) => handleInput('excerpt', event.target.value)}
                    className="mt-2 w-full min-h-[100px] rounded-xl border border-[#d1d5db] bg-white px-4 py-3 text-[#111827] outline-none transition-all focus:border-[#dc2626] resize-y"
                    required
                  />
                </label>

                {/* EDITOR DE TEXTO PROFISSIONAL LADO A LADO */}
                <div className="block">
                  <span className="text-[#374151] text-sm font-exo">Conteúdo do Artigo</span>
                  
                  <div className="grid gap-6 lg:grid-cols-2 mt-2">
                    {/* Painel do Editor */}
                    <div className="border border-[#e5e7eb] rounded-xl bg-white p-3 flex flex-col gap-2 shadow-sm">
                      
                      {/* Barra de Ferramentas */}
                      <div className="flex flex-wrap items-center gap-2 pb-3 mb-2 border-b border-[#e5e7eb]">
                        
                        {/* Font Family */}
                        <select
                          onChange={(e) => {
                            if (e.target.value) {
                              insertTextAtCursor(`<span style="font-family: ${e.target.value};">`, '</span>');
                              e.target.value = '';
                            }
                          }}
                          className="rounded-lg border border-[#d1d5db] px-2 py-1 text-xs outline-none bg-white font-exo"
                          defaultValue=""
                        >
                          <option value="" disabled>Fonte</option>
                          <option value="system-ui, sans-serif">Padrão (Sans)</option>
                          <option value="Georgia, serif">Serifa (Georgia)</option>
                          <option value="monospace">Mono (Courier)</option>
                        </select>

                        {/* Font Size */}
                        <select
                          onChange={(e) => {
                            if (e.target.value) {
                              insertTextAtCursor(`<span style="font-size: ${e.target.value};">`, '</span>');
                              e.target.value = '';
                            }
                          }}
                          className="rounded-lg border border-[#d1d5db] px-2 py-1 text-xs outline-none bg-white font-exo"
                          defaultValue=""
                        >
                          <option value="" disabled>Tamanho</option>
                          <option value="13px">Pequeno (13px)</option>
                          <option value="16px">Normal (16px)</option>
                          <option value="20px">Grande (20px)</option>
                          <option value="24px">Extra (24px)</option>
                          <option value="28px">Gigante (28px)</option>
                        </select>

                        {/* Color */}
                        <select
                          onChange={(e) => {
                            if (e.target.value) {
                              insertTextAtCursor(`<span style="color: ${e.target.value};">`, '</span>');
                              e.target.value = '';
                            }
                          }}
                          className="rounded-lg border border-[#d1d5db] px-2 py-1 text-xs outline-none bg-white font-exo"
                          defaultValue=""
                        >
                          <option value="" disabled>Cor</option>
                          <option value="#111827">Preto</option>
                          <option value="#6b7280">Cinza</option>
                          <option value="#dc2626">Vermelho</option>
                          <option value="#2563eb">Azul</option>
                          <option value="#16a34a">Verde</option>
                          <option value="#ca8a04">Amarelo</option>
                          <option value="#ea580c">Laranja</option>
                          <option value="#9333ea">Roxo</option>
                        </select>

                        {/* Alignment */}
                        <select
                          onChange={(e) => {
                            if (e.target.value) {
                              insertTextAtCursor(`<div style="text-align: ${e.target.value};">`, '</div>');
                              e.target.value = '';
                            }
                          }}
                          className="rounded-lg border border-[#d1d5db] px-2 py-1 text-xs outline-none bg-white font-exo"
                          defaultValue=""
                        >
                          <option value="" disabled>Alinhamento</option>
                          <option value="left">Esquerda</option>
                          <option value="center">Centralizado</option>
                          <option value="right">Direita</option>
                          <option value="justify">Justificado</option>
                        </select>

                        <div className="h-5 w-[1px] bg-[#d1d5db] mx-1" />

                        {/* Standard Controls */}
                        <button
                          type="button"
                          onClick={() => insertTextAtCursor('**', '**')}
                          className="px-2 py-1 bg-[#f3f4f6] hover:bg-[#e5e7eb] rounded text-xs font-bold"
                          title="Negrito"
                        >
                          B
                        </button>
                        <button
                          type="button"
                          onClick={() => insertTextAtCursor('*', '*')}
                          className="px-2 py-1 bg-[#f3f4f6] hover:bg-[#e5e7eb] rounded text-xs italic"
                          title="Itálico"
                        >
                          I
                        </button>
                        <button
                          type="button"
                          onClick={() => insertTextAtCursor('<u>', '</u>')}
                          className="px-2 py-1 bg-[#f3f4f6] hover:bg-[#e5e7eb] rounded text-xs underline"
                          title="Sublinhado"
                        >
                          U
                        </button>
                        <button
                          type="button"
                          onClick={() => insertTextAtCursor('~~', '~~')}
                          className="px-2 py-1 bg-[#f3f4f6] hover:bg-[#e5e7eb] rounded text-xs line-through"
                          title="Tachado"
                        >
                          S
                        </button>

                        <div className="h-5 w-[1px] bg-[#d1d5db] mx-1" />

                        <button
                          type="button"
                          onClick={() => insertTextAtCursor('## ')}
                          className="px-2 py-1 bg-[#f3f4f6] hover:bg-[#e5e7eb] rounded text-xs font-mono"
                          title="Título 2"
                        >
                          H2
                        </button>
                        <button
                          type="button"
                          onClick={() => insertTextAtCursor('### ')}
                          className="px-2 py-1 bg-[#f3f4f6] hover:bg-[#e5e7eb] rounded text-xs font-mono"
                          title="Título 3"
                        >
                          H3
                        </button>

                        <div className="h-5 w-[1px] bg-[#d1d5db] mx-1" />

                        <button
                          type="button"
                          onClick={() => insertTextAtCursor('- ')}
                          className="px-2 py-1 bg-[#f3f4f6] hover:bg-[#e5e7eb] rounded text-xs"
                          title="Lista de Marcadores"
                        >
                          • Lista
                        </button>
                        <button
                          type="button"
                          onClick={() => insertTextAtCursor('1. ')}
                          className="px-2 py-1 bg-[#f3f4f6] hover:bg-[#e5e7eb] rounded text-xs"
                          title="Lista Numerada"
                        >
                          1. Lista
                        </button>
                        <button
                          type="button"
                          onClick={() => insertTextAtCursor('> ')}
                          className="px-2 py-1 bg-[#f3f4f6] hover:bg-[#e5e7eb] rounded text-xs font-mono"
                          title="Citação"
                        >
                          &gt; Citação
                        </button>

                        <div className="h-5 w-[1px] bg-[#d1d5db] mx-1" />

                        {/* Links & Image Bank Scroll */}
                        <button
                          type="button"
                          onClick={() => {
                            const url = prompt('Digite o endereço do link (ex: https://site.com):');
                            if (url) {
                              insertTextAtCursor('[', `](${url})`);
                            }
                          }}
                          className="px-2 py-1 bg-[#f3f4f6] hover:bg-[#e5e7eb] text-blue-600 rounded text-xs font-bold"
                          title="Inserir Link"
                        >
                          Link
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const element = document.getElementById('banco-de-imagens-container');
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' });
                              element.classList.add('ring-4', 'ring-[#dc2626]/70', 'ring-offset-2');
                              setTimeout(() => {
                                element.classList.remove('ring-4', 'ring-[#dc2626]/70', 'ring-offset-2');
                              }, 2000);
                            }
                          }}
                          className="px-2 py-1 bg-[#f3f4f6] hover:bg-[#e5e7eb] text-[#dc2626] rounded text-xs font-bold font-exo"
                          title="Inserir Imagem do Banco de Imagens"
                        >
                          + Imagem
                        </button>
                      </div>

                      <textarea
                        id="post-content-textarea"
                        value={form.content}
                        onChange={(event) => handleInput('content', event.target.value)}
                        className="w-full min-h-[450px] border-0 outline-none text-[#111827] focus:ring-0 resize-y font-mono text-sm p-2"
                        required
                        placeholder="Utilize as ferramentas da barra acima ou digite markdown diretamente. Clique em '+ Imagem' para rolar até o banco de imagens."
                      />
                    </div>

                    {/* Painel do Preview */}
                    <div className="border border-[#e5e7eb] rounded-xl bg-[#f9fafb] p-5 flex flex-col min-h-[450px] max-h-[600px] overflow-y-auto shadow-sm">
                      <div className="border-b border-[#e5e7eb] pb-2 mb-4 flex justify-between items-center">
                        <p className="text-xs uppercase font-bold tracking-widest text-[#dc2626] font-rajdhani">
                          Pré-visualização em tempo real
                        </p>
                        <span className="text-[10px] bg-red-100 text-[#dc2626] px-2 py-0.5 rounded font-mono font-semibold">
                          Live
                        </span>
                      </div>
                      <div className="prose mx-auto w-full max-w-[560px] prose-headings:text-[#111827] prose-headings:leading-tight prose-p:text-[#1f2937] prose-p:leading-[1.45] prose-p:mb-3">
                        {form.content.trim().length > 0 ? (
                          <MarkdownContent content={form.content} />
                        ) : (
                          <p className="text-[#6b7280] text-sm font-exo mb-0 text-center py-20">
                            O conteúdo formatado aparecerá aqui em tempo real conforme você escreve.
                          </p>
                        )}
                      </div>
                    </div>

                  </div>
                  <p className="mt-2 text-xs text-[#6b7280] font-exo">
                    Use tags HTML como <code>&lt;span style="color: red"&gt;texto&lt;/span&gt;</code> para controle de cores avançado no meio do parágrafo.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="inline-flex items-center gap-3 rounded-xl border border-[#d1d5db] bg-white px-4 py-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={form.hot}
                      onChange={(event) => handleInput('hot', event.target.checked)}
                      className="h-4 w-4 rounded border-[#444] bg-[#111] text-[#dc2626] focus:ring-[#dc2626]"
                    />
                    <span className="text-[#374151] text-sm font-exo">Destaque Vermelho (Hot)</span>
                  </label>
                  <label className="inline-flex items-center gap-3 rounded-xl border border-[#d1d5db] bg-white px-4 py-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={form.published}
                      onChange={(event) => handleInput('published', event.target.checked)}
                      className="h-4 w-4 rounded border-[#444] bg-[#111] text-[#dc2626] focus:ring-[#dc2626]"
                    />
                    <span className="text-[#374151] text-sm font-exo">Publicar Imediatamente</span>
                  </label>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    disabled={saving || !isAdmin}
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#dc2626] px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-[#b91c1c] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <PlusCircle size={18} />
                    {saving ? 'Salvando...' : editingId ? 'Atualizar post' : 'Criar post'}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#6b7280] px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#4b5563]"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}

          {/* Guia de Configuração Rápida */}
          <div className="rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] p-5 text-sm text-[#4b5563]">
            <h2 className="font-semibold text-[#111827] mb-3">Configuração manual do admin</h2>
            <p className="mb-3">
              Insira o email do Google do administrador diretamente na tabela <code className="text-[#dc2626]">admins</code> do Supabase.
            </p>
            <pre className="overflow-x-auto rounded-xl bg-white border border-[#e5e7eb] p-4 text-xs text-[#4b5563]">
{`insert into public.admins (email) values ('seu-email@gmail.com');`}
            </pre>
            <p className="mt-3">
              Após adicionar o email, faça login com o mesmo Google em <code className="text-[#dc2626]">/admin</code>.
            </p>
          </div>

          {/* TERCEIRO CONTAINER: Posts Publicados */}
          {session?.user && isAdmin && (
            <div className="mt-8">
              <h2 className="text-3xl font-rajdhani font-bold text-[#111827] mb-6 flex items-center gap-2">
                <span>Posts publicados</span>
                {loadingPosts && <Loader2 size={20} className="animate-spin" />}
              </h2>

              {publishedPosts.length === 0 ? (
                <div className="rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-6 text-center text-[#6b7280]">
                  <p>Nenhum post publicado ainda. Crie seu primeiro post acima!</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {publishedPosts.map((post) => (
                    <div
                      key={post.id}
                      className="rounded-xl border border-[#e5e7eb] bg-white p-5 sm:p-6 hover:border-[#dc2626]/50 transition-all hover:shadow-md"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="inline-block bg-[#dc2626]/10 text-[#dc2626] text-xs font-bold px-3 py-1 rounded-full">
                              {post.category}
                            </span>
                            <span className="text-[#9ca3af] text-xs">{post.date}</span>
                          </div>
                          <h3 className="text-[#111827] font-rajdhani font-bold text-lg mb-1">
                            {post.title}
                          </h3>
                          <p className="text-[#6b7280] text-sm">
                            <code className="text-[#dc2626] bg-[#f3f4f6] px-2 py-1 rounded">{post.slug}</code>
                          </p>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                          <button
                            onClick={() => loadPostForEdit(post.id)}
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#3b82f6] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#2563eb]"
                          >
                            <Edit size={16} />
                            <span className="hidden sm:inline">Editar</span>
                          </button>
                          <button
                            onClick={() => deletePost(post.id)}
                            disabled={saving}
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#ef4444] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#dc2626] disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Trash2 size={16} />
                            <span className="hidden sm:inline">Deletar</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal de Configuração de Inserção de Imagem */}
      {insertImageMetadata.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-2xl w-full max-w-md">
            <h3 className="text-xl font-rajdhani font-bold text-[#111827] mb-4">
              Configurar Imagem para o Post
            </h3>
            
            <div className="relative h-40 w-full overflow-hidden rounded-lg bg-[#f3f4f6] mb-4 border border-[#e5e7eb]">
              <img
                src={insertImageMetadata.url}
                alt="Preview"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="grid gap-4 mb-6">
              <label className="block">
                <span className="text-[#374151] text-xs font-bold uppercase tracking-wider font-rajdhani">
                  Nome do arquivo SEO
                </span>
                <input
                  type="text"
                  value={insertImageMetadata.seoFileName}
                  onChange={(e) => setInsertImageMetadata(prev => ({ ...prev, seoFileName: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-[#d1d5db] bg-white px-3 py-2 text-sm text-[#111827] outline-none focus:border-[#dc2626]"
                  placeholder="Ex: ferrari-f80-supercar"
                />
              </label>

              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-[#374151] text-xs font-bold uppercase tracking-wider font-rajdhani">
                    Largura (padrão: 1600px)
                  </span>
                  <input
                    type="text"
                    value={insertImageMetadata.width}
                    onChange={(e) => setInsertImageMetadata(prev => ({ ...prev, width: e.target.value }))}
                    className="mt-1 w-full rounded-xl border border-[#d1d5db] bg-white px-3 py-2 text-sm text-[#111827] outline-none focus:border-[#dc2626]"
                    placeholder="1600px"
                  />
                </label>
                <label className="block">
                  <span className="text-[#374151] text-xs font-bold uppercase tracking-wider font-rajdhani">
                    Altura (padrão: 1067px)
                  </span>
                  <input
                    type="text"
                    value={insertImageMetadata.height}
                    onChange={(e) => setInsertImageMetadata(prev => ({ ...prev, height: e.target.value }))}
                    className="mt-1 w-full rounded-xl border border-[#d1d5db] bg-white px-3 py-2 text-sm text-[#111827] outline-none focus:border-[#dc2626]"
                    placeholder="1067px"
                  />
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setInsertImageMetadata(prev => ({ ...prev, isOpen: false }))}
                className="rounded-full border border-[#d1d5db] bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#4b5563] hover:bg-[#f9fafb]"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmInsertImage}
                className="rounded-full bg-[#dc2626] px-4 py-2 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#b91c1c]"
              >
                Inserir no Post
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

