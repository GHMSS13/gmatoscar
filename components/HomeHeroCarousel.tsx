'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';

interface HeroSlide {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  readTime: string;
  href: string;
}

interface HomeHeroCarouselProps {
  slides: HeroSlide[];
}

export default function HomeHeroCarousel({ slides }: HomeHeroCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  useEffect(() => {
    if (!api || slides.length < 2 || isCarouselPaused) {
      return;
    }

    const timer = setInterval(() => {
      if (document.visibilityState === 'visible') {
        api.scrollNext();
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [api, slides.length, isCarouselPaused]);

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setActiveSlide(api.selectedScrollSnap());
    };

    onSelect();
    api.on('select', onSelect);
    api.on('reInit', onSelect);

    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api]);

  return (
    <div className="-mx-4 sm:mx-0 lg:col-span-6 lg:h-full">
      <div
        className="relative pb-5 sm:pb-6 lg:pb-0"
        role="region"
        aria-label="Artigos em destaque"
        aria-roledescription="carrossel"
        onMouseEnter={() => setIsCarouselPaused(true)}
        onMouseLeave={() => setIsCarouselPaused(false)}
        onTouchStart={() => setIsCarouselPaused(true)}
        onTouchEnd={() => setIsCarouselPaused(false)}
        onTouchCancel={() => setIsCarouselPaused(false)}
        onFocusCapture={() => setIsCarouselPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setIsCarouselPaused(false);
          }
        }}
      >
        <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
          <CarouselContent className="ml-0 lg:h-[390px]">
            {slides.map((slide, index) => (
              <CarouselItem key={slide.id} className="pl-0 lg:h-full">
                <article className="group rounded-none sm:rounded-sm lg:rounded-xl overflow-hidden border-0 sm:border sm:border-[#e5e7eb] bg-white lg:h-full">
                  <Link href={slide.href} className="block">
                    <div className="relative min-h-[420px] bg-[#0a0a0a] sm:min-h-[320px] lg:min-h-0 lg:h-[390px] overflow-hidden">
                      <Image
                        src={slide.imageUrl}
                        alt={slide.title}
                        fill
                        className="object-cover object-[center_45%] sm:object-[center_42%] transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority={index === 0}
                        loading={index === 0 ? 'eager' : 'lazy'}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-[#0f172a]/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-4 lg:p-4">
                        <p className="inline-flex bg-[#dc2626] text-white text-[10px] font-rajdhani font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-sm mb-2.5 sm:mb-3">
                          Lançamento
                        </p>
                        <h3 className="text-shadow-overlay text-[1.6rem] sm:text-[1.85rem] lg:text-[1.95rem] leading-[1.03] text-white font-serif font-semibold mb-1.5 sm:mb-2 line-clamp-2">
                          {slide.title}
                        </h3>
                        <p className="text-shadow-overlay text-white/75 text-[14px] sm:text-[15px] lg:text-[15px] leading-[1.5] line-clamp-1 font-exo mb-1.5 sm:mb-2">
                          {slide.excerpt}
                        </p>
                        <div className="text-shadow-overlay flex items-center gap-2.5 text-[10px] sm:text-[11px] text-white/75 font-exo">
                          <span>{slide.date}</span>
                          <span className="inline-flex items-center gap-1">
                            <Clock size={11} /> {slide.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {slides.length > 1 && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-1.5 lg:bottom-2">
            {slides.map((slide, index) => (
              <button
                key={`${slide.id}-${index}`}
                type="button"
                aria-label={`Mostrar destaque ${index + 1}: ${slide.title}`}
                aria-pressed={activeSlide === index}
                onClick={() => api?.scrollTo(index)}
                className="flex h-6 w-6 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#dc2626]"
              >
                <span
                  aria-hidden="true"
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeSlide === index ? 'w-5 bg-[#dc2626]' : 'w-1.5 bg-[#9ca3af]/60'
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
