'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import type { Post } from '@/lib/posts';

interface InfoCard {
  title: string;
  value: string;
  description: string;
  imageUrl?: string;
  href?: string;
}

interface HomeTopNewsSectionProps {
  heroPosts: Post[];
  middlePost?: Post;
  sidePosts: Post[];
  infoCards: InfoCard[];
}

export default function HomeTopNewsSection({
  heroPosts,
  middlePost,
  sidePosts,
  infoCards,
}: HomeTopNewsSectionProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [activeSlide, setActiveSlide] = useState(0);
  const placeholderImage =
    'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22320%22 height=%22200%22 viewBox=%220 0 320 200%22%3E%3Crect width=%22320%22 height=%22200%22 fill=%22%23e5e7eb%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%236b7280%22 font-family=%22Arial%22 font-size=%2214%22%3ESem imagem%3C/text%3E%3C/svg%3E';

  useEffect(() => {
    if (!api || heroPosts.length < 2) {
      return;
    }

    const timer = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [api, heroPosts.length]);

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

  const fallbackInfoCards: InfoCard[] = [
    {
      title: 'Conteudo Diario',
      value: 'Atualizado todos os dias',
      description: 'Novidades de supercarros, marcas e tendencias automotivas.',
      href: '/noticias',
    },
    {
      title: 'Mercado',
      value: 'Cenarios e comparativos',
      description: 'Acompanhe variacoes de preco, desempenho e exclusividade.',
      href: '/ranking',
    },
    {
      title: 'Garagem',
      value: 'Selecoes inspiradoras',
      description: 'Modelos iconicos e sugestoes para montar sua garagem dos sonhos.',
      href: '/garagem-dos-sonhos',
    },
  ];

  const normalizedInfoCards = [...infoCards];
  let fallbackIndex = 0;

  while (normalizedInfoCards.length < 4) {
    normalizedInfoCards.push(fallbackInfoCards[fallbackIndex % fallbackInfoCards.length]);
    fallbackIndex += 1;
  }

  const sideFallbackCards = [
    {
      title: 'Noticias em atualizacao',
      read_time: 'Em breve',
      image_url: heroPosts[0]?.image_url || placeholderImage,
    },
    {
      title: 'Novas noticias chegando',
      read_time: 'Em breve',
      image_url: heroPosts[1]?.image_url || heroPosts[0]?.image_url || placeholderImage,
    },
  ];

  const normalizedSidePosts = [...sidePosts.slice(0, 2)];

  while (normalizedSidePosts.length < 2) {
    const fallback = sideFallbackCards[normalizedSidePosts.length];
    normalizedSidePosts.push({
      id: `fallback-side-${normalizedSidePosts.length}`,
      title: fallback.title,
      slug: '',
      excerpt: '',
      content: '',
      category: 'Noticias',
      date: '',
      read_time: fallback.read_time,
      image_url: fallback.image_url,
      featured: false,
      hot: false,
      published: true,
      external_url: null,
    });
  }

  return (
    <section className="pt-8 sm:pt-9 lg:pt-14 pb-7 sm:pb-10 lg:pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 sm:gap-4 mb-4 sm:mb-5 lg:mb-3">
        <div>
          <p className="text-[#dc2626] text-[11px] font-bold uppercase tracking-[0.28em] font-rajdhani mb-1.5">
            Ultimas Noticias
          </p>
          <h2 className="text-[1.95rem] sm:text-4xl lg:text-[2.25rem] font-serif font-semibold text-[#111] red-line leading-[1.04]">
            Em Destaque
          </h2>
        </div>
        <Link
          href="/pesquisa"
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#4b5563] hover:text-[#dc2626] font-rajdhani uppercase tracking-[0.14em] sm:tracking-wider transition-colors duration-300 group"
        >
          Ver Tudo <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-4 mb-5 sm:mb-6 lg:mb-8 lg:h-[360px]">
        <div className="lg:col-span-6 lg:h-full">
          <div className="relative pb-5 sm:pb-6 lg:pb-0">
            <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
              <CarouselContent className="ml-0 lg:h-[360px]">
              {heroPosts.map((item) => (
                <CarouselItem key={item.id} className="pl-0 lg:h-full">
                  <article className="group rounded-sm overflow-hidden border border-[#e5e7eb] bg-white lg:h-full">
                    <Link href={`/noticias/${item.slug}`} className="block">
                      <div className="relative min-h-[250px] sm:min-h-[320px] lg:min-h-0 lg:h-[360px] overflow-hidden">
                        <Image
                          src={item.image_url}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-[#0f172a]/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-4 lg:p-4">
                          <p className="inline-flex bg-[#dc2626] text-white text-[10px] font-rajdhani font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-sm mb-2.5 sm:mb-3">
                            {item.category}
                          </p>
                          <h3 className="text-[1.6rem] sm:text-[1.85rem] lg:text-[1.95rem] leading-[1.03] text-white font-serif font-semibold mb-1.5 sm:mb-2 line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="text-white/80 text-[12px] sm:text-[14px] lg:text-[14px] leading-relaxed line-clamp-1 font-exo mb-1.5 sm:mb-2">
                            {item.excerpt}
                          </p>
                          <div className="flex items-center gap-2.5 text-[10px] sm:text-[11px] text-white/75 font-exo">
                            <span>{item.date}</span>
                            <span className="inline-flex items-center gap-1">
                              <Clock size={11} /> {item.read_time}
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

            {heroPosts.length > 1 && (
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-1.5 sm:bottom-2">
              {heroPosts.map((item, index) => (
                <button
                  key={`${item.id}-${index}`}
                  type="button"
                  aria-label={`Ir para slide ${index + 1}`}
                  onClick={() => api?.scrollTo(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeSlide === index ? 'w-5 bg-[#dc2626]' : 'w-1.5 bg-[#9ca3af]/60'
                  }`}
                />
              ))}
              </div>
            )}
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-3 lg:h-full">
          {middlePost ? (
            <article className="group rounded-sm overflow-hidden border border-[#e5e7eb] bg-white h-full">
              <Link href={`/noticias/${middlePost.slug}`} className="block h-full">
                <div className="relative h-full overflow-hidden">
                  <Image
                    src={middlePost.image_url}
                    alt={middlePost.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="inline-flex bg-[#dc2626] text-white text-[9px] font-rajdhani font-bold uppercase tracking-[0.16em] px-2 py-0.5 rounded-sm mb-1.5">
                      {middlePost.category}
                    </p>
                    <h3 className="text-white font-rajdhani font-bold text-[1.05rem] leading-[1.08] line-clamp-4 mb-1.5">
                      {middlePost.title}
                    </h3>
                    <p className="text-white/75 text-[10px] font-exo inline-flex items-center gap-1">
                      <Clock size={10} /> {middlePost.read_time}
                    </p>
                  </div>
                </div>
              </Link>
            </article>
          ) : (
            <article className="rounded-sm overflow-hidden border border-[#e5e7eb] bg-white h-full">
              <Link href="/noticias" className="block h-full">
                <div className="relative h-[160px] sm:h-[170px] lg:h-full overflow-hidden">
                  <Image
                    src={heroPosts[0]?.image_url || placeholderImage}
                    alt="Noticias em breve"
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="inline-flex bg-[#dc2626] text-white text-[9px] font-rajdhani font-bold uppercase tracking-[0.16em] px-2 py-0.5 rounded-sm mb-1.5">
                      Noticias
                    </p>
                    <h3 className="text-white font-rajdhani font-bold text-[1.05rem] leading-[1.08] line-clamp-3 mb-1.5">
                      Novas noticias em breve
                    </h3>
                    <p className="text-white/75 text-[10px] font-exo inline-flex items-center gap-1">
                      <Clock size={10} /> Em breve
                    </p>
                  </div>
                </div>
              </Link>
            </article>
          )}
        </div>

        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 gap-3 sm:gap-4 lg:gap-3 lg:h-full">
          {normalizedSidePosts.slice(0, 2).map((item, idx) => {
            const href = item.slug ? `/noticias/${item.slug}` : '/noticias';

            return (
            <article key={`${item.id}-${idx}`} className="group rounded-sm overflow-hidden border border-[#e5e7eb] bg-white lg:h-full">
              <Link href={href} className="block h-full">
                <div className="relative h-[160px] sm:h-[170px] lg:h-full overflow-hidden">
                  <Image
                    src={item.image_url || heroPosts[0]?.image_url || placeholderImage}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-3.5 lg:p-3.5">
                    <h3 className="text-white font-rajdhani font-bold text-[1rem] sm:text-[1.05rem] leading-[1.1] line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-[11px] mt-1.5 font-exo inline-flex items-center gap-1">
                      <Clock size={10} /> {item.read_time}
                    </p>
                  </div>
                </div>
              </Link>
            </article>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-3">
        {normalizedInfoCards.slice(0, 4).map((card, idx) => {
          const content = (
            <div className="rounded-sm border border-[#e5e7eb] bg-[#f8fafc] h-full overflow-hidden transition-colors duration-300 hover:border-[#dc2626]/35 hover:bg-white">
              <div className="relative aspect-[16/10] w-full bg-[#e5e7eb]">
                <Image
                  src={card.imageUrl || heroPosts[0]?.image_url || placeholderImage}
                  alt={card.value}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-2.5 sm:p-3 lg:p-3 min-h-[110px] sm:min-h-[120px] lg:min-h-[128px]">
                <p className="text-[#6b7280] text-[9px] font-rajdhani font-bold uppercase tracking-[0.18em] mb-1">
                  {card.title}
                </p>
                <p className="text-[#111827] text-[0.95rem] sm:text-[1.02rem] lg:text-[1rem] font-rajdhani font-bold leading-[1.1] mb-1 line-clamp-2">
                  {card.value}
                </p>
                <p className="text-[#4b5563] text-[11px] sm:text-[12px] leading-[1.35] font-exo line-clamp-3">{card.description}</p>
              </div>
            </div>
          );

          if (card.href) {
            return (
              <Link key={`${card.title}-${card.value}-${idx}`} href={card.href} className="group block h-full">
                {content}
              </Link>
            );
          }

          return <div key={`${card.title}-${card.value}-${idx}`} className="h-full">{content}</div>;
        })}
      </div>
    </section>
  );
}