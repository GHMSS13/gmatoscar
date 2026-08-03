import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DesktopPageSearchBar from '@/components/DesktopPageSearchBar';
import NewsCard from '@/components/NewsCard';
import { getPostSection, getPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Notícias | GMATOSCAR',
  description: 'Acompanhe as principais notícias do universo dos supercarros no GMATOSCAR.',
};

export const dynamic = 'force-dynamic';

interface NoticiasPageProps {
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

export default async function NoticiasPage({ searchParams }: NoticiasPageProps) {
  const allPosts = await getPosts();
  const newsPosts = allPosts.filter((post) => getPostSection(post) === 'Noticias');
  const query = (searchParams?.q ?? '').trim();
  const normalizedQuery = normalizeText(query);

  const posts = newsPosts.filter((post) => {
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
        action="/noticias"
        placeholder="Pesquise artigos, modelos ou temas de notícias..."
        defaultQuery={query}
        label="Notícias"
        title="ADRENALINA PURA: As Últimas da Pista e da Rua"
        subtitle="Mergulhe no universo dos hipercarros e máquinas de alto desempenho. Cobertura exclusiva e atualizações quentes direto dos fabricantes lendários como Ferrari, Lamborghini e Bugatti, para quem respira velocidade, luxo e alto desempenho."
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
                <NewsCard key={post.id} item={post} theme="light" />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
