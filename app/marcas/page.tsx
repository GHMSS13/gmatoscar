import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DesktopPageSearchBar from '@/components/DesktopPageSearchBar';
import NewsCard from '@/components/NewsCard';
import { getPostSection, getPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Marcas de Supercarros',
  description:
    'Páginas editoriais sobre Ferrari, Lamborghini, Porsche, Bugatti, Pagani, McLaren e Koenigsegg com foco em SEO.',
  keywords: [
    'ferrari',
    'lamborghini',
    'porsche',
    'bugatti',
    'pagani',
    'mclaren',
    'koenigsegg',
    'marcas de supercarros',
  ],
  alternates: {
    canonical: '/marcas',
  },
};

interface MarcasPageProps {
  searchParams?: {
    q?: string;
  };
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export const dynamic = 'force-dynamic';

export default async function MarcasPage({ searchParams }: MarcasPageProps) {
  const allPosts = await getPosts();
  const brandPosts = allPosts.filter((post) => getPostSection(post) === 'Marcas');
  const query = (searchParams?.q ?? '').trim();
  const normalizedQuery = normalizeText(query);

  const posts = brandPosts.filter((post) => {
    if (!normalizedQuery) {
      return true;
    }

    const searchable = normalizeText([post.title, post.excerpt, post.content, post.category, post.slug].join(' '));

    return searchable.includes(normalizedQuery);
  });

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <DesktopPageSearchBar
        action="/marcas"
        placeholder="Pesquise artigos, marcas ou modelos..."
        defaultQuery={query}
        label="Marcas"
        title="Marcas de Supercarros"
        subtitle="Confira artigos, histórias, notícias e curiosidades sobre as maiores marcas de supercarros do mundo."
      />

      <section className="px-4 sm:px-6 lg:px-8 pb-20 max-w-7xl mx-auto">
        {posts.length === 0 ? (
          <div className="rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-6 text-sm font-exo text-[#4b5563]">
            Nenhum artigo encontrado para o termo pesquisado.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {posts.map((post) => (
              <NewsCard key={post.id} item={post} theme="light" />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
