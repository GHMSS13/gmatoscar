import HomeTopNewsSection from './HomeTopNewsSection';
import NewsCard from './NewsCard';
import type { Post } from '@/lib/posts';

interface NewsGridProps {
  posts: Post[];
  theme?: 'dark' | 'light';
}

export default function NewsGrid({ posts, theme = 'dark' }: NewsGridProps) {
  const normalized = (value: string) =>
    value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const isRankingOrDreamGarage = (post: Post) => {
    const text = normalized([post.title, post.excerpt, post.category, post.slug].join(' '));
    return text.includes('ranking') || (text.includes('garagem') && text.includes('sonho'));
  };

  const sourcePosts = posts.length > 0 ? posts : [];
  const fromRankingAndGarage = sourcePosts.filter((post) => isRankingOrDreamGarage(post));
  const heroPosts = [...fromRankingAndGarage, ...sourcePosts].filter(
    (post, index, list) => list.findIndex((item) => item.id === post.id) === index
  ).slice(0, 8);

  const newsOnlyPosts = sourcePosts.filter((post) => !isRankingOrDreamGarage(post));
  const recentNewsPool = newsOnlyPosts.length > 0 ? newsOnlyPosts : sourcePosts;
  const sidePosts = [
    ...recentNewsPool.slice(1, 3),
    ...recentNewsPool.slice(0, 2),
  ].filter((post, index, list) => list.findIndex((item) => item.id === post.id) === index).slice(0, 2);
  const middlePost = sourcePosts.find(
    (post) =>
      !heroPosts.some((heroItem) => heroItem.id === post.id) &&
      !sidePosts.some((sideItem) => sideItem.id === post.id)
  ) ?? sourcePosts[3] ?? sourcePosts[0];

  const uniqueCategories = new Set(sourcePosts.map((post) => post.category));
  const infoHighlights = sourcePosts.slice(0, 3);

  const infoCards = [
    {
      title: 'Radar GMATOSCAR',
      value: `${sourcePosts.length} publicacoes`,
      description: `Conteudos ativos em ${uniqueCategories.size} categorias diferentes.`,
      imageUrl: sourcePosts[0]?.image_url,
      href: '/pesquisa',
    },
    ...infoHighlights.map((post) => ({
      title: post.category,
      value: post.title,
      description: post.excerpt,
      imageUrl: post.image_url,
      href: `/noticias/${post.slug}`,
    })),
  ];

  const morePosts = sourcePosts.slice(8, 14);

  return (
    <>
      <HomeTopNewsSection
        heroPosts={heroPosts.length > 0 ? heroPosts : sourcePosts.slice(0, 1)}
        middlePost={middlePost}
        sidePosts={sidePosts}
        infoCards={infoCards}
      />

      {morePosts.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-10 sm:pb-14 pt-2 sm:pt-3">
          <div className="flex items-center gap-3 mb-4 sm:mb-5">
            <span className="w-1 h-5 bg-[#dc2626] rounded-full" />
            <h3 className="font-rajdhani font-bold uppercase tracking-[0.2em] text-xs sm:text-sm text-[#111827]">
              Mais Conteudos
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {morePosts.map((item) => (
              <NewsCard key={item.id} item={item} theme={theme} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
