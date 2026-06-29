import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Globe, Gauge, Zap, Calendar, Trophy, Sparkles, Camera } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsCard from '@/components/NewsCard';
import { getBrandBySlug } from '@/lib/brands';
import { getPosts, type Post } from '@/lib/posts';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface Props {
  params: { id: string };
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function getRelatedPosts(posts: Post[], brandName: string) {
  const normalizedName = normalizeText(brandName);

  return posts
    .filter((post) => {
      const haystack = normalizeText([
        post.title,
        post.excerpt,
        post.content,
        post.category,
        post.slug,
      ].join(' '));

      return haystack.includes(normalizedName);
    })
    .slice(0, 3);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const brand = await getBrandBySlug(params.id);
  if (!brand) return { title: 'Marca não encontrada' };

  const keywordBase = [
    brand.name,
    `${brand.name} história`,
    `${brand.name} modelos`,
    `${brand.name} ficha técnica`,
    ...brand.models.map((model) => `${brand.name} ${model.name}`),
  ];

  return {
    title: `${brand.name} - Supercarros`,
    description: `Conheça a história, os modelos, a linha do tempo e as notícias relacionadas da ${brand.name}. Fundada em ${brand.founded}, com velocidade máxima de ${brand.max_speed}.`,
    keywords: keywordBase,
    alternates: {
      canonical: `/marcas/${brand.slug}`,
    },
    openGraph: {
      title: `${brand.name} - História, Modelos e Notícias`,
      description: `Página editorial da ${brand.name} com linha do tempo, modelos famosos e conteúdo atualizado.`,
      images: [{ url: brand.hero_image_url, alt: brand.name }],
    },
  };
}

export default async function BrandPage({ params }: Props) {
  const brand = await getBrandBySlug(params.id);
  if (!brand) notFound();

  const posts = await getPosts();
  const relatedPosts = getRelatedPosts(posts, brand.name);

  const brandSchema = {
    '@context': 'https://schema.org',
    '@type': 'Brand',
    name: brand.name,
    foundingDate: String(brand.founded),
    description: brand.description,
    url: `https://gmatoscar.com.br/marcas/${brand.slug}`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://gmatoscar.com.br/' },
      { '@type': 'ListItem', position: 2, name: 'Marcas', item: 'https://gmatoscar.com.br/marcas' },
      { '@type': 'ListItem', position: 3, name: brand.name, item: `https://gmatoscar.com.br/marcas/${brand.slug}` },
    ],
  };

  return (
    <main className="min-h-screen bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brandSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(148,163,184,0.08)_0%,transparent_68%)]" />

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Link
            href="/marcas"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm font-exo mb-6 transition-colors"
          >
            <ArrowLeft size={14} /> Todas as Marcas
          </Link>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-end">
            <div>
              <div
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-white/50 font-rajdhani mb-5"
              >
                <Sparkles size={12} className="text-[#dc2626]" />
                Marca em destaque
              </div>
              <div className="w-12 h-1 rounded-full mb-4" style={{ backgroundColor: brand.color }} />
              <h1 className="text-5xl md:text-7xl font-rajdhani font-bold text-white mb-4">
                {brand.name}
              </h1>
              <p className="max-w-2xl text-white/60 text-base md:text-lg leading-relaxed font-exo mb-6">
                {brand.description}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-white/40 font-exo text-sm">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  <Globe size={14} /> {brand.country}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  <Calendar size={14} /> Fundada em {brand.founded}
                </span>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#0f0f0f] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
              <div className="relative overflow-hidden rounded-2xl aspect-[16/10] mb-4 bg-[#111]">
                <Image
                  src={brand.hero_image_url}
                  alt={`${brand.top_model} - imagem de destaque`}
                  fill
                  className="object-cover opacity-85"
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                <div className="absolute top-3 left-3 inline-flex items-center gap-2 rounded-full bg-black/70 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white/60 font-rajdhani">
                  <Camera size={12} className="text-[#dc2626]" />
                  Foto de referência
                </div>
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-white/35 text-xs uppercase tracking-[0.3em] font-rajdhani mb-2">
                    Modelo em destaque
                  </p>
                  <h2 className="text-2xl font-rajdhani font-bold text-white mb-1">
                    {brand.top_model}
                  </h2>
                  <p className="text-white/45 text-sm font-exo">
                    A imagem serve como referência visual da marca e do carro mais representativo da linha.
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white/35 text-xs uppercase tracking-[0.3em] font-rajdhani mb-2">
                    Vel. máx.
                  </p>
                  <div className="text-[#dc2626] text-xl font-rajdhani font-bold">
                    {brand.max_speed}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats cards */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { label: 'Modelo Top', value: brand.top_model, icon: Trophy },
            { label: 'Vel. Máxima', value: brand.max_speed, icon: Gauge },
            { label: 'País', value: brand.country, icon: Globe },
            { label: 'Fundação', value: String(brand.founded), icon: Calendar },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-[#111] border border-[#1e1e1e] rounded-sm p-5 text-center">
                <Icon size={20} className="text-[#dc2626] mx-auto mb-3" />
                <div className="text-xl md:text-2xl font-rajdhani font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-white/30 uppercase tracking-widest font-exo">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] mb-14">
          <div className="rounded-2xl border border-[#1e1e1e] bg-[#0f0f0f] p-6">
            <p className="text-[#dc2626] text-xs uppercase tracking-[0.35em] font-bold font-rajdhani mb-3">
              Contexto da marca
            </p>
            <h2 className="text-2xl font-rajdhani font-bold text-white mb-4">
              Uma visão mais completa e confiável
            </h2>
            <p className="text-white/55 font-exo leading-relaxed mb-4">
              Esta página agora prioriza identidade, história e ficha técnica. A fotografia aparece como apoio visual, para reduzir a chance de mostrar imagens soltas ou pouco fiéis à marca.
            </p>
            <p className="text-white/55 font-exo leading-relaxed">
              Se você quiser, eu posso transformar isso depois em páginas editoriais completas para cada marca, com linha do tempo, modelos importantes e notícias relacionadas.
            </p>
          </div>

          <div className="rounded-2xl border border-[#1e1e1e] bg-[#0f0f0f] p-6">
            <p className="text-[#dc2626] text-xs uppercase tracking-[0.35em] font-bold font-rajdhani mb-3">
              Resumo rápido
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-white/35 text-xs uppercase tracking-widest font-exo">Origem</span>
                <span className="text-white/80 font-exo">{brand.country}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-white/35 text-xs uppercase tracking-widest font-exo">Primeiro ano</span>
                <span className="text-white/80 font-exo">{brand.founded}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-white/35 text-xs uppercase tracking-widest font-exo">Modelo principal</span>
                <span className="text-white/80 font-exo">{brand.top_model}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/35 text-xs uppercase tracking-widest font-exo">Velocidade</span>
                <span className="text-[#dc2626] font-rajdhani font-bold">{brand.max_speed}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mb-14">
          <div className="rounded-2xl border border-[#1e1e1e] bg-[#0f0f0f] p-6">
            <p className="text-[#dc2626] text-xs uppercase tracking-[0.35em] font-bold font-rajdhani mb-4">
              Linha do tempo
            </p>
            <div className="space-y-5">
              {brand.timeline.map((item, index) => (
                <div key={`${item.year}-${item.title}`} className="relative pl-8">
                  <div className="absolute left-0 top-1.5 h-4 w-4 rounded-full bg-[#dc2626] shadow-[0_0_0_4px_rgba(220,38,38,0.15)]" />
                  {index < brand.timeline.length - 1 && <div className="absolute left-[7px] top-6 h-full w-px bg-white/10" />}
                  <div className="text-[#dc2626] text-xs font-bold uppercase tracking-[0.35em] font-rajdhani mb-1">
                    {item.year}
                  </div>
                  <h3 className="text-white font-rajdhani font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-white/50 font-exo text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#1e1e1e] bg-[#0f0f0f] p-6">
            <p className="text-[#dc2626] text-xs uppercase tracking-[0.35em] font-bold font-rajdhani mb-4">
              Modelos famosos
            </p>
            <div className="grid gap-4">
              {brand.models.map((model) => (
                <div key={`${model.name}-${model.year}`} className="rounded-xl border border-white/5 bg-black/30 p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-white font-rajdhani font-bold text-xl">{model.name}</h3>
                    <span className="text-[#dc2626] text-xs uppercase tracking-[0.3em] font-bold font-rajdhani">
                      {model.year}
                    </span>
                  </div>
                  <p className="text-white/50 font-exo text-sm leading-relaxed">{model.highlight}</p>
                  <Link
                    href={`/modelos/${model.slug}`}
                    className="mt-3 inline-flex items-center gap-2 text-xs text-white/50 hover:text-[#dc2626] font-rajdhani uppercase tracking-[0.24em] transition-colors"
                  >
                    Página do modelo <ArrowLeft size={12} className="rotate-180" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-14 rounded-2xl border border-[#1e1e1e] bg-[#0f0f0f] p-6">
          <p className="text-[#dc2626] text-xs uppercase tracking-[0.35em] font-bold font-rajdhani mb-4">
            Notícias relacionadas
          </p>
          {relatedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedPosts.map((post) => (
                <NewsCard key={post.id} item={post} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-white/5 bg-black/30 p-5 text-white/45 font-exo text-sm">
              Ainda não há notícias publicadas que mencionem diretamente esta marca.
            </div>
          )}
        </div>

        <div className="text-center py-12 text-white/20 font-exo">
          <Zap size={40} className="text-[#dc2626]/30 mx-auto mb-4" />
          <p className="text-sm">Mais conteúdo em breve...</p>
          <Link
            href="/marcas"
            className="inline-flex items-center gap-2 mt-6 text-[#dc2626] hover:text-[#ef4444] font-rajdhani font-bold uppercase tracking-wider text-sm transition-colors"
          >
            <ArrowLeft size={14} /> Voltar para Marcas
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
