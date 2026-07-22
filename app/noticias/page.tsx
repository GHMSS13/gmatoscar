import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsCard from '@/components/NewsCard';
import { getPostSection, getPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Notícias | GMATOSCAR',
  description: 'Acompanhe as principais notícias do universo dos supercarros no GMATOSCAR.',
};

export const dynamic = 'force-dynamic';

export default async function NoticiasPage() {
  const allPosts = await getPosts();
  const posts = allPosts.filter((post) => getPostSection(post) === 'Noticias');

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-28 sm:pt-36 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#dc2626] text-xs font-bold uppercase tracking-[0.3em] font-rajdhani mb-4">
            Notícias
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-[#111827] leading-tight mb-6">
            Últimas notícias dos supercarros
          </h1>
          <p className="text-[#1f2937] text-sm sm:text-base leading-relaxed font-exo max-w-3xl">
            Esta seção reúne as principais atualizações do universo automotivo de alto desempenho,
            com novidades, lançamentos, recordes e histórias que movimentam o mundo dos
            supercarros.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto">
          {posts.length === 0 ? (
            <div className="rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-6 text-sm font-exo text-[#4b5563]">
              Ainda nao ha artigos publicados em Noticias.
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
