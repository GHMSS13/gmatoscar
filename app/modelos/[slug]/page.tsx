import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Gauge, Timer, Zap, Car, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsCard from '@/components/NewsCard';
import { getModelBySlug } from '@/lib/brands';
import { getPosts, type Post } from '@/lib/posts';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface Props {
  params: { slug: string };
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function getRelatedPosts(posts: Post[], modelName: string, brandName: string) {
  const normalizedModel = normalizeText(modelName);
  const normalizedBrand = normalizeText(brandName);

  return posts
    .filter((post) => {
      const haystack = normalizeText([
        post.title,
        post.excerpt,
        post.content,
        post.category,
        post.slug,
      ].join(' '));

      return haystack.includes(normalizedModel) || haystack.includes(normalizedBrand);
    })
    .slice(0, 3);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const model = await getModelBySlug(params.slug);
  if (!model) return { title: 'Modelo não encontrado' };
  const brand = model.brands;

  return {
    title: `${model.name} - ${brand.name}`,
    description: `${model.description} Veja ficha técnica, velocidade máxima, aceleração e notícias sobre o ${model.name}.`,
    keywords: [
      model.name,
      `${model.name} ficha técnica`,
      `${brand.name} ${model.name}`,
      `${model.name} velocidade máxima`,
      `${model.name} 0-100`,
    ],
    alternates: {
      canonical: `/modelos/${model.slug}`,
    },
    openGraph: {
      title: `${model.name} - Ficha técnica e notícias`,
      description: model.description,
      images: [{ url: model.image_url, alt: model.name }],
    },
  };
}

export default async function ModeloPage({ params }: Props) {
  const model = await getModelBySlug(params.slug);
  if (!model) notFound();
  const brand = model.brands;

  const posts = await getPosts();
  const relatedPosts = getRelatedPosts(posts, model.name, brand.name);

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: model.name,
    brand: {
      '@type': 'Brand',
      name: brand.name,
    },
    description: model.description,
    image: model.image_url,
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Potência', value: model.power },
      { '@type': 'PropertyValue', name: 'Velocidade máxima', value: model.top_speed },
      { '@type': 'PropertyValue', name: '0-100 km/h', value: model.acceleration },
      { '@type': 'PropertyValue', name: 'Tração', value: model.drivetrain },
    ],
  };

  return (
    <main className="min-h-screen bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <Navbar />

      <section className="relative pt-28 pb-12 sm:pt-32 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(148,163,184,0.08)_0%,transparent_68%)]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <Link
            href={`/marcas/${brand.slug}`}
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm font-exo mb-6 transition-colors"
          >
            <ArrowLeft size={14} /> Voltar para {brand.name}
          </Link>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div>
              <p className="text-[#dc2626] text-xs uppercase tracking-[0.35em] font-bold font-rajdhani mb-3">
                Modelo
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-rajdhani font-bold text-white mb-4">
                {model.name}
              </h1>
              <p className="text-white/60 font-exo text-base leading-relaxed max-w-2xl mb-6">
                {model.description}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 font-exo inline-flex items-center gap-1.5">
                  <Calendar size={12} /> {model.year}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 font-exo inline-flex items-center gap-1.5">
                  <Car size={12} /> {model.category}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 font-exo inline-flex items-center gap-1.5">
                  <Zap size={12} /> {brand.name}
                </span>
              </div>
            </div>

            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-[#111]">
              <Image
                src={model.image_url}
                alt={model.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
          <div className="rounded-xl border border-[#1e1e1e] bg-[#0f0f0f] p-5">
            <p className="text-white/35 text-xs uppercase tracking-[0.3em] font-rajdhani mb-2">Potência</p>
            <p className="text-white font-rajdhani text-2xl font-bold">{model.power}</p>
          </div>
          <div className="rounded-xl border border-[#1e1e1e] bg-[#0f0f0f] p-5">
            <p className="text-white/35 text-xs uppercase tracking-[0.3em] font-rajdhani mb-2">Velocidade</p>
            <p className="text-white font-rajdhani text-2xl font-bold">{model.top_speed}</p>
          </div>
          <div className="rounded-xl border border-[#1e1e1e] bg-[#0f0f0f] p-5">
            <p className="text-white/35 text-xs uppercase tracking-[0.3em] font-rajdhani mb-2">0-100 km/h</p>
            <p className="text-white font-rajdhani text-2xl font-bold inline-flex items-center gap-2">
              <Timer size={18} className="text-[#dc2626]" /> {model.acceleration}
            </p>
          </div>
          <div className="rounded-xl border border-[#1e1e1e] bg-[#0f0f0f] p-5">
            <p className="text-white/35 text-xs uppercase tracking-[0.3em] font-rajdhani mb-2">Tração</p>
            <p className="text-white font-rajdhani text-2xl font-bold inline-flex items-center gap-2">
              <Gauge size={18} className="text-[#dc2626]" /> {model.drivetrain}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-[#1e1e1e] bg-[#0f0f0f] p-6 mb-10">
          <p className="text-[#dc2626] text-xs uppercase tracking-[0.35em] font-bold font-rajdhani mb-4">Destaques do modelo</p>
          <ul className="space-y-3">
            <li className="text-white/60 font-exo text-sm leading-relaxed border-l-2 border-[#dc2626]/40 pl-3">
              {model.highlight}
            </li>
            <li className="text-white/60 font-exo text-sm leading-relaxed border-l-2 border-[#dc2626]/20 pl-3">
              Categoria: {model.category}
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-[#1e1e1e] bg-[#0f0f0f] p-6">
          <p className="text-[#dc2626] text-xs uppercase tracking-[0.35em] font-bold font-rajdhani mb-4">Notícias relacionadas</p>
          {relatedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedPosts.map((post) => (
                <NewsCard key={post.id} item={post} />
              ))}
            </div>
          ) : (
            <p className="text-white/45 font-exo text-sm">
              Ainda não há notícias específicas para este modelo. Em breve teremos novos artigos.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
