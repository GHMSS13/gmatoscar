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
  dreamGaragePosts: Post[];
  rankingPosts: Post[];
}

export default function HomeTopNewsSection({
  heroPosts,
  middlePost,
  sidePosts,
  infoCards,
  dreamGaragePosts,
  rankingPosts,
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
      title: 'Conteúdo Diário',
      value: 'Atualizado todos os dias',
      description: 'Novidades de supercarros, marcas e tendências automotivas.',
      href: '/noticias',
    },
    {
      title: 'Mercado',
      value: 'Cenarios e comparativos',
      description: 'Acompanhe variações de preço, desempenho e exclusividade.',
      href: '/ranking',
    },
    {
      title: 'Garagem',
      value: 'Seleções inspiradoras',
      description: 'Modelos icônicos e sugestões para montar sua garagem dos sonhos.',
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
      title: 'Notícias em atualização',
      read_time: 'Em breve',
      image_url: heroPosts[0]?.image_url || placeholderImage,
    },
    {
      title: 'Novas notícias chegando',
      read_time: 'Em breve',
      image_url: heroPosts[1]?.image_url || heroPosts[0]?.image_url || placeholderImage,
    },
  ];

  const normalizedSidePosts = [...sidePosts.slice(0, 5)];

  while (normalizedSidePosts.length < 5) {
    const fallback = sideFallbackCards[normalizedSidePosts.length % sideFallbackCards.length];
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

  const normalizedDreamGaragePosts = [...dreamGaragePosts.slice(0, 6)];

  const additionalRecentPosts = heroPosts
    .slice(2, 6)
    .filter((post) => !normalizedSidePosts.some((sidePost) => sidePost.id === post.id));

  const desktopNewsRowCandidates = [
    ...normalizedSidePosts.slice(2, 5),
    ...additionalRecentPosts,
    ...heroPosts.slice(2, 7),
  ];

  const desktopNewsRowPosts: Post[] = [];
  const mobileRecentPost = normalizedSidePosts[0];

  for (const post of desktopNewsRowCandidates) {
    if (!desktopNewsRowPosts.some((rowPost) => rowPost.id === post.id)) {
      desktopNewsRowPosts.push(post);
    }

    if (desktopNewsRowPosts.length === 4) {
      break;
    }
  }

  while (desktopNewsRowPosts.length < 4) {
    desktopNewsRowPosts.push({
      id: `fallback-desktop-news-${desktopNewsRowPosts.length}`,
      title: 'Notícias em atualização',
      slug: '',
      excerpt: 'Novas seleções e conteúdos especiais chegando em breve.',
      content: '',
      category: 'Noticias',
      date: '',
      read_time: 'Em breve',
      image_url:
        heroPosts[desktopNewsRowPosts.length + 1]?.image_url ||
        heroPosts[0]?.image_url ||
        placeholderImage,
      featured: false,
      hot: false,
      published: true,
      external_url: null,
    });
  }

  while (normalizedDreamGaragePosts.length === 0) {
    normalizedDreamGaragePosts.push({
      id: `fallback-garage-${normalizedDreamGaragePosts.length}`,
      title: 'Garagem dos Sonhos em atualização',
      slug: '',
      excerpt: 'Novas seleções e conteúdos especiais chegando em breve.',
      content: '',
      category: 'Garagem dos Sonhos',
      date: '',
      read_time: 'Em breve',
      image_url:
        heroPosts[normalizedDreamGaragePosts.length]?.image_url ||
        heroPosts[0]?.image_url ||
        placeholderImage,
      featured: false,
      hot: false,
      published: true,
      external_url: null,
    });
  }

  const dreamGarageCategoryHighlights = [
    {
      title: 'Carros de Luxo',
      description: 'Modelos com acabamento premium, conforto extremo e foco em exclusividade.',
      href: '/garagem-dos-sonhos?theme=luxo',
      badge: 'Luxo',
    },
    {
      title: 'Carros Esportivos',
      description: 'Seleções para quem busca dirigibilidade, desempenho e design agressivo.',
      href: '/garagem-dos-sonhos?theme=esportivos',
      badge: 'Esportivos',
    },
    {
      title: 'Off Road',
      description: 'Explore veículos preparados para trilhas, terrenos difíceis e aventura fora da estrada.',
      href: '/garagem-dos-sonhos?theme=off-road',
      badge: 'Off Road',
    },
  ];

  const dreamGarageBrandLinks = [
    { label: 'Ferrari', href: '/garagem-dos-sonhos?brand=ferrari' },
    { label: 'Lamborghini', href: '/garagem-dos-sonhos?brand=lamborghini' },
    { label: 'Bugatti', href: '/garagem-dos-sonhos?brand=bugatti' },
    { label: 'McLaren', href: '/garagem-dos-sonhos?brand=mclaren' },
    { label: 'Porsche', href: '/garagem-dos-sonhos?brand=porsche' },
    { label: 'Koenigsegg', href: '/garagem-dos-sonhos?brand=koenigsegg' },
    { label: 'Pagani', href: '/garagem-dos-sonhos?brand=pagani' },
  ];

  const normalizedRankingPosts = [...rankingPosts.slice(0, 9)];

  const rankingFallbackTitles = [
    'Os 20 carros mais rápidos do mundo',
    'Os 10 modelos mais caros do planeta',
    'Os 10 carros mais odiados da Ferrari',
    'As 12 lendas japonesas mais desejadas',
    'Top 15 V8 com o ronco mais marcante',
    'Os 8 hipercarros com melhor relacao peso-potencia',
    '10 supercarros subestimados que valem cada centavo',
    'Top 12 clássicos que ainda impressionam em 2026',
    'Top 10 superesportivos com melhor custo-benefício',
  ];

  while (normalizedRankingPosts.length < 9) {
    const fallbackIdx = normalizedRankingPosts.length;
    normalizedRankingPosts.push({
      id: `fallback-ranking-${fallbackIdx}`,
      title: rankingFallbackTitles[fallbackIdx] || 'Ranking em atualização',
      slug: '',
      excerpt: 'Estamos preparando novas listas e comparativos para esta seção.',
      content: '',
      category: 'Rankings',
      date: '',
      read_time: 'Em breve',
      image_url:
        heroPosts[fallbackIdx + 1]?.image_url ||
        heroPosts[0]?.image_url ||
        placeholderImage,
      featured: false,
      hot: false,
      published: true,
      external_url: null,
    });
  }

  const getSmartObjectPosition = (
    title: string,
    variant: 'featured' | 'highlight' | 'default'
  ) => {
    const normalizedTitle = title.toLowerCase();

    if (/(traseira|rear|tail|spoiler|difusor)/.test(normalizedTitle)) {
      return 'center 58%';
    }

    if (/(frente|front|grille|farol|headlight)/.test(normalizedTitle)) {
      return 'center 38%';
    }

    if (/(interior|cockpit|painel|cabine)/.test(normalizedTitle)) {
      return 'center 30%';
    }

    if (/(suv|pickup|caminhonete)/.test(normalizedTitle)) {
      return 'center 45%';
    }

    if (variant === 'featured') {
      return 'center 42%';
    }

    if (variant === 'highlight') {
      return 'center 38%';
    }

    return 'center 35%';
  };

  const extractContentImageUrls = (content: string) => {
    if (!content) {
      return [] as string[];
    }

    const matches = content.match(/https?:\/\/[^\s)"']+\.(?:png|jpe?g|webp|avif|gif)(?:\?[^\s)"']*)?/gi) ?? [];
    const uniqueUrls: string[] = [];

    for (const url of matches) {
      if (!uniqueUrls.includes(url)) {
        uniqueUrls.push(url);
      }
    }

    return uniqueUrls;
  };

  const getDreamGarageVisualSet = (post: Post | undefined, seed: number) => {
    const coverImage = post?.image_url || heroPosts[seed]?.image_url || heroPosts[0]?.image_url || placeholderImage;
    const contentImages = extractContentImageUrls(post?.content || '');

    const secondaryPool = [
      ...contentImages,
      ...heroPosts.map((item) => item.image_url),
      ...normalizedDreamGaragePosts.map((item) => item.image_url),
      placeholderImage,
    ].filter((url) => url && url !== coverImage);

    const interiorImage = secondaryPool[0] || coverImage;
    const galleryImage = secondaryPool[1] || secondaryPool[0] || coverImage;

    return {
      coverImage,
      interiorImage,
      galleryImage,
    };
  };

  const featuredGarageCards = [normalizedDreamGaragePosts[0]].map((post, idx) => ({
    post,
    href: post?.slug ? `/noticias/${post.slug}` : '/garagem-dos-sonhos',
    visuals: getDreamGarageVisualSet(post, idx + 1),
  }));

  const featuredGarageDesktopCards = normalizedDreamGaragePosts.slice(0, 2).map((post, idx) => ({
    post,
    href: post?.slug ? `/noticias/${post.slug}` : '/garagem-dos-sonhos',
    visuals: getDreamGarageVisualSet(post, idx + 1),
  }));

  return (
    <section className="pt-0 sm:pt-9 lg:pt-14 pb-7 sm:pb-10 lg:pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="hidden sm:flex sm:flex-row items-start sm:items-end justify-between gap-2 sm:gap-4 mb-4 sm:mb-5 lg:mb-3">
        <div>
          <p className="text-[#dc2626] text-[11px] font-bold uppercase tracking-[0.28em] font-rajdhani mb-1.5">
            Últimas Notícias
          </p>
          <h2 className="text-[1.95rem] sm:text-4xl lg:text-[2.25rem] font-serif font-semibold text-[#111] red-line leading-[1.04]">
            Em Destaque
          </h2>
        </div>
        <Link
          href="/noticias"
          className="hidden sm:inline-flex shrink-0 whitespace-nowrap items-center justify-center gap-2 rounded-lg bg-[#dc2626] px-5 py-2 text-[12px] text-white hover:bg-[#b91c1c] font-rajdhani font-bold uppercase tracking-[0.14em] transition-colors duration-300 shadow-[0_8px_20px_rgba(220,38,38,0.25)] group"
        >
          Notícias Recentes <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-4 mb-5 sm:mb-6 lg:mb-8 lg:h-[390px]">
        <div className="-mx-4 sm:mx-0 lg:col-span-6 lg:h-full">
          <div className="relative pb-5 sm:pb-6 lg:pb-0">
            <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
              <CarouselContent className="ml-0 lg:h-[390px]">
              {heroPosts.map((item) => (
                <CarouselItem key={item.id} className="pl-0 lg:h-full">
                  <article className="group rounded-none sm:rounded-sm lg:rounded-xl overflow-hidden border-0 sm:border sm:border-[#e5e7eb] bg-white lg:h-full">
                    <Link href={`/noticias/${item.slug}`} className="block">
                      <div className="relative min-h-[420px] bg-[#0a0a0a] sm:min-h-[320px] lg:min-h-0 lg:h-[390px] overflow-hidden">
                        <Image
                          src={item.image_url}
                          alt={item.title}
                          fill
                          className="object-cover object-[center_34%] sm:object-[center_42%] transition-transform duration-500 group-hover:scale-[1.03]"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-[#0f172a]/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-4 lg:p-4">
                          <p className="inline-flex bg-[#dc2626] text-white text-[10px] font-rajdhani font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-sm mb-2.5 sm:mb-3">
                            Lançamentos
                          </p>
                          <h3 className="text-[1.6rem] sm:text-[1.85rem] lg:text-[1.95rem] leading-[1.03] text-white font-serif font-semibold mb-1.5 sm:mb-2 line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="text-white/80 text-[14px] sm:text-[15px] lg:text-[15px] leading-[1.5] line-clamp-1 font-exo mb-1.5 sm:mb-2">
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
            <article className="group rounded-xl overflow-hidden border border-[#e5e7eb] bg-white h-full">
              <Link href={`/noticias/${middlePost.slug}`} className="block h-full">
                <div className="h-full flex flex-col">
                  <div className="relative h-2/3 overflow-hidden bg-[#0a0a0a]">
                    <Image
                      src={middlePost.image_url}
                      alt={middlePost.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="25vw"
                    />
                  </div>
                  <div className="h-1/3 p-3.5 border-t border-[#e5e7eb] flex flex-col justify-center">
                    <h3 className="text-[#111827] font-rajdhani font-bold text-[1.12rem] leading-[1.08] line-clamp-2 mb-1.5 group-hover:text-[#dc2626] transition-colors duration-300">
                      {middlePost.title}
                    </h3>
                    <p className="text-[#4b5563] text-[14px] leading-[1.45] font-exo line-clamp-2">
                      {middlePost.excerpt || 'Novos conteúdos e atualizações chegando em breve.'}
                    </p>
                  </div>
                </div>
              </Link>
            </article>
          ) : (
            <article className="rounded-xl overflow-hidden border border-[#e5e7eb] bg-white h-full">
              <Link href="/noticias" className="block h-full">
                <div className="h-full flex flex-col">
                  <div className="relative h-2/3 overflow-hidden bg-[#0a0a0a]">
                    <Image
                      src={heroPosts[0]?.image_url || placeholderImage}
                      alt="Notícias em breve"
                      fill
                      className="object-cover"
                      sizes="25vw"
                    />
                  </div>
                  <div className="h-1/3 p-3.5 border-t border-[#e5e7eb] flex flex-col justify-center">
                    <h3 className="text-[#111827] font-rajdhani font-bold text-[1.12rem] leading-[1.08] line-clamp-2 mb-1.5">
                      Novas notícias em breve
                    </h3>
                    <p className="text-[#4b5563] text-[14px] leading-[1.45] font-exo line-clamp-2">
                      Novos conteúdos e atualizações chegando em breve.
                    </p>
                  </div>
                </div>
              </Link>
            </article>
          )}
        </div>

        <div className="lg:col-span-3 lg:h-full">
          <div className="sm:hidden mb-2">
            <h3 className="text-[#111827] text-[1.7rem] font-serif font-semibold leading-none whitespace-nowrap">
              Notícias Recentes
            </h3>
            <p className="mt-1.5 text-[#374151] text-[14px] sm:text-[15px] lg:text-[15px] leading-[1.5] font-exo">
              Notícias recentes sobre supercarros, hypercarros e carros de alto desempenho.
            </p>
          </div>

          <div className="sm:hidden">
            <article className="group rounded-xl overflow-hidden border border-[#e5e7eb] bg-white">
              <Link href={mobileRecentPost?.slug ? `/noticias/${mobileRecentPost.slug}` : '/noticias'} className="block">
                <div className="relative h-[220px] overflow-hidden">
                  <Image
                    src={mobileRecentPost?.image_url || heroPosts[0]?.image_url || placeholderImage}
                    alt={mobileRecentPost?.title || 'Notícias recentes'}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    style={{ objectPosition: getSmartObjectPosition(mobileRecentPost?.title || '', 'highlight') }}
                    sizes="100vw"
                  />
                </div>

                <div className="p-3.5">
                  <h3 className="text-[#111827] font-rajdhani font-bold text-[1.25rem] leading-[1.06] line-clamp-2">
                    {mobileRecentPost?.title || 'Notícias em atualização'}
                  </h3>
                  <p className="mt-1.5 text-[14px] sm:text-[15px] lg:text-[15px] leading-[1.5] text-[#6b7280] font-exo line-clamp-2">
                    {mobileRecentPost?.excerpt || 'Novos conteúdos e atualizações chegando em breve.'}
                  </p>
                  <p className="mt-2 text-[11px] text-[#6b7280] font-exo inline-flex items-center gap-1">
                    <Clock size={10} /> {mobileRecentPost?.read_time || 'Em breve'}
                  </p>
                </div>
              </Link>
            </article>

            <div className="mt-3 space-y-3">
              {normalizedSidePosts.slice(1, 5).map((item) => (
                <Link
                  key={`${item.id}-mobile-recent-list`}
                  href={item.slug ? `/noticias/${item.slug}` : '/noticias'}
                  className="group flex gap-4 rounded-xl overflow-hidden border border-[#e5e7eb] bg-white p-4 min-h-[128px]"
                >
                  <div className="relative w-[156px] h-[114px] flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={item.image_url || heroPosts[0]?.image_url || placeholderImage}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="156px"
                    />
                  </div>

                  <div className="min-w-0 flex-1 flex flex-col justify-between py-0.5">
                    <h3 className="text-[#111827] font-rajdhani font-bold text-[1.08rem] leading-[1.06] line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-[14px] sm:text-[15px] lg:text-[15px] leading-[1.5] text-[#6b7280] font-exo line-clamp-2">
                      {item.excerpt || 'Veja mais detalhes desta notícia.'}
                    </p>
                    <p className="mt-2 text-[11px] text-[#6b7280] font-exo inline-flex items-center gap-1">
                      <Clock size={10} /> {item.read_time}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden lg:grid lg:grid-cols-1 lg:grid-rows-2 lg:gap-4 lg:h-full">
            {normalizedSidePosts.slice(0, 2).map((item, idx) => {
              const href = item.slug ? `/noticias/${item.slug}` : '/noticias';

              return (
                <article
                  key={`${item.id}-${idx}-desktop`}
                  className="group rounded-xl overflow-hidden border border-[#e5e7eb] bg-white h-full"
                >
                  <Link href={href} className="block h-full">
                    <div className="relative h-full overflow-hidden">
                      <Image
                        src={item.image_url || heroPosts[0]?.image_url || placeholderImage}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3.5">
                        <h3 className="text-white font-rajdhani font-bold text-[1.08rem] leading-[1.08] line-clamp-2">
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

          <div className="sm:hidden mt-4">
            <Link
              href="/noticias"
              className="flex w-full items-center justify-center rounded-xl border border-[#e5e7eb] bg-white px-4 py-3 text-[11px] font-rajdhani font-bold uppercase tracking-[0.18em] text-[#4b5563] hover:text-[#dc2626] hover:border-[#dc2626]/35 transition-colors duration-300"
            >
              Ver mais notícias <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      <section className="hidden md:block lg:hidden mb-8 rounded-xl border border-[#e5e7eb] bg-white px-5 py-5">
        <div className="flex items-end justify-between gap-3 mb-5">
          <div>
            <h3 className="text-[#111827] text-[2rem] font-serif font-semibold leading-[1.04]">
              Notícias Recentes
            </h3>
            <p className="mt-1 text-[#6b7280] text-[14px] sm:text-[15px] font-exo leading-[1.5]">
              Notícias recentes sobre supercarros, hypercarros e carros de alto desempenho.
            </p>
          </div>
          <Link
            href="/noticias"
            className="group inline-flex shrink-0 whitespace-nowrap items-center gap-2 rounded-lg bg-[#dc2626] px-5 py-2 text-[12px] text-white hover:bg-[#b91c1c] font-rajdhani font-bold uppercase tracking-[0.14em] transition-colors duration-300 shadow-[0_8px_20px_rgba(220,38,38,0.25)]"
          >
            Ver Mais <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {desktopNewsRowPosts.map((post, idx) => {
            const href = post.slug ? `/noticias/${post.slug}` : '/noticias';

            return (
              <article
                key={`${post.id}-tablet-row-${idx}`}
                className="group rounded-xl overflow-hidden border border-[#e5e7eb] bg-white"
              >
                <Link href={href} className="block">
                  <div className="relative h-[175px] overflow-hidden bg-[#0a0a0a]">
                    <Image
                      src={post.image_url || heroPosts[0]?.image_url || placeholderImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      style={{ objectPosition: getSmartObjectPosition(post.title, 'highlight') }}
                      sizes="50vw"
                    />
                  </div>

                  <div className="p-3.5 border-t border-[#e5e7eb]">
                    <p className="text-[#111827] text-[1.18rem] font-rajdhani font-bold leading-[1.05] line-clamp-2 uppercase group-hover:text-[#dc2626] transition-colors duration-300">
                      {post.title}
                    </p>
                    <p className="mt-1.5 text-[#4b5563] text-[14px] sm:text-[15px] font-exo leading-[1.5] line-clamp-2">
                      {post.excerpt || 'Novos conteúdos e atualizações chegando em breve.'}
                    </p>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="hidden lg:block mb-8 rounded-xl border border-[#e5e7eb] bg-white px-5 py-5">
        <div className="flex items-end justify-between gap-3 mb-5">
          <div>
            <h3 className="text-[#111827] text-[2.1rem] lg:text-[2.25rem] font-serif font-semibold leading-[1.04]">
              Notícias Recentes
            </h3>
            <p className="mt-1 text-[#6b7280] text-[14px] sm:text-[15px] lg:text-[15px] font-exo leading-[1.5]">
              Notícias recentes sobre supercarros, hypercarros e carros de alto desempenho.
            </p>
          </div>
          <Link
            href="/noticias"
            className="group inline-flex items-center gap-2 rounded-lg bg-[#dc2626] px-4 py-2 text-[12px] text-white hover:bg-[#b91c1c] font-rajdhani font-bold uppercase tracking-[0.14em] transition-colors duration-300 shadow-[0_8px_20px_rgba(220,38,38,0.25)]"
          >
            Ver Mais <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-5">
          {desktopNewsRowPosts.map((post, idx) => {
            const href = post.slug ? `/noticias/${post.slug}` : '/noticias';

            return (
              <Link
                key={`${post.id}-desktop-row-${idx}`}
                href={href}
                className="group flex rounded-lg overflow-hidden border border-[#e5e7eb] bg-white hover:border-[#dc2626]/45 transition-colors duration-300"
              >
                <div className="relative w-[42%] min-h-[170px] overflow-hidden bg-[#0a0a0a]">
                  <Image
                    src={post.image_url || heroPosts[0]?.image_url || placeholderImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    style={{ objectPosition: getSmartObjectPosition(post.title, 'highlight') }}
                    sizes="(max-width: 1280px) 40vw, 22vw"
                  />
                </div>

                <div className="w-[58%] p-4 flex flex-col justify-center border-l border-[#e5e7eb]">
                  <p className="text-[#111827] text-[1.28rem] font-rajdhani font-bold leading-[1.05] line-clamp-3 group-hover:text-[#dc2626] transition-colors duration-300">
                    {post.title}
                  </p>
                  <p className="text-[#4b5563] text-[14px] sm:text-[15px] lg:text-[15px] font-exo leading-[1.5] mt-2 line-clamp-2">
                    {post.excerpt || 'Novos conteúdos e atualizações chegando em breve.'}
                  </p>
                  <p className="mt-2.5 inline-flex items-center gap-1 text-[12px] lg:text-[13px] text-[#6b7280] font-exo">
                    <Clock size={10} /> {post.read_time || 'Em breve'}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-8 sm:mt-9 lg:mt-11">
        <div className="flex items-end justify-between gap-3 mb-3 sm:mb-4">
          <div>
            <p className="text-[#bc2a1f] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.26em] font-rajdhani mb-1">
              Categoria
            </p>
            <h3 className="text-[#111827] text-[1.7rem] font-serif font-semibold leading-none">
              Garagem dos Sonhos
            </h3>
            <p className="mt-1 text-[#374151] text-[14px] sm:text-[15px] lg:text-[15px] font-exo leading-[1.5] lg:leading-[1.5] max-w-[700px]">
              Conheça os carros mais incríveis do mundo, com detalhes de preço, motor, história e exclusividade.
            </p>
          </div>
          <Link
            href="/garagem-dos-sonhos"
            className="hidden sm:inline-flex shrink-0 whitespace-nowrap items-center justify-center gap-2 rounded-lg bg-[#dc2626] px-5 py-2 text-[12px] text-white hover:bg-[#b91c1c] font-rajdhani font-bold uppercase tracking-[0.14em] transition-colors duration-300 shadow-[0_8px_20px_rgba(220,38,38,0.25)] group"
          >
            Ver mais <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 mb-3 sm:mb-4">
          {featuredGarageCards.map((item, idx) => (
            <article key={`${item.post?.id || 'featured-garage'}-${idx}`} className="rounded-xl border border-[#e5e7eb] bg-white p-2.5 sm:p-3 lg:hidden">
              <Link href={item.href} className="group block rounded-lg overflow-hidden">
                <div className="relative h-[170px] sm:h-[185px] lg:h-[210px] overflow-hidden bg-[#0a0a0a]">
                  <Image
                    src={item.visuals.coverImage}
                    alt={item.post?.title || 'Garagem dos Sonhos'}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    style={{ objectPosition: getSmartObjectPosition(item.post?.title || '', 'featured') }}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3">
                    <p className="hidden lg:inline-flex bg-[#dc2626] text-white text-[9px] font-rajdhani font-bold uppercase tracking-[0.16em] px-2 py-0.5 rounded-sm mb-1.5">
                      Garagem dos Sonhos
                    </p>
                    <h4 className="text-white text-[1.05rem] sm:text-[1.15rem] font-rajdhani font-bold leading-[1.04] line-clamp-2 uppercase">
                      {item.post?.title || 'Garagem dos Sonhos em atualização'}
                    </h4>
                    <p className="hidden lg:block mt-1 text-white/75 text-[15px] leading-[1.5] font-exo line-clamp-2">
                      {item.post?.excerpt || 'Novas seleções e conteúdos especiais chegando em breve.'}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="mt-2.5 grid grid-cols-3 gap-2 lg:hidden">
                <Link href={item.href} className="group block rounded-md overflow-hidden">
                  <div className="relative h-[84px] sm:h-[90px] overflow-hidden bg-[#0f172a]">
                    <Image
                      src={item.visuals.interiorImage}
                      alt="Interiores"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                    <p className="absolute left-2 bottom-1.5 text-white text-[10px] font-rajdhani font-bold uppercase tracking-[0.08em]">
                      Interiores
                    </p>
                  </div>
                </Link>

                <Link href={item.href} className="group block rounded-md overflow-hidden">
                  <div className="relative h-[84px] sm:h-[90px] bg-[#141a24] overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(239,68,68,0.18)_0%,transparent_52%)]" />
                    <div className="absolute inset-0 opacity-55 [background-image:linear-gradient(rgba(148,163,184,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:16px_16px]" />
                    <svg viewBox="0 0 100 40" className="absolute left-2 right-2 top-3 h-8 text-[#ef4444]" fill="none" aria-hidden="true">
                      <path d="M2 30 L22 24 L37 27 L52 17 L69 20 L82 9 L98 11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="absolute left-2 bottom-1.5 text-white text-[10px] font-rajdhani font-bold uppercase tracking-[0.08em]">
                      Dados Técnicos
                    </p>
                  </div>
                </Link>

                <Link href={item.href} className="group block rounded-md overflow-hidden">
                  <div className="relative h-[84px] sm:h-[90px] overflow-hidden bg-[#0f172a]">
                    <Image
                      src={item.visuals.galleryImage}
                      alt="Galeria"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                    <p className="absolute left-2 bottom-1.5 text-white text-[10px] font-rajdhani font-bold uppercase tracking-[0.08em]">
                      Galeria
                    </p>
                  </div>
                </Link>
              </div>
            </article>
          ))}

          {featuredGarageDesktopCards.map((item, idx) => (
            <article key={`${item.post?.id || 'featured-garage-desktop'}-${idx}`} className="hidden lg:block lg:col-span-6 rounded-xl border border-[#e5e7eb] bg-white p-3">
              <Link href={item.href} className="group block rounded-lg overflow-hidden">
                <div className="relative h-[240px] xl:h-[255px] overflow-hidden bg-[#0a0a0a]">
                  <Image
                    src={item.visuals.coverImage}
                    alt={item.post?.title || 'Garagem dos Sonhos'}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    style={{ objectPosition: getSmartObjectPosition(item.post?.title || '', 'featured') }}
                    sizes="50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-3.5">
                    <p className="inline-flex bg-[#dc2626] text-white text-[9px] font-rajdhani font-bold uppercase tracking-[0.16em] px-2 py-0.5 rounded-sm mb-1.5">
                      Garagem dos Sonhos
                    </p>
                    <h4 className="text-white text-[1.2rem] xl:text-[1.28rem] font-rajdhani font-bold leading-[1.04] line-clamp-2 uppercase">
                      {item.post?.title || 'Garagem dos Sonhos em atualização'}
                    </h4>
                    <p className="mt-1 text-white/75 text-[15px] leading-[1.5] font-exo line-clamp-2">
                      {item.post?.excerpt || 'Novas seleções e conteúdos especiais chegando em breve.'}
                    </p>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="mb-4 rounded-xl border border-[#e5e7eb] bg-white p-3 sm:p-4">
          <div className="flex items-center justify-between gap-3 mb-3">
            <h4 className="text-[#111827] text-[1.02rem] sm:text-[1.14rem] font-rajdhani font-bold uppercase tracking-[0.1em]">
              Explore por Marcas
            </h4>
            <span className="hidden lg:inline text-[10px] sm:text-[11px] text-[#6b7280] font-exo uppercase tracking-[0.16em]">
              Navegue pelas lendas
            </span>
          </div>

          <div className="relative px-8 sm:px-10 lg:hidden">
            <Carousel opts={{ align: 'start', loop: false }} className="w-full">
              <CarouselContent className="-ml-2">
                {dreamGarageBrandLinks.map((brand) => (
                  <CarouselItem key={brand.label} className="basis-auto pl-2">
                    <Link
                      href={brand.href}
                      className="inline-flex whitespace-nowrap rounded-full border border-[#e5e7eb] bg-[#fafafa] px-4 py-2 text-[11px] sm:text-[12px] font-rajdhani font-bold uppercase tracking-[0.14em] text-[#111827] hover:border-[#dc2626]/35 hover:text-[#dc2626] hover:bg-white transition-colors duration-300"
                    >
                      {brand.label}
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-1 h-8 w-8 border-[#e5e7eb] bg-white hover:bg-white" />
              <CarouselNext className="-right-1 h-8 w-8 border-[#e5e7eb] bg-white hover:bg-white" />
            </Carousel>
          </div>

          <div className="hidden lg:flex lg:flex-wrap lg:items-center lg:justify-center lg:gap-3 lg:px-4 lg:pt-1">
            {dreamGarageBrandLinks.map((brand) => (
              <Link
                key={`${brand.label}-desktop-center`}
                href={brand.href}
                className="inline-flex whitespace-nowrap rounded-full border border-[#e5e7eb] bg-[#fafafa] px-4 py-2 text-[12px] font-rajdhani font-bold uppercase tracking-[0.14em] text-[#111827] hover:border-[#dc2626]/35 hover:text-[#dc2626] hover:bg-white transition-colors duration-300"
              >
                {brand.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex gap-2.5 overflow-x-auto pb-1 snap-x snap-mandatory sm:hidden">
          {normalizedDreamGaragePosts.slice(1, 7).map((post, idx) => {
            const href = post.slug ? `/noticias/${post.slug}` : '/garagem-dos-sonhos';

            return (
              <Link
                key={`${post.id}-${idx}`}
                href={href}
                className="group rounded-xl overflow-hidden border border-[#dfe4ea] bg-white shrink-0 snap-start w-[44%]"
              >
                <div className="relative h-[138px] sm:h-[148px] lg:h-[160px] overflow-hidden bg-[#0a0a0a]">
                  <Image
                    src={post.image_url || heroPosts[0]?.image_url || placeholderImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    style={{ objectPosition: getSmartObjectPosition(post.title, 'default') }}
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </div>
                <div className="p-2.5 sm:p-3">
                  <p className="text-[#111827] text-[1.03rem] sm:text-[1.2rem] font-rajdhani font-bold leading-[1.04] line-clamp-2 mb-1.5 uppercase">
                    {post.title}
                  </p>
                  <p className="text-[#1f2937] text-[14px] sm:text-[15px] lg:text-[15px] leading-[1.5] font-exo line-clamp-3">
                    {post.excerpt || 'Conteúdo especial em breve.'}
                  </p>
                </div>
              </Link>
            );
          })}

          <Link
            href="/garagem-dos-sonhos"
            className="group rounded-xl border border-dashed border-[#d1d5db] bg-[#fafafa] shrink-0 snap-start w-[44%] p-3 sm:p-3.5 flex flex-col justify-center min-h-[138px] sm:min-h-[148px] lg:min-h-[160px] hover:border-[#dc2626]/35 hover:bg-white transition-colors duration-300"
          >
            <p className="text-[#dc2626] text-[10px] font-rajdhani font-bold uppercase tracking-[0.18em] mb-1.5">
              Continue
            </p>
            <p className="text-[#111827] text-[1.02rem] sm:text-[1.15rem] font-rajdhani font-bold uppercase leading-[1.06]">
              Ver mais
            </p>
            <span className="mt-2 inline-flex items-center gap-1 text-[#6b7280] group-hover:text-[#dc2626] text-[12px] font-rajdhani font-bold uppercase tracking-[0.12em] transition-colors duration-300">
              Abrir <ArrowRight size={13} />
            </span>
          </Link>

        </div>

        <div className="hidden sm:grid sm:grid-cols-4 sm:gap-3">
          {normalizedDreamGaragePosts.slice(2, 6).map((post, idx) => {
            const href = post.slug ? `/noticias/${post.slug}` : '/garagem-dos-sonhos';

            return (
              <Link
                key={`${post.id}-${idx}-desktop-grid`}
                href={href}
                className="group rounded-xl overflow-hidden border border-[#dfe4ea] bg-white"
              >
                <div className="relative h-[148px] lg:h-[160px] overflow-hidden bg-[#0a0a0a]">
                  <Image
                    src={post.image_url || heroPosts[0]?.image_url || placeholderImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    style={{ objectPosition: getSmartObjectPosition(post.title, 'default') }}
                    sizes="25vw"
                  />
                </div>
                <div className="p-3">
                  <p className="text-[#111827] text-[1.2rem] font-rajdhani font-bold leading-[1.04] line-clamp-2 mb-1.5 uppercase">
                    {post.title}
                  </p>
                  <p className="text-[#1f2937] text-[14px] sm:text-[15px] lg:text-[15px] leading-[1.5] font-exo line-clamp-3">
                    {post.excerpt || 'Conteúdo especial em breve.'}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-4 sm:mt-5 rounded-xl border border-[#e5e7eb] bg-[#fafafa] p-3 sm:p-4">
          <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
            <h4 className="text-[#111827] text-[1.05rem] sm:text-[1.2rem] font-rajdhani font-bold uppercase tracking-[0.1em]">
              Explore por Categoria
            </h4>
            <span className="text-[10px] sm:text-[11px] text-[#6b7280] font-exo uppercase tracking-[0.16em]">
              Mais conteúdo para você
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
            {dreamGarageCategoryHighlights.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-xl border border-[#e5e7eb] bg-white p-3 sm:p-3.5 hover:border-[#dc2626]/35 transition-colors duration-300"
              >
                <span className="inline-flex rounded-md bg-[#dc2626]/10 px-2 py-0.5 text-[10px] font-rajdhani font-bold uppercase tracking-[0.14em] text-[#dc2626] mb-2">
                  {item.badge}
                </span>
                <h5 className="text-[#111827] text-[1.02rem] sm:text-[1.08rem] font-rajdhani font-bold uppercase leading-[1.06] group-hover:text-[#dc2626] transition-colors duration-300">
                  {item.title}
                </h5>
                <p className="mt-1.5 text-[#4b5563] text-[14px] sm:text-[15px] lg:text-[15px] leading-[1.5] font-exo line-clamp-3">
                  {item.description}
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-rajdhani font-bold uppercase tracking-[0.12em] text-[#6b7280] group-hover:text-[#dc2626] transition-colors duration-300">
                  Explorar <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-4 sm:mt-5">
          <Link
            href="/garagem-dos-sonhos"
            className="flex w-full items-center justify-center rounded-xl border border-[#e5e7eb] bg-white px-4 py-3 text-[11px] font-rajdhani font-bold uppercase tracking-[0.18em] text-[#4b5563] hover:text-[#dc2626] hover:border-[#dc2626]/35 transition-colors duration-300"
          >
            Ver mais carros <ArrowRight size={13} className="ml-1" />
          </Link>
        </div>
      </section>

      <section className="mt-8 sm:mt-9 lg:mt-11 rounded-2xl border border-[#e5e7eb] bg-white p-3 sm:p-5">
        <div className="flex items-end justify-between gap-3 mb-3 sm:mb-4">
          <div>
            <p className="text-[#dc2626] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.26em] font-rajdhani mb-1">
              Especial
            </p>
            <h3 className="text-[#111827] text-[1.7rem] sm:text-[1.85rem] font-rajdhani font-bold uppercase tracking-[0.05em] leading-none">
              Ranking
            </h3>
            <p className="mt-1 text-[#374151] text-[14px] sm:text-[15px] lg:text-[15px] font-exo leading-[1.5] lg:leading-[1.5] max-w-[700px]">
              Rankings atualizados com comparativos de desempenho, velocidade, preço e exclusividade dos modelos mais extremos.
            </p>
          </div>
          <Link
            href="/ranking"
            className="hidden sm:inline-flex shrink-0 whitespace-nowrap items-center justify-center gap-2 rounded-lg bg-[#dc2626] px-5 py-2 text-[12px] text-white hover:bg-[#b91c1c] font-rajdhani font-bold uppercase tracking-[0.14em] transition-colors duration-300 shadow-[0_8px_20px_rgba(220,38,38,0.25)] group"
          >
            Ver mais <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4">
          <article className="sm:col-span-7 group rounded-xl overflow-hidden border border-[#e5e7eb] bg-white">
            <Link href={normalizedRankingPosts[0]?.slug ? `/noticias/${normalizedRankingPosts[0].slug}` : '/ranking'} className="block h-full">
              <div className="relative h-[220px] sm:h-full sm:min-h-[336px] overflow-hidden">
                <Image
                  src={normalizedRankingPosts[0]?.image_url || heroPosts[0]?.image_url || placeholderImage}
                  alt={normalizedRankingPosts[0]?.title || 'Ranking'}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  style={{ objectPosition: getSmartObjectPosition(normalizedRankingPosts[0]?.title || '', 'featured') }}
                  sizes="(max-width: 640px) 100vw, 58vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
                <span className="absolute top-2.5 left-2.5 inline-flex items-center rounded-md border border-white/40 bg-[#dc2626]/90 px-2 py-0.5 text-[10px] font-rajdhani font-bold uppercase tracking-[0.16em] text-white">
                  #01
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <h3 className="text-white text-[1.22rem] sm:text-[1.48rem] font-rajdhani font-bold leading-[1.02] line-clamp-2 uppercase mb-1.5">
                    {normalizedRankingPosts[0]?.title || 'Ranking em atualização'}
                  </h3>
                  <p className="text-white/80 text-[14px] sm:text-[15px] lg:text-[15px] leading-[1.5] font-exo line-clamp-2 mb-2">
                    {normalizedRankingPosts[0]?.excerpt || 'Novos comparativos e listas especiais chegando em breve.'}
                  </p>
                  <p className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] lg:text-[13px] text-white/75 font-exo">
                    <Clock size={10} /> {normalizedRankingPosts[0]?.read_time || 'Em breve'}
                  </p>
                </div>
              </div>
            </Link>
          </article>

          <div className="sm:col-span-5 grid grid-cols-1 gap-2.5">
            {normalizedRankingPosts.slice(1, 5).map((post, idx) => {
              const href = post.slug ? `/noticias/${post.slug}` : '/ranking';
              const rank = String(idx + 2).padStart(2, '0');

              return (
                <Link
                  key={`${post.id}-ranking-editorial-${idx}`}
                  href={href}
                  className="group flex items-center gap-2.5 rounded-xl border border-[#e5e7eb] bg-[#fafafa] p-2.5 hover:border-[#dc2626]/35 hover:bg-white transition-colors duration-300"
                >
                  <span className="inline-flex w-9 h-9 items-center justify-center rounded-lg border border-[#dc2626]/35 bg-[#dc2626]/8 text-[#dc2626] text-[11px] font-rajdhani font-bold tracking-[0.08em]">
                    #{rank}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[#111827] text-[1rem] sm:text-[1.05rem] font-rajdhani font-bold leading-[1.04] line-clamp-2 uppercase group-hover:text-[#dc2626] transition-colors duration-300">
                      {post.title}
                    </p>
                    <p className="text-[#6b7280] text-[14px] sm:text-[15px] lg:text-[15px] font-exo mt-1 line-clamp-1">
                      {post.excerpt || 'Novo ranking em breve.'}
                    </p>
                  </div>
                  <ArrowRight size={14} className="text-[#9ca3af] group-hover:text-[#dc2626] transition-colors duration-300" />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-[#e5e7eb]">
          <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
            <h4 className="text-[#111827] text-[1.08rem] sm:text-[1.22rem] font-rajdhani font-bold uppercase tracking-[0.08em]">
              Mais Rankings Para Explorar
            </h4>
            <span className="text-[10px] sm:text-[11px] text-[#6b7280] font-exo uppercase tracking-[0.16em]">
              Top listas da semana
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:hidden">
            {normalizedRankingPosts.slice(5, 7).map((post, idx) => {
              const href = post.slug ? `/noticias/${post.slug}` : '/ranking';
              const rank = String(idx + 6).padStart(2, '0');

              return (
                <article
                  key={`${post.id}-ranking-extended-mobile-${idx}`}
                  className="group rounded-xl overflow-hidden border border-[#e5e7eb] bg-white"
                >
                  <Link href={href} className="block">
                    <div className="relative h-[155px] sm:h-[165px] overflow-hidden">
                      <Image
                        src={post.image_url || heroPosts[0]?.image_url || placeholderImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        style={{ objectPosition: getSmartObjectPosition(post.title, 'default') }}
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                      <span className="absolute left-2.5 top-2.5 inline-flex items-center rounded-md bg-white/95 px-2 py-1 text-[10px] font-rajdhani font-bold uppercase tracking-[0.14em] text-[#111827]">
                        #{rank}
                      </span>
                    </div>
                    <div className="p-3">
                      <h5 className="text-[#111827] text-[1.05rem] sm:text-[1.15rem] font-rajdhani font-bold leading-[1.05] line-clamp-2 uppercase group-hover:text-[#dc2626] transition-colors duration-300">
                        {post.title}
                      </h5>
                      <p className="text-[#4b5563] text-[14px] sm:text-[15px] lg:text-[15px] leading-[1.5] font-exo mt-1.5 line-clamp-2">
                        {post.excerpt || 'Conteúdo de ranking em atualização.'}
                      </p>
                      <p className="mt-2 text-[#6b7280] text-[11px] lg:text-[13px] font-exo inline-flex items-center gap-1">
                        <Clock size={10} /> {post.read_time || 'Em breve'}
                      </p>
                    </div>
                  </Link>
                </article>
              );
            })}

            <Link
              href="/ranking"
              className="group rounded-xl border border-dashed border-[#d1d5db] bg-[#fafafa] p-4 sm:p-5 flex flex-col justify-center min-h-[140px] sm:min-h-[165px] hover:border-[#dc2626]/40 hover:bg-white transition-colors duration-300 md:hidden"
            >
              <p className="text-[#dc2626] text-[10px] sm:text-[11px] font-rajdhani font-bold uppercase tracking-[0.2em] mb-1.5">
                Continue navegando
              </p>
              <h5 className="text-[#111827] text-[1.12rem] sm:text-[1.22rem] font-rajdhani font-bold uppercase leading-[1.05]">
                Ver o Ranking Completo
              </h5>
              <p className="text-[#6b7280] text-[14px] sm:text-[15px] lg:text-[15px] font-exo mt-2 leading-[1.5]">
                Explore mais comparativos e listas exclusivas para descobrir os supercarros mais extremos.
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-[#111827] group-hover:text-[#dc2626] text-[12px] font-rajdhani font-bold uppercase tracking-[0.12em] transition-colors duration-300">
                Abrir ranking <ArrowRight size={13} />
              </span>
            </Link>
          </div>

          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-4">
            {(() => {
              const mainPost = normalizedRankingPosts[5];
              const sidePosts = normalizedRankingPosts.slice(6, 8);
              const mainHref = mainPost?.slug ? `/noticias/${mainPost.slug}` : '/ranking';

              return (
                <>
                  <article className="group lg:col-span-6 rounded-xl overflow-hidden border border-[#e5e7eb] bg-white">
                    <Link href={mainHref} className="block h-full">
                      <div className="relative h-[310px] overflow-hidden">
                        <Image
                          src={mainPost?.image_url || heroPosts[0]?.image_url || placeholderImage}
                          alt={mainPost?.title || 'Ranking em atualização'}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          style={{ objectPosition: getSmartObjectPosition(mainPost?.title || '', 'featured') }}
                          sizes="(max-width: 1280px) 50vw, 42vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-4">
                          <h5 className="text-white text-[2rem] leading-[1.02] font-rajdhani font-bold uppercase line-clamp-2 mb-2">
                            {mainPost?.title || 'Ranking em atualização'}
                          </h5>
                          <p className="text-white/85 text-[15px] leading-[1.5] font-exo line-clamp-2">
                            {mainPost?.excerpt || 'Novos comparativos e listas especiais chegando em breve.'}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </article>

                  {sidePosts.map((post, idx) => {
                    const href = post.slug ? `/noticias/${post.slug}` : '/ranking';

                    return (
                      <article key={`${post.id}-ranking-desktop-side-${idx}`} className="group lg:col-span-3 rounded-xl overflow-hidden border border-[#e5e7eb] bg-white">
                        <Link href={href} className="block h-full">
                          <div className="relative h-[200px] overflow-hidden">
                            <Image
                              src={post.image_url || heroPosts[0]?.image_url || placeholderImage}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                              style={{ objectPosition: getSmartObjectPosition(post.title, 'default') }}
                              sizes="25vw"
                            />
                          </div>
                          <div className="p-3.5 border-t border-[#e5e7eb]">
                            <h5 className="text-[#111827] text-[1.25rem] leading-[1.05] font-rajdhani font-bold uppercase line-clamp-2 group-hover:text-[#dc2626] transition-colors duration-300">
                              {post.title}
                            </h5>
                            <p className="mt-1.5 text-[#4b5563] text-[15px] leading-[1.5] font-exo line-clamp-2">
                              {post.excerpt || 'Conteúdo de ranking em atualização.'}
                            </p>
                          </div>
                        </Link>
                      </article>
                    );
                  })}
                </>
              );
            })()}
          </div>
        </div>
      </section>
    </section>
  );
}