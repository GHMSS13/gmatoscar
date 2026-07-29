import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import NewsGrid from '@/components/NewsGrid';
import BrandsSection from '@/components/BrandsSection';
import Footer from '@/components/Footer';
import { getPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'GMATOSCAR Supercarros - Os Melhores Supercarros do Mundo',
  description:
    'Notícias atualizadas, rankings e tudo sobre supercarros, hypercars e carros de luxo. O maior canal brasileiro sobre automóveis de alta performance.',
};

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const posts = await getPosts();
  const topWeekPosts = posts.slice(0, 5);
  const curiosityPost = posts[5] ?? posts[0] ?? null;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="relative pt-0 sm:pt-10 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(148,163,184,0.08)_0%,transparent_70%)]" />

        <div className="relative z-10">
          <NewsGrid posts={posts} theme="light" />
        </div>
      </section>

      <BrandsSection />

      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-3 pb-8 sm:py-10 lg:py-12">
        <div className="rounded-2xl border border-[#e5e7eb] bg-white p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
            <div className="lg:col-span-7">
              <div className="flex items-end justify-between gap-3 mb-3 sm:mb-4">
                <div>
                  <p className="text-[#dc2626] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.26em] font-rajdhani mb-1">
                    Fechamento da Home
                  </p>
                  <h3 className="text-[#111827] text-[1.45rem] sm:text-[2rem] font-rajdhani font-bold leading-[1.02]">
                    Top 5 da Semana
                  </h3>
                </div>
                <Link
                  href="/noticias"
                  className="inline-flex items-center gap-2 text-[12px] sm:text-[13px] text-[#8b95a5] hover:text-[#dc2626] font-rajdhani uppercase tracking-[0.2em] transition-colors duration-300"
                >
                  Ver tudo <ArrowRight size={14} />
                </Link>
              </div>

              <div className="space-y-2.5 sm:space-y-3">
                {topWeekPosts.map((post, idx) => (
                  <Link
                    key={`${post.id}-week-${idx}`}
                    href={`/noticias/${post.slug}`}
                    className="group flex items-start gap-3 rounded-xl border border-[#e5e7eb] bg-[#fafafa] p-3 hover:border-[#dc2626]/35 hover:bg-white transition-colors duration-300"
                  >
                    <span className="inline-flex w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#dc2626]/10 text-[#dc2626] text-[11px] sm:text-[12px] font-rajdhani font-bold">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[#111827] text-[1rem] sm:text-[1.1rem] font-rajdhani font-bold uppercase leading-[1.05] line-clamp-2 group-hover:text-[#dc2626] transition-colors duration-300">
                        {post.title}
                      </p>
                      <p className="mt-1 text-[11px] text-[#6b7280] font-exo inline-flex items-center gap-1">
                        <Clock size={10} /> {post.read_time}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-xl border border-[#e5e7eb] bg-[#fafafa] p-3.5 sm:p-4 h-full flex flex-col">
                <p className="text-[#dc2626] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] font-rajdhani mb-2">
                  Curiosidade do Dia
                </p>
                {curiosityPost ? (
                  <>
                    <h4 className="text-[#111827] text-[1.15rem] sm:text-[1.25rem] font-rajdhani font-bold leading-[1.05] uppercase line-clamp-3">
                      {curiosityPost.title}
                    </h4>
                    <p className="mt-2 text-[12px] sm:text-[13px] text-[#4b5563] leading-[1.4] font-exo line-clamp-5">
                      {curiosityPost.excerpt}
                    </p>
                    <div className="mt-auto pt-4">
                      <Link
                        href={`/noticias/${curiosityPost.slug}`}
                        className="inline-flex items-center gap-2 text-[12px] sm:text-[13px] font-rajdhani font-bold uppercase tracking-[0.16em] text-[#111827] hover:text-[#dc2626] transition-colors duration-300"
                      >
                        Ler curiosidade <ArrowRight size={14} />
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <h4 className="text-[#111827] text-[1.15rem] sm:text-[1.25rem] font-rajdhani font-bold leading-[1.05] uppercase">
                      Novidades em breve
                    </h4>
                    <p className="mt-2 text-[12px] sm:text-[13px] text-[#4b5563] leading-[1.4] font-exo">
                      Estamos preparando novos fatos e curiosidades para deixar sua leitura ainda mais completa.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mt-5 sm:mt-6 rounded-xl border border-[#e5e7eb] bg-[#0f172a] p-4 sm:p-5 text-white">
            <p className="text-white/70 text-[11px] font-rajdhani uppercase tracking-[0.2em] mb-2">
              Continue explorando
            </p>
            <h4 className="text-[1.25rem] sm:text-[1.45rem] font-rajdhani font-bold leading-[1.05] uppercase mb-3">
              Descubra mais rankings, histórias e novidades
            </h4>
            <div className="flex flex-wrap gap-2.5">
              <Link href="/noticias" className="inline-flex items-center gap-1 rounded-lg bg-white text-[#111827] px-3.5 py-2 text-[12px] font-rajdhani font-bold uppercase tracking-[0.14em] hover:text-[#dc2626] transition-colors duration-300">
                Notícias <ArrowRight size={13} />
              </Link>
              <Link href="/ranking" className="inline-flex items-center gap-1 rounded-lg border border-white/30 text-white px-3.5 py-2 text-[12px] font-rajdhani font-bold uppercase tracking-[0.14em] hover:border-white hover:text-white transition-colors duration-300">
                Rankings <ArrowRight size={13} />
              </Link>
              <Link href="/garagem-dos-sonhos" className="inline-flex items-center gap-1 rounded-lg border border-white/30 text-white px-3.5 py-2 text-[12px] font-rajdhani font-bold uppercase tracking-[0.14em] hover:border-white hover:text-white transition-colors duration-300">
                Garagem dos Sonhos <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
