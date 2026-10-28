import type { MetadataRoute } from 'next';
import { getPosts } from '@/lib/posts';
import { brands } from '@/lib/data';

const siteUrl = 'https://www.gmatoscar.com.br';
const publicBrandIds = new Set([
  'ferrari',
  'lamborghini',
  'porsche',
  'bugatti',
  'pagani',
  'mclaren',
  'koenigsegg',
]);

const staticPaths = [
  '/',
  '/noticias',
  '/marcas',
  '/ranking',
  '/garagem-dos-sonhos',
  '/marcas/ferrari',
  '/sobre',
  '/contato',
  '/politica-de-privacidade',
  '/politica-de-cookies',
  '/termos-de-uso',
  '/isencao-de-responsabilidade',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts({ includePrivateModelPosts: true });

  const staticEntries: MetadataRoute.Sitemap = [
    ...staticPaths.map((path) => ({
      url: `${siteUrl}${path}`,
    })),
    ...brands
      .filter((brand) => publicBrandIds.has(brand.id) && brand.id !== 'ferrari')
      .map((brand) => ({
        url: `${siteUrl}/marcas/${brand.id}`,
      })),
  ];

  const articleEntries: MetadataRoute.Sitemap = posts.map((post) => {
    const publishedAt = new Date(post.date);

    return {
      url: `${siteUrl}/noticias/${post.slug}`,
      ...(Number.isNaN(publishedAt.getTime()) ? {} : { lastModified: publishedAt }),
    };
  });

  return [...staticEntries, ...articleEntries];
}
