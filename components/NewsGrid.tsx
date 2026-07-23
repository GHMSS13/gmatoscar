import HomeTopNewsSection from './HomeTopNewsSection';
import NewsCard from './NewsCard';
import { getPostSection, type Post } from '@/lib/posts';

interface NewsGridProps {
  posts: Post[];
  theme?: 'dark' | 'light';
}

export default function NewsGrid({ posts, theme = 'dark' }: NewsGridProps) {
  const isNewsPost = (post: Post) => getPostSection(post) === 'Noticias';
  const isRankingPost = (post: Post) => getPostSection(post) === 'Rankings';
  const isDreamGaragePost = (post: Post) => getPostSection(post) === 'Garagem dos Sonhos';

  const sourcePosts = posts.length > 0 ? posts : [];
  const heroPosts = sourcePosts.slice(0, 8);
  const heroIds = new Set(heroPosts.map((post) => post.id));

  const newsOnlyPosts = sourcePosts.filter((post) => isNewsPost(post) && !heroIds.has(post.id));
  const middlePost = newsOnlyPosts[0];
  const sidePosts = newsOnlyPosts.slice(1, 3);

  const rankingPosts = sourcePosts.filter((post) => isRankingPost(post));
  const dreamGaragePosts = sourcePosts.filter((post) => isDreamGaragePost(post));

  const rankingFallbackCards = [
    {
      title: 'Ranking',
      value: 'Novo ranking em breve',
      description: 'Estamos preparando um novo comparativo para atualizar esta secao.',
      imageUrl: heroPosts[0]?.image_url,
      href: '/ranking',
    },
    {
      title: 'Ranking',
      value: 'Mais dados e listas chegando',
      description: 'Em breve, novas listas com desempenho, preco e exclusividade.',
      imageUrl: heroPosts[1]?.image_url || heroPosts[0]?.image_url,
      href: '/ranking',
    },
  ];

  const dreamGarageFallbackCards = [
    {
      title: 'Garagem dos Sonhos',
      value: 'Selecao especial em producao',
      description: 'Novas sugestoes de garagem serao publicadas em breve.',
      imageUrl: heroPosts[2]?.image_url || heroPosts[0]?.image_url,
      href: '/garagem-dos-sonhos',
    },
    {
      title: 'Garagem dos Sonhos',
      value: 'Modelos iconicos em breve',
      description: 'Estamos preparando uma nova curadoria para esta secao.',
      imageUrl: heroPosts[3]?.image_url || heroPosts[0]?.image_url,
      href: '/garagem-dos-sonhos',
    },
  ];

  const rankingInfoCards = rankingPosts.slice(0, 2).map((post) => ({
    title: 'Ranking',
    value: post.title,
    description: post.excerpt,
    imageUrl: post.image_url,
    href: `/noticias/${post.slug}`,
  }));

  const dreamGarageInfoCards = dreamGaragePosts.slice(0, 2).map((post) => ({
    title: 'Garagem dos Sonhos',
    value: post.title,
    description: post.excerpt,
    imageUrl: post.image_url,
    href: `/noticias/${post.slug}`,
  }));

  while (rankingInfoCards.length < 2) {
    rankingInfoCards.push(rankingFallbackCards[rankingInfoCards.length]);
  }

  while (dreamGarageInfoCards.length < 2) {
    dreamGarageInfoCards.push(dreamGarageFallbackCards[dreamGarageInfoCards.length]);
  }

  const infoCards = [...rankingInfoCards, ...dreamGarageInfoCards];

  const morePosts = sourcePosts.slice(8, 14);

  return (
    <>
      <HomeTopNewsSection
        heroPosts={heroPosts.length > 0 ? heroPosts : sourcePosts.slice(0, 1)}
        middlePost={middlePost}
        sidePosts={sidePosts}
        infoCards={infoCards}
        dreamGaragePosts={dreamGaragePosts}
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
