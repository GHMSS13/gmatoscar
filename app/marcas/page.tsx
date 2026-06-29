import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Globe, Zap, Gauge, ArrowRight, Calendar, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getBrands, getModels } from '@/lib/brands';

export const metadata: Metadata = {
  title: 'Marcas de Supercarros',
  description:
    'Explore marcas e modelos de supercarros com páginas otimizadas para SEO: Ferrari, Lamborghini, Bugatti, McLaren, Porsche, Koenigsegg e muito mais.',
  keywords: [
    'marcas de supercarros',
    'modelos de supercarros',
    'ferrari',
    'lamborghini',
    'bugatti',
    'mclaren',
    'porsche',
    'koenigsegg',
  ],
  alternates: {
    canonical: '/marcas',
  },
};

const marcasSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Marcas e Modelos de Supercarros',
  description:
    'Hub editorial com páginas de fabricantes e modelos de supercarros, otimizado para pesquisa orgânica.',
  url: 'https://gmatoscar.com.br/marcas',
  about: [],
};

export const dynamic = 'force-dynamic';

export default async function MarcasPage() {
  const [brands, models] = await Promise.all([getBrands(), getModels()]);

  const schema = {
    ...marcasSchema,
    about: brands.map((brand) => ({
      '@type': 'Brand',
      name: brand.name,
      url: `https://gmatoscar.com.br/marcas/${brand.slug}`,
    })),
  };

  return (
    <main className="min-h-screen bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Navbar />

      {/* Page Header */}
      <section className="relative pt-24 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(148,163,184,0.08)_0%,transparent_70%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <p className="text-[#dc2626] text-xs font-bold uppercase tracking-[0.3em] font-rajdhani mb-3">
            Fabricantes
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-rajdhani font-bold text-white mb-3 sm:mb-4">
            Marcas Icônicas
          </h1>
          <p className="text-white/50 text-sm sm:text-base md:text-lg max-w-xl font-exo leading-relaxed">
            Conheça a história, os modelos e os recordes das marcas mais respeitadas e desejadas do mundo dos supercarros.
          </p>
          {/* Red accent line */}
          <div className="mt-5 sm:mt-6 w-20 h-1 bg-[#dc2626] rounded-full" />
        </div>
      </section>

      {/* Brands grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20 max-w-7xl mx-auto">
        {brands.length === 0 && (
          <div className="mb-8 rounded-2xl border border-[#2a2a2a] bg-[#0f0f0f] p-5 text-white/70 font-exo text-sm">
            Nenhuma marca publicada no Supabase ainda. Cadastre dados nas tabelas `brands`, `brand_timeline` e `brand_models` para preencher esta página.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brands.map((brand, idx) => (
            <article
              key={brand.slug}
              className="group bg-[#111] border border-[#1e1e1e] hover:border-[#dc2626]/40 rounded-sm overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.15)] hover:-translate-y-1"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {/* Brand banner */}
              <div className="relative aspect-[16/9] overflow-hidden" style={{ backgroundColor: `${brand.color}22` }}>
                <Image
                  src={brand.logo_url}
                  alt={`${brand.name} logo`}
                  fill
                  className="object-contain p-10 transition-transform duration-500 group-hover:scale-105 opacity-95"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/25 to-transparent" />

                <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/10 bg-black/50 backdrop-blur-sm p-3">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/35 font-rajdhani mb-1">
                    Visão geral
                  </p>
                  <p className="text-xs text-white/70 font-exo line-clamp-2">
                    {brand.description}
                  </p>
                </div>

                {/* Country badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm border border-white/10 rounded-sm px-2.5 py-1">
                  <Globe size={11} className="text-white/50" />
                  <span className="text-white/60 text-[10px] font-exo">{brand.country}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="font-rajdhani font-bold text-white text-xl group-hover:text-[#dc2626] transition-colors duration-300">
                    {brand.name}
                  </h2>
                  <div className="flex items-center gap-1 text-white/20 text-xs font-exo">
                    <Calendar size={11} />
                    <span>{brand.founded}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/30 font-exo text-xs">Modelo Top</span>
                    <span className="text-white/70 font-exo text-xs font-medium">{brand.top_model}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-white/30">
                      <Gauge size={11} />
                      <span className="text-xs font-exo">Vel. Máx.</span>
                    </div>
                    <span className="text-[#dc2626] font-rajdhani font-bold text-sm">{brand.max_speed}</span>
                  </div>
                </div>

                <p className="text-white/40 text-xs leading-relaxed font-exo mb-5 line-clamp-3">
                  {brand.description}
                </p>

                <div
                  className="h-0.5 w-full rounded-full mb-4 opacity-30"
                  style={{ backgroundColor: brand.color }}
                />

                <Link
                  href={`/marcas/${brand.slug}`}
                  className="flex items-center justify-between text-white/40 hover:text-[#dc2626] text-sm font-rajdhani font-bold uppercase tracking-wider transition-colors duration-300 group/link"
                >
                  Ver Detalhes
                  <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform duration-300" />
                </Link>

                {brand.models.length > 0 && (
                  <Link
                    href={`/modelos/${brand.models[0].slug}`}
                    className="mt-2 flex items-center justify-between text-white/30 hover:text-white text-xs font-rajdhani font-bold uppercase tracking-wider transition-colors duration-300"
                  >
                    Ver Modelos
                    <ArrowRight size={12} />
                  </Link>
                )}
              </div>

              {/* Left accent */}
              <div className="absolute top-0 left-0 w-0.5 h-full bg-[#dc2626] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-[#1e1e1e] bg-[#0f0f0f] p-6">
          <div className="mb-5">
            <p className="text-[#dc2626] text-xs font-bold uppercase tracking-[0.35em] font-rajdhani mb-2">
              Estrutura SEO
            </p>
            <h2 className="text-2xl md:text-3xl font-rajdhani font-bold text-white">
              Páginas de modelos para busca orgânica
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {models.map((model) => (
              <Link
                key={model.slug}
                href={`/modelos/${model.slug}`}
                className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 hover:border-[#dc2626]/40 transition-colors"
              >
                <p className="text-white font-rajdhani font-bold text-lg leading-tight">{model.name}</p>
                <p className="text-white/40 text-xs font-exo mt-1">{model.year} · {model.category}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
