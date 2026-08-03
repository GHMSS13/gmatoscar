import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DesktopPageSearchBar from '@/components/DesktopPageSearchBar';
import NewsCard from '@/components/NewsCard';
import { getPostSection, getPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Garagem dos Sonhos | GMATOSCAR',
  description: 'Descubra seleções especiais com os carros dos sonhos para todo apaixonado por supercarros.',
};

export const dynamic = 'force-dynamic';

interface GaragemDosSonhosPageProps {
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

export default async function GaragemDosSonhosPage({ searchParams }: GaragemDosSonhosPageProps) {
  const allPosts = await getPosts();
  const garagePosts = allPosts.filter((post) => getPostSection(post) === 'Garagem dos Sonhos');
  const query = (searchParams?.q ?? '').trim();
  const normalizedQuery = normalizeText(query);

  const posts = garagePosts.filter((post) => {
    if (!normalizedQuery) {
      return true;
    }

    const searchable = normalizeText(
      [post.title, post.excerpt, post.content, post.category, post.slug].join(' ')
    );

    return searchable.includes(normalizedQuery);
  });

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <DesktopPageSearchBar
        action="/garagem-dos-sonhos"
        placeholder="Pesquise seleções, modelos ou temas da garagem..."
        defaultQuery={query}
        label="Garagem dos Sonhos"
        title="Uma seleção para quem sonha alto"
        subtitle="Descubra curadorias com modelos icônicos, raros e desejados para inspirar sua garagem ideal no universo dos supercarros."
      />

      <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto">
          {posts.length === 0 ? (
            <div className="rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-6 text-sm font-exo text-[#4b5563]">
              Nenhum resultado encontrado para o termo pesquisado.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {posts.map((post) => (
                <div key={post.id} className="space-y-2">
                  <span className="inline-flex items-center rounded-full border border-[#dc2626]/25 bg-[#fee2e2] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#b91c1c] font-rajdhani">
                    {getPostSection(post)}
                  </span>
                  <NewsCard item={post} theme="light" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
