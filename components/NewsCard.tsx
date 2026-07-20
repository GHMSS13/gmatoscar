import Image from 'next/image';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import type { Post } from '@/lib/posts';

interface NewsCardProps {
  item: Post;
  variant?: 'default' | 'featured' | 'horizontal' | 'compact' | 'mobile-medium' | 'related';
  theme?: 'dark' | 'light';
}

export default function NewsCard({ item, variant = 'default', theme = 'dark' }: NewsCardProps) {
  const isLight = theme === 'light';

  if (variant === 'featured') {
    if (isLight) {
      return (
        <article className="news-card group rounded-sm overflow-hidden cursor-pointer border border-[#e5e7eb] bg-white">
          <Link href={`/noticias/${item.slug}`} className="block h-full">
            <div className="relative aspect-[16/10] sm:hidden overflow-hidden">
              <Image
                src={item.image_url}
                alt={item.title}
                fill
                className="news-img object-cover"
                sizes="100vw"
              />
            </div>

            <div className="p-4 sm:hidden border-t border-[#e5e7eb]">
              <h2 className="font-serif font-semibold text-[1.5rem] leading-[1.1] text-[#111] mb-2 line-clamp-3 group-hover:text-[#dc2626] transition-colors duration-300">
                {item.title}
              </h2>
              <p className="text-[13px] leading-[1.4] mb-3 line-clamp-2 font-exo text-[#4b5563]">
                {item.excerpt}
              </p>
              <div className="flex items-center gap-2 text-[11px] font-exo text-[#6b7280]">
                <span>{item.date}</span>
                <span className="inline-flex items-center gap-1">
                  <Clock size={10} /> {item.read_time}
                </span>
              </div>
            </div>

            <div className="relative hidden sm:block h-full min-h-[320px] md:min-h-[430px] overflow-hidden">
              <Image
                src={item.image_url}
                alt={item.title}
                fill
                className="news-img object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <h2 className="text-xl md:text-2xl leading-tight mb-2 group-hover:text-[#dc2626] transition-colors duration-300 line-clamp-2 font-serif font-semibold text-[#111]">
                  {item.title}
                </h2>
                <p className="text-sm leading-relaxed mb-3 line-clamp-2 font-exo text-[#4b5563]">
                  {item.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs font-exo text-[#6b7280]">
                    <span>{item.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {item.read_time}
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

    return (
      <article className={`news-card relative group h-full rounded-sm overflow-hidden cursor-pointer ${isLight ? 'bg-white border border-[#e5e7eb]' : 'card-glow bg-[#111]'}`}>
        <Link href={`/noticias/${item.slug}`} className="block h-full">
          <div className="relative h-full min-h-[250px] sm:min-h-[320px] md:min-h-[430px] overflow-hidden">
            <Image
              src={item.image_url}
              alt={item.title}
              fill
              className="news-img object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className={`absolute inset-0 ${isLight ? 'bg-gradient-to-t from-white via-white/70 to-transparent' : 'bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent'}`} />

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <h2 className={`text-xl md:text-2xl leading-tight mb-2 group-hover:text-[#dc2626] transition-colors duration-300 line-clamp-2 ${isLight ? 'font-serif font-semibold text-[#111]' : 'font-rajdhani font-bold text-white'}`}>
                {item.title}
              </h2>
              <p className={`text-sm leading-relaxed mb-3 line-clamp-2 font-exo ${isLight ? 'text-[#4b5563]' : 'text-white/60'}`}>
                {item.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className={`flex items-center gap-3 text-xs font-exo ${isLight ? 'text-[#6b7280]' : 'text-white/40'}`}>
                  <span>{item.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {item.read_time}
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
      <article className={`news-card group flex flex-col sm:flex-row gap-4 rounded-sm overflow-hidden transition-all duration-300 cursor-pointer ${isLight ? 'bg-white border border-[#e5e7eb] hover:border-[#dc2626]/40' : 'bg-[#111] border border-[#1e1e1e] hover:border-[#dc2626]/30'}`}>
        <Link href={`/noticias/${item.slug}`} className="flex flex-col sm:flex-row gap-4 w-full p-4">
          <div className="relative w-full h-44 sm:w-32 sm:h-32 flex-shrink-0 rounded-sm overflow-hidden">
            <Image
              src={item.image_url}
              alt={item.title}
              fill
              className="news-img object-cover"
              sizes="(max-width: 768px) 100vw, 128px"
            />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
            <div>
              <h3 className={`text-base leading-tight line-clamp-2 group-hover:text-[#dc2626] transition-colors duration-300 ${isLight ? 'font-serif font-semibold text-[#111]' : 'font-rajdhani font-bold text-white'}`}>
                {item.title}
              </h3>
            </div>
            <div className={`flex items-center gap-3 text-xs font-exo mt-2 ${isLight ? 'text-[#6b7280]' : 'text-white/30'}`}>
              <span>{item.date}</span>
              <span className="flex items-center gap-1"><Clock size={11} /> {item.read_time}</span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className="group overflow-hidden transition-all duration-300 cursor-pointer">
        <Link href={`/noticias/${item.slug}`} className="flex gap-4 py-4">
          <div className="relative w-[132px] h-[94px] flex-shrink-0 rounded-[2px] overflow-hidden">
            <Image
              src={item.image_url}
              alt={item.title}
              fill
              className="news-img object-cover"
              sizes="132px"
            />
          </div>
          <div className="min-w-0 flex-1 flex flex-col justify-between">
            <h3 className={`text-[19px] leading-[1.14] line-clamp-3 group-hover:text-[#dc2626] transition-colors duration-300 ${isLight ? 'font-serif font-semibold text-[#111]' : 'font-rajdhani font-bold text-white'}`}>
              {item.title}
            </h3>
            <div className={`flex items-center gap-2 text-[11px] mt-2.5 font-exo ${isLight ? 'text-[#6b7280]' : 'text-white/30'}`}>
              <span>{item.date}</span>
              <span className="inline-flex items-center gap-1"><Clock size={10} /> {item.read_time}</span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  if (variant === 'mobile-medium') {
    return (
      <article className={`group rounded-sm overflow-hidden transition-all duration-300 cursor-pointer ${isLight ? 'bg-white border border-[#e5e7eb] hover:border-[#d1d5db]' : 'bg-[#111] border border-[#1e1e1e] hover:border-[#dc2626]/30'}`}>
        <Link href={`/noticias/${item.slug}`} className="flex gap-3 p-3.5">
          <div className="relative w-[124px] h-[92px] flex-shrink-0 rounded-[2px] overflow-hidden">
            <Image
              src={item.image_url}
              alt={item.title}
              fill
              className="news-img object-cover"
              sizes="124px"
            />
          </div>
          <div className="min-w-0 flex-1 flex flex-col justify-between">
            <h3 className={`text-[18px] leading-[1.12] line-clamp-3 group-hover:text-[#dc2626] transition-colors duration-300 ${isLight ? 'font-serif font-semibold text-[#111]' : 'font-rajdhani font-bold text-white'}`}>
              {item.title}
            </h3>
            <p className={`text-[12px] leading-[1.35] mt-1.5 line-clamp-2 font-exo ${isLight ? 'text-[#4b5563]' : 'text-white/55'}`}>
              {item.excerpt}
            </p>
            <div className={`flex items-center gap-2 text-[11px] mt-2 font-exo ${isLight ? 'text-[#6b7280]' : 'text-white/30'}`}>
              <span>{item.date}</span>
              <span className="inline-flex items-center gap-1"><Clock size={10} /> {item.read_time}</span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  if (variant === 'related') {
    return (
      <article className={`news-card group rounded-sm overflow-hidden cursor-pointer h-full flex flex-col ${isLight ? 'bg-white border border-[#e5e7eb]' : 'bg-[#111] border border-[#1e1e1e] card-glow'}`}>
        <Link href={`/noticias/${item.slug}`} className="flex flex-col h-full">
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={item.image_url}
              alt={item.title}
              fill
              className="news-img object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className={`absolute inset-0 ${isLight ? 'bg-gradient-to-t from-white/10 to-transparent' : 'bg-gradient-to-t from-black/40 to-transparent'}`} />
          </div>
          <div className="flex flex-col flex-1 p-4 sm:p-5">
            <h3 className={`text-xl md:text-2xl leading-tight mb-2 sm:mb-3 group-hover:text-[#dc2626] transition-colors duration-300 line-clamp-3 ${isLight ? 'font-serif font-semibold text-[#111]' : 'font-rajdhani font-bold text-white'}`}>
              {item.title}
            </h3>
            <p className={`text-sm leading-relaxed mb-3 sm:mb-4 flex-1 line-clamp-2 sm:line-clamp-3 font-exo ${isLight ? 'text-[#4b5563]' : 'text-white/50'}`}>
              {item.excerpt}
            </p>
            <div className={`flex items-center justify-between pt-2 sm:pt-3 mt-auto ${isLight ? 'border-t border-[#e5e7eb]' : 'border-t border-[#1e1e1e]'}`}>
              <div className={`flex items-center gap-3 text-xs font-exo ${isLight ? 'text-[#6b7280]' : 'text-white/30'}`}>
                <span>{item.date}</span>
                <span className="flex items-center gap-1"><Clock size={11} /> {item.read_time}</span>
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

  return (
    <article className={`news-card group rounded-sm overflow-hidden cursor-pointer h-full flex flex-col ${isLight ? 'bg-white border border-[#e5e7eb]' : 'bg-[#111] border border-[#1e1e1e] card-glow'}`}>
      <Link href={`/noticias/${item.slug}`} className="flex flex-col h-full">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={item.image_url}
            alt={item.title}
            fill
            className="news-img object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className={`absolute inset-0 ${isLight ? 'bg-gradient-to-t from-white/10 to-transparent' : 'bg-gradient-to-t from-black/40 to-transparent'}`} />
        </div>
        <div className="flex flex-col flex-1 p-4 sm:p-5">
          <h3 className={`text-base sm:text-lg leading-tight mb-2 sm:mb-3 group-hover:text-[#dc2626] transition-colors duration-300 line-clamp-2 ${isLight ? 'font-serif font-semibold text-[#111]' : 'font-rajdhani font-bold text-white'}`}>
            {item.title}
          </h3>
          <p className={`text-sm leading-relaxed mb-3 sm:mb-4 flex-1 line-clamp-2 sm:line-clamp-3 font-exo ${isLight ? 'text-[#4b5563]' : 'text-white/50'}`}>
            {item.excerpt}
          </p>
          <div className={`flex items-center justify-between pt-2 sm:pt-3 mt-auto ${isLight ? 'border-t border-[#e5e7eb]' : 'border-t border-[#1e1e1e]'}`}>
            <div className={`flex items-center gap-3 text-xs font-exo ${isLight ? 'text-[#6b7280]' : 'text-white/30'}`}>
              <span>{item.date}</span>
              <span className="flex items-center gap-1"><Clock size={11} /> {item.read_time}</span>
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
