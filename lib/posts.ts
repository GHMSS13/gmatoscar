import { supabase } from './supabase';

const fallbackPosts: Post[] = [
  {
    id: 'fallback-ferrari-f80',
    title: 'Ferrari F80 estreia com 1200 cv e foco total em desempenho',
    slug: 'ferrari-f80-estreia-1200cv',
    excerpt: 'Novo halo car da Ferrari combina eletrificacao e dinamica extrema para liderar a nova fase da marca.',
    content: 'A Ferrari apresentou o F80 como nova referencia de tecnologia e performance em sua linha de supercarros.',
    category: 'Ferrari',
    date: '2026-06-20',
    read_time: '4 min',
    image_url: 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=1200',
    external_url: null,
    featured: true,
    hot: true,
    published: true,
  },
  {
    id: 'fallback-lamborghini-revuelto',
    title: 'Lamborghini Revuelto domina testes de aceleracao',
    slug: 'lamborghini-revuelto-teste-aceleracao',
    excerpt: 'O V12 hibrido mostra consistencia em pista e confirma a nova fase da Lamborghini.',
    content: 'Com foco em resposta imediata e tracao integral, o Revuelto se destaca como um dos grandes nomes do ano.',
    category: 'Lamborghini',
    date: '2026-06-18',
    read_time: '3 min',
    image_url: 'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=1200',
    external_url: null,
    featured: true,
    hot: false,
    published: true,
  },
  {
    id: 'fallback-bugatti-tourbillon',
    title: 'Bugatti Tourbillon entra na rota dos 445 km/h',
    slug: 'bugatti-tourbillon-445-kmh',
    excerpt: 'A Bugatti prepara seu novo hiper GT para manter o topo em velocidade e luxo.',
    content: 'Tourbillon representa o novo capitulo da marca francesa com engenharia de altissimo nivel.',
    category: 'Bugatti',
    date: '2026-06-15',
    read_time: '5 min',
    image_url: 'https://images.pexels.com/photos/6311656/pexels-photo-6311656.jpeg?auto=compress&cs=tinysrgb&w=1200',
    external_url: null,
    featured: false,
    hot: true,
    published: true,
  },
  {
    id: 'fallback-mclaren-w1',
    title: 'McLaren W1 eleva a aerodinamica ativa a outro nivel',
    slug: 'mclaren-w1-aerodinamica-ativa',
    excerpt: 'Projeto britanico aposta em leveza e downforce para liderar o segmento de hypercars.',
    content: 'A McLaren reforca sua heranca de pista com um pacote voltado para eficiencia dinamica.',
    category: 'McLaren',
    date: '2026-06-12',
    read_time: '4 min',
    image_url: 'https://images.pexels.com/photos/128794/pexels-photo-128794.jpeg?auto=compress&cs=tinysrgb&w=1200',
    external_url: null,
    featured: false,
    hot: false,
    published: true,
  },
  {
    id: 'fallback-porsche-gt3rs',
    title: 'Porsche 911 GT3 RS segue como referencia de pista',
    slug: 'porsche-911-gt3-rs-referencia-pista',
    excerpt: 'Acerto fino de suspensao e aerodinamica fazem o GT3 RS continuar entre os favoritos.',
    content: 'A Porsche mostra consistencia tecnica no desenvolvimento de esportivos de alta precisao.',
    category: 'Porsche',
    date: '2026-06-10',
    read_time: '3 min',
    image_url: 'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=1200',
    external_url: null,
    featured: false,
    hot: false,
    published: true,
  },
  {
    id: 'fallback-rimac-nevera-r',
    title: 'Rimac Nevera R quebra novos marcos de desempenho eletrico',
    slug: 'rimac-nevera-r-novos-marcos',
    excerpt: 'A marca croata amplia a vantagem no segmento de hypercars eletricos.',
    content: 'Com mais potencia e refinamento de software, o Nevera R sobe o nivel da categoria.',
    category: 'Eletricos',
    date: '2026-06-08',
    read_time: '4 min',
    image_url: 'https://images.pexels.com/photos/1918137/pexels-photo-1918137.jpeg?auto=compress&cs=tinysrgb&w=1200',
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

export async function getPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('date', { ascending: false });

  if (error) {
    console.error('[getPosts] Supabase error:', error.message);
    return fallbackPosts;
  }

  const posts = (data as Post[]) ?? [];
  return posts.length > 0 ? posts : fallbackPosts;
}

export async function getPostSlugs() {
  const { data, error } = await supabase
    .from('posts')
    .select('slug')
    .eq('published', true);

  if (error) {
    console.error('[getPostSlugs] Supabase error:', error.message);
    return fallbackPosts.map((post) => ({ slug: post.slug }));
  }

  const slugs = data ?? [];
  return slugs.length > 0 ? slugs : fallbackPosts.map((post) => ({ slug: post.slug }));
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
    return fallbackPosts.find((post) => post.slug === slug) ?? null;
  }

  const post = data as Post | null;
  return post ?? fallbackPosts.find((item) => item.slug === slug) ?? null;
}
