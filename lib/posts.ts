import { supabase } from './supabase';

const fallbackPosts: Post[] = [
  {
    id: 'fallback-lamborghini-huracan-sto',
    title: 'Lamborghini Huracan STO: O Verdadeiro Carro de Corrida de Rua',
    slug: 'lamborghini-huracan-sto-640cv',
    excerpt: 'Conheca a Lamborghini Huracan STO, a expressao maxima de performance com motor V10 aspirado de 640 cv.',
    content: 'Nascida nas pistas da Squadra Corse e homologada para as ruas, a Huracan STO combina aerodinamica extrema, peso reduzido e acerto voltado para pilotagem pura.',
    category: 'Lancamentos',
    date: '2026-06-29',
    read_time: '3 min',
    image_url: 'https://images.unsplash.com/photo-1544829099-b9a0c5303bea?auto=format&fit=crop&w=1200&q=80',
    external_url: null,
    featured: false,
    hot: true,
    published: true,
  },
  {
    id: 'fallback-ferrari-f80-hypercar',
    title: 'Ferrari F80: preço, motor, potência e tudo sobre o novo hipercarro de 1.200 cv',
    slug: 'ferrari-f80-preco-motor-potencia-hipercarro-1200cv',
    excerpt: 'Tudo sobre a Ferrari F80: proposta, motorização, potência e o que torna o novo hipercarro um dos lançamentos mais importantes da marca.',
    content: 'A Ferrari F80 chega como o novo topo da linha da marca, unindo desempenho extremo, aerodinâmica ativa e uma linguagem técnica pensada para marcar uma nova fase em Maranello.',
    category: 'Lancamentos',
    date: '2026-06-29',
    read_time: '4 min',
    image_url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
    external_url: null,
    featured: false,
    hot: true,
    published: true,
  },
];

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  read_time: string;
  image_url: string;
  external_url?: string | null;
  featured: boolean;
  hot: boolean;
  published: boolean;
}

interface GetPostsOptions {
  includePrivateModelPosts?: boolean;
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function isFerrariF80Post(post: Post) {
  const slug = normalize(post.slug);
  const title = normalize(post.title);

  return slug.includes('ferrari-f80') || (title.includes('ferrari') && title.includes('f80'));
}

export function isFerrari250GtoPost(post: Post) {
  const slug = normalize(post.slug);
  const title = normalize(post.title);

  if (slug.includes('ferrari-250-gto')) {
    return true;
  }

  return title.includes('ferrari') && (title.includes('250 gto') || title.includes('250-gto'));
}

function filterPrivateModelPosts(posts: Post[]) {
  return posts.filter((post) => !isFerrari250GtoPost(post) && !isFerrariF80Post(post));
}

export async function getPosts(options: GetPostsOptions = {}) {
  const { includePrivateModelPosts = false } = options;

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[getPosts] Supabase error:', error.message);
    return includePrivateModelPosts ? fallbackPosts : filterPrivateModelPosts(fallbackPosts);
  }

  const posts = (data as Post[]) ?? [];
  const basePosts = posts.length > 0 ? posts : fallbackPosts;
  return includePrivateModelPosts ? basePosts : filterPrivateModelPosts(basePosts);
}

export async function getPostSlugs() {
  const { data, error } = await supabase
    .from('posts')
    .select('slug')
    .eq('published', true);

  if (error) {
    console.error('[getPostSlugs] Supabase error:', error.message);
    return filterPrivateModelPosts(fallbackPosts).map((post) => ({ slug: post.slug }));
  }

  const slugs = data ?? [];
  const baseSlugs = slugs.length > 0 ? slugs : fallbackPosts.map((post) => ({ slug: post.slug }));
  return baseSlugs;
}

export async function getPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();

  if (error) {
    console.error('[getPostBySlug] Supabase error:', error.message);
    const fallbackPost = fallbackPosts.find((post) => post.slug === slug) ?? null;
    return fallbackPost;
  }

  const post = data as Post | null;
  if (!post) {
    const fallbackPost = fallbackPosts.find((item) => item.slug === slug) ?? null;
    return fallbackPost;
  }

  return post;
}
