import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsCard from '@/components/NewsCard';
import { brands } from '@/lib/data';
import { getPosts, isFerrari250GtoPost, type Post } from '@/lib/posts';

interface Props {
  params: { id: string };
}

const targetBrandIds = ['ferrari', 'lamborghini', 'porsche', 'bugatti', 'pagani', 'mclaren', 'koenigsegg'];
const seoBrands = brands.filter((brand) => targetBrandIds.includes(brand.id));
const ferrariF80Title = 'Ferrari F80: preço, motor, potência e tudo sobre o novo hipercarro de 1.200 cv';
const ferrariSf90Title = 'Ferrari SF90 Stradale: preço, motor híbrido, potência e ficha técnica completa';

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function getRelatedPosts(posts: Post[], brandName: string) {
  const q = normalizeText(brandName);

  return posts
    .filter((post) => {
      const text = normalizeText([post.title, post.excerpt, post.content, post.category, post.slug].join(' '));
      return text.includes(q);
    })
    .slice(0, 6);
}

function getFerrariF80Post(posts: Post[]) {
  const targetTitle = normalizeText(ferrariF80Title);

  return (
    posts.find((post) => normalizeText(post.title) === targetTitle || normalizeText(post.slug).includes('ferrari-f80')) ??
    null
  );
}

function getFerrariSf90Post(posts: Post[]) {
  const targetTitle = normalizeText(ferrariSf90Title);

  return (
    posts.find(
      (post) =>
        normalizeText(post.title) === targetTitle ||
        normalizeText(post.slug).includes('ferrari-sf90-stradale')
    ) ?? null
  );
}

export function generateStaticParams() {
  return seoBrands.map((brand) => ({ id: brand.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const brand = seoBrands.find((item) => item.id === params.id);
  if (!brand) return { title: 'Marca não encontrada' };

  return {
    title: `${brand.name} - Página Editorial`,
    description: `Página SEO da ${brand.name} com história, modelos famosos e notícias relacionadas.`,
    keywords: [
      `${brand.name}`,
      `${brand.name} supercarro`,
      `${brand.name} história`,
      `${brand.name} modelos`,
      ...brand.famousModels.map((item) => `${brand.name} ${item.name}`),
    ],
    alternates: {
      canonical: `/marcas/${brand.id}`,
    },
  };
}

export default async function BrandPage({ params }: Props) {
  const brand = seoBrands.find((item) => item.id === params.id);
  if (!brand) notFound();

  const posts = await getPosts();
  const allPosts = await getPosts({ includePrivateModelPosts: true });
  const ferrari250GtoPost = allPosts.find((post) => isFerrari250GtoPost(post)) ?? null;
  const ferrariF80Post = getFerrariF80Post(allPosts);
  const ferrariSf90Post = getFerrariSf90Post(allPosts);
  const relatedPosts = getRelatedPosts(posts, brand.name);

  const brandSchema = {
    '@context': 'https://schema.org',
    '@type': 'Brand',
    name: brand.name,
    description: brand.description,
    foundingDate: String(brand.founded),
    url: `https://gmatoscar.com.br/marcas/${brand.id}`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://gmatoscar.com.br/' },
      { '@type': 'ListItem', position: 2, name: 'Marcas', item: 'https://gmatoscar.com.br/marcas' },
      { '@type': 'ListItem', position: 3, name: brand.name, item: `https://gmatoscar.com.br/marcas/${brand.id}` },
    ],
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brandSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar />

      <section className="pt-28 pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Link href="/marcas" className="text-[#6b7280] hover:text-[#111827] text-sm font-exo transition-colors">
          Voltar para Marcas
        </Link>

        <div className="mt-6 rounded-3xl border border-[#e5e7eb] bg-white p-6 sm:p-8">
          <p className="text-[#dc2626] text-xs font-bold uppercase tracking-[0.35em] font-rajdhani mb-3">Fase 2</p>
          <h1 className="text-4xl md:text-6xl font-serif font-semibold text-[#111827] mb-4">{brand.name}</h1>
          <p className="text-[#4b5563] font-exo leading-relaxed max-w-3xl mb-8">{brand.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-4">
              <p className="text-[#9ca3af] text-xs uppercase tracking-[0.3em] font-rajdhani mb-2">Fundação</p>
              <p className="text-[#111827] font-rajdhani text-2xl font-bold">{brand.founded}</p>
            </div>
            <div className="rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-4">
              <p className="text-[#9ca3af] text-xs uppercase tracking-[0.3em] font-rajdhani mb-2">País</p>
              <p className="text-[#111827] font-rajdhani text-2xl font-bold">{brand.country}</p>
            </div>
            <div className="rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-4">
              <p className="text-[#9ca3af] text-xs uppercase tracking-[0.3em] font-rajdhani mb-2">Modelo Top</p>
              <p className="text-[#111827] font-rajdhani text-2xl font-bold">{brand.topModel}</p>
            </div>
            <div className="rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-4">
              <p className="text-[#9ca3af] text-xs uppercase tracking-[0.3em] font-rajdhani mb-2">Velocidade</p>
              <p className="text-[#dc2626] font-rajdhani text-2xl font-bold">{brand.maxSpeed}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-12">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6">
            <h2 className="text-[#111827] font-rajdhani font-bold text-2xl mb-4">Linha do tempo</h2>
            <div className="space-y-4">
              {brand.timeline.map((item) => (
                <div key={`${item.year}-${item.title}`} className="border-l-2 border-[#dc2626]/30 pl-4">
                  <p className="text-[#dc2626] text-xs uppercase tracking-[0.3em] font-rajdhani font-bold">{item.year}</p>
                  <h3 className="text-[#111827] font-rajdhani font-bold text-lg">{item.title}</h3>
                  <p className="text-[#6b7280] text-sm font-exo leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6">
            <h2 className="text-[#111827] font-rajdhani font-bold text-2xl mb-4">Modelos famosos</h2>
            <div className="grid gap-4">
              {brand.famousModels.map((item) => (
                brand.id === 'ferrari' && item.slug === 'ferrari-250-gto' && ferrari250GtoPost ? (
                  <Link
                    key={item.slug}
                    href={`/noticias/${ferrari250GtoPost.slug}`}
                    className="group rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-4 transition-colors hover:border-[#dc2626]/40 hover:bg-white"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-[#111827] font-rajdhani font-bold text-xl group-hover:text-[#dc2626] transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-[#dc2626] text-xs uppercase tracking-[0.3em] font-rajdhani font-bold">{item.year}</span>
                    </div>
                    <p className="text-[#6b7280] text-sm font-exo mt-2 mb-2">{item.highlight}</p>
                    <p className="text-[#dc2626] text-xs uppercase tracking-[0.3em] font-rajdhani font-bold">Ler artigo</p>
                  </Link>
                ) : brand.id === 'ferrari' && item.slug === 'ferrari-f80-preco-motor-potencia-hipercarro-1200cv' && ferrariF80Post ? (
                  <Link
                    key={item.slug}
                    href={`/noticias/${ferrariF80Post.slug}`}
                    className="group rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-4 transition-colors hover:border-[#dc2626]/40 hover:bg-white"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-[#111827] font-rajdhani font-bold text-xl group-hover:text-[#dc2626] transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-[#dc2626] text-xs uppercase tracking-[0.3em] font-rajdhani font-bold">{item.year}</span>
                    </div>
                    <p className="text-[#6b7280] text-sm font-exo mt-2 mb-2">{item.highlight}</p>
                    <p className="text-[#dc2626] text-xs uppercase tracking-[0.3em] font-rajdhani font-bold">Ler artigo</p>
                  </Link>
                ) : brand.id === 'ferrari' && item.slug === 'ferrari-458-italia' ? (
                  <Link
                    key={item.slug}
                    href={`/noticias/${item.slug}`}
                    className="group rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-4 transition-colors hover:border-[#dc2626]/40 hover:bg-white"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-[#111827] font-rajdhani font-bold text-xl group-hover:text-[#dc2626] transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-[#dc2626] text-xs uppercase tracking-[0.3em] font-rajdhani font-bold">{item.year}</span>
                    </div>
                    <p className="text-[#6b7280] text-sm font-exo mt-2 mb-2">{item.highlight}</p>
                    <p className="text-[#dc2626] text-xs uppercase tracking-[0.3em] font-rajdhani font-bold">Ler artigo</p>
                  </Link>
                ) : brand.id === 'ferrari' && item.slug === 'ferrari-sf90-stradale' && ferrariSf90Post ? (
                  <Link
                    key={item.slug}
                    href={`/noticias/${ferrariSf90Post.slug}`}
                    className="group rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-4 transition-colors hover:border-[#dc2626]/40 hover:bg-white"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-[#111827] font-rajdhani font-bold text-xl group-hover:text-[#dc2626] transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-[#dc2626] text-xs uppercase tracking-[0.3em] font-rajdhani font-bold">{item.year}</span>
                    </div>
                    <p className="text-[#6b7280] text-sm font-exo mt-2 mb-2">{item.highlight}</p>
                    <p className="text-[#dc2626] text-xs uppercase tracking-[0.3em] font-rajdhani font-bold">Ler artigo</p>
                  </Link>
                ) : (
                  <div
                    key={item.slug}
                    className="rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-4 transition-colors hover:border-[#dc2626]/40 hover:bg-white"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-[#111827] font-rajdhani font-bold text-xl">
                        {item.name}
                      </h3>
                      <span className="text-[#dc2626] text-xs uppercase tracking-[0.3em] font-rajdhani font-bold">{item.year}</span>
                    </div>
                    <p className="text-[#6b7280] text-sm font-exo mt-2 mb-3">{item.highlight}</p>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
        <h2 className="text-[#111827] font-rajdhani font-bold text-3xl mb-6">Notícias relacionadas</h2>
        {relatedPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((post) => (
              <NewsCard key={post.id} item={post} theme="light" />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 text-[#6b7280] font-exo text-sm">
            Ainda não temos notícias específicas para esta marca.
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
