import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import NewsCard from './NewsCard';
import { news } from '@/lib/data';

export default function NewsGrid() {
  const featured = news.filter((n) => n.featured).slice(0, 2);
  const rest = news.filter((n) => !n.featured).slice(0, 4);
  const sideItems = news.filter((n) => !n.featured).slice(4, 7);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-[#dc2626] text-xs font-bold uppercase tracking-[0.3em] font-rajdhani mb-2">
            Ultimas Noticias
          </p>
          <h2 className="text-3xl md:text-4xl font-rajdhani font-bold text-white red-line">
            Em Destaque
          </h2>
        </div>
        <Link
          href="/pesquisa"
          className="hidden sm:flex items-center gap-2 text-sm text-white/40 hover:text-[#dc2626] font-rajdhani uppercase tracking-wider transition-colors duration-300 group"
        >
          Ver Tudo <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Featured row: two large cards */}
      {featured.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {featured.map((item) => (
            <NewsCard key={item.id} item={item} variant="featured" />
          ))}
        </div>
      )}

      {/* Main grid + sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cards grid */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {rest.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>

        {/* Sidebar: latest */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-1 h-5 bg-[#dc2626] rounded-full" />
            <h3 className="font-rajdhani font-bold uppercase tracking-widest text-white text-sm">
              Mais Recentes
            </h3>
          </div>
          {sideItems.map((item) => (
            <NewsCard key={item.id} item={item} variant="horizontal" />
          ))}
          <Link
            href="/pesquisa"
            className="mt-2 flex items-center justify-center gap-2 border border-[#dc2626]/30 hover:border-[#dc2626] text-white/60 hover:text-[#dc2626] rounded-sm py-3 font-rajdhani font-bold uppercase tracking-widest text-sm transition-all duration-300 group"
          >
            Ver Todas <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
