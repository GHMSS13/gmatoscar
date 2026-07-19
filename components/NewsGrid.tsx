import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import NewsCard from './NewsCard';
import type { Post } from '@/lib/posts';

interface NewsGridProps {
  posts: Post[];
  theme?: 'dark' | 'light';
}

export default function NewsGrid({ posts, theme = 'dark' }: NewsGridProps) {
  const isLight = theme === 'light';
  const featuredCandidates = posts.filter((n) => n.featured).slice(0, 2);
  const hasFeaturedRow = !isLight && featuredCandidates.length === 2;
  const featured = hasFeaturedRow ? featuredCandidates : [];
  const feedPosts = hasFeaturedRow ? posts.filter((n) => !n.featured) : posts;
  const mobileFeatured = feedPosts[0];
  const mobileItems = feedPosts.slice(1, 5);
  const mobileAfterMoreFeatured = feedPosts[5];
  const mobileMore = feedPosts.slice(6, 8);
  const rest = feedPosts.slice(0, 4);
  const sideItems = feedPosts.slice(4, 7);

  return (
    <section className="pt-8 pb-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 sm:gap-4 mb-8 sm:mb-10">
        <div>
          <p className="text-[#dc2626] text-xs font-bold uppercase tracking-[0.3em] font-rajdhani mb-2">
            Ultimas Noticias
          </p>
          <h2 className={`text-3xl md:text-4xl font-bold red-line ${isLight ? 'font-serif text-[#111]' : 'font-rajdhani text-white'}`}>
            Em Destaque
          </h2>
        </div>
        <Link
          href="/pesquisa"
          className={`inline-flex items-center gap-2 text-sm hover:text-[#dc2626] font-rajdhani uppercase tracking-wider transition-colors duration-300 group ${isLight ? 'text-[#4b5563]' : 'text-white/40'}`}
        >
          Ver Tudo <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Featured row: two large cards */}
      {featured.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {featured.map((item) => (
            <NewsCard key={item.id} item={item} variant="featured" theme={theme} />
          ))}
        </div>
      )}

      {/* Mobile: one highlighted story + compact list */}
      <div className="md:hidden space-y-3">
        {mobileFeatured && <NewsCard item={mobileFeatured} variant="featured" theme={theme} />}
        <div className="flex items-center gap-3 pt-1">
          <span className="w-1 h-5 bg-[#dc2626] rounded-full" />
          <h3 className={`font-rajdhani font-bold uppercase tracking-widest text-sm ${isLight ? 'text-[#111]' : 'text-white'}`}>
            Mais Recentes
          </h3>
        </div>
        <div className="border-y border-[#d1d5db] divide-y divide-[#d1d5db]">
          {mobileItems.map((item) => (
            <NewsCard key={item.id} item={item} variant="compact" theme={theme} />
          ))}
        </div>
        <Link
          href="/pesquisa"
          className="group inline-flex w-full items-center justify-center gap-2 rounded-sm border border-[#d1d5db] py-3 text-sm font-rajdhani font-bold uppercase tracking-widest text-[#374151] transition-all duration-300 hover:border-[#dc2626] hover:text-[#dc2626]"
        >
          Ver Mais <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
        <div className="space-y-3 pt-1">
          {mobileAfterMoreFeatured && (
            <NewsCard item={mobileAfterMoreFeatured} variant="featured" theme={theme} />
          )}
          {mobileMore.map((item) => (
            <NewsCard key={item.id} item={item} variant="mobile-medium" theme={theme} />
          ))}
        </div>
      </div>

      {/* Main grid + sidebar */}
      <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Cards grid */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {rest.map((item) => (
            <NewsCard key={item.id} item={item} theme={theme} />
          ))}
        </div>

        {/* Sidebar: latest */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-1 h-5 bg-[#dc2626] rounded-full" />
            <h3 className={`font-rajdhani font-bold uppercase tracking-widest text-sm ${isLight ? 'text-[#111]' : 'text-white'}`}>
              Mais Recentes
            </h3>
          </div>
          {sideItems.map((item) => (
            <NewsCard key={item.id} item={item} variant="horizontal" theme={theme} />
          ))}
          <Link
            href="/pesquisa"
            className={`mt-2 flex items-center justify-center gap-2 hover:border-[#dc2626] hover:text-[#dc2626] rounded-sm py-3 font-rajdhani font-bold uppercase tracking-widest text-sm transition-all duration-300 group ${isLight ? 'border border-[#d1d5db] text-[#374151]' : 'border border-[#dc2626]/30 text-white/60'}`}
          >
            Ver Todas <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
