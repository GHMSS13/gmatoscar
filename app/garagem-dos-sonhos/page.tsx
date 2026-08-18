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
  const allPosts = await getPosts({ includePrivateModelPosts: true });
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
        title="Os Carros Que Todo Entusiasta Gostaria de Ter"
        subtitle="Explore uma seleção de supercarros, carros esportivos, máquinas de competição e modelos extraordinários que marcaram a história e conquistaram um lugar na garagem dos sonhos dos apaixonados por carros."
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
                <NewsCard key={post.id} item={post} theme="light" sourcePath="/garagem-dos-sonhos" />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
