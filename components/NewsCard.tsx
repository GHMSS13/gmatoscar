import Image from 'next/image';
import Link from 'next/link';
import { Clock, ArrowRight, Flame } from 'lucide-react';
import type { NewsItem } from '@/lib/data';

interface NewsCardProps {
  item: NewsItem;
  variant?: 'default' | 'featured' | 'horizontal';
}

export default function NewsCard({ item, variant = 'default' }: NewsCardProps) {
  if (variant === 'featured') {
    return (
      <article className="news-card relative group h-full rounded-sm overflow-hidden card-glow cursor-pointer bg-[#111]">
        <Link href={`/noticias/${item.slug}`} className="block h-full">
          <div className="relative h-full min-h-[480px] md:min-h-[560px] overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="news-img object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="tag-badge bg-[#dc2626] text-white">{item.category}</span>
                {item.hot && (
                  <span className="tag-badge bg-[#1a1a1a] border border-[#dc2626]/40 text-[#dc2626] flex items-center gap-1">
                    <Flame size={10} fill="currentColor" /> HOT
                  </span>
                )}
              </div>
              <h2 className="font-rajdhani text-2xl md:text-3xl font-bold text-white leading-tight mb-3 group-hover:text-[#dc2626] transition-colors duration-300">
                {item.title}
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-2 font-exo">
                {item.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-white/40 font-exo">
                  <span>{item.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {item.readTime}
                  </span>
                </div>
                <span className="flex items-center gap-1 text-[#dc2626] text-sm font-rajdhani font-bold uppercase tracking-wider group-hover:gap-2 transition-all duration-300">
                  Ler <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  if (variant === 'horizontal') {
    return (
      <article className="news-card group flex gap-4 bg-[#111] border border-[#1e1e1e] rounded-sm overflow-hidden hover:border-[#dc2626]/30 transition-all duration-300 cursor-pointer">
        <Link href={`/noticias/${item.slug}`} className="flex gap-4 w-full p-4">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-sm overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="news-img object-cover"
              sizes="128px"
            />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
            <div>
              <span className="tag-badge bg-[#dc2626]/15 text-[#dc2626] text-[10px] mb-2 inline-block">{item.category}</span>
              <h3 className="font-rajdhani font-bold text-white text-base leading-tight line-clamp-2 group-hover:text-[#dc2626] transition-colors duration-300">
                {item.title}
              </h3>
            </div>
            <div className="flex items-center gap-3 text-xs text-white/30 font-exo mt-2">
              <span>{item.date}</span>
              <span className="flex items-center gap-1"><Clock size={11} /> {item.readTime}</span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="news-card group bg-[#111] border border-[#1e1e1e] rounded-sm overflow-hidden card-glow cursor-pointer h-full flex flex-col">
      <Link href={`/noticias/${item.slug}`} className="flex flex-col h-full">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="news-img object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="tag-badge bg-[#dc2626] text-white">{item.category}</span>
            {item.hot && (
              <span className="tag-badge bg-black/70 border border-[#dc2626]/40 text-[#dc2626] flex items-center gap-1">
                <Flame size={9} fill="currentColor" /> HOT
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 p-5">
          <h3 className="font-rajdhani text-lg font-bold text-white leading-tight mb-3 group-hover:text-[#dc2626] transition-colors duration-300 line-clamp-2">
            {item.title}
          </h3>
          <p className="text-white/50 text-sm leading-relaxed mb-4 flex-1 line-clamp-3 font-exo">
            {item.excerpt}
          </p>
          <div className="flex items-center justify-between border-t border-[#1e1e1e] pt-3 mt-auto">
            <div className="flex items-center gap-3 text-xs text-white/30 font-exo">
              <span>{item.date}</span>
              <span className="flex items-center gap-1"><Clock size={11} /> {item.readTime}</span>
            </div>
            <span className="text-[#dc2626] flex items-center gap-1 text-xs font-rajdhani font-bold uppercase tracking-wider group-hover:gap-2 transition-all duration-300">
              Ler <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
