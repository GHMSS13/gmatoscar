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
  const heroEligiblePosts = sourcePosts.filter(
    (post) => isNewsPost(post) || isRankingPost(post) || isDreamGaragePost(post)
  );
  const heroPosts = heroEligiblePosts.slice(0, 3);
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
      description: 'Estamos preparando um novo comparativo para atualizar esta seção.',
      imageUrl: heroPosts[0]?.image_url,
      href: '/ranking',
    },
    {
      title: 'Ranking',
      value: 'Mais dados e listas chegando',
      description: 'Em breve, novas listas com desempenho, preço e exclusividade.',
      imageUrl: heroPosts[1]?.image_url || heroPosts[0]?.image_url,
      href: '/ranking',
    },
  ];

  const dreamGarageFallbackCards = [
    {
      title: 'Garagem dos Sonhos',
      value: 'Seleção especial em produção',
      description: 'Novas sugestões de garagem serão publicadas em breve.',
      imageUrl: heroPosts[2]?.image_url || heroPosts[0]?.image_url,
      href: '/garagem-dos-sonhos',
    },
    {
      title: 'Garagem dos Sonhos',
      value: 'Modelos icônicos em breve',
      description: 'Estamos preparando uma nova curadoria para esta seção.',
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

  return (
    <>
      <HomeTopNewsSection
        heroPosts={heroPosts.length > 0 ? heroPosts : sourcePosts.slice(0, 1)}
        middlePost={middlePost}
        sidePosts={sidePosts}
        infoCards={infoCards}
        dreamGaragePosts={dreamGaragePosts}
        rankingPosts={rankingPosts}
      />
    </>
  );
}
