import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsCard from '@/components/NewsCard';
import { news } from '@/lib/data';
import { notFound } from 'next/navigation';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = news.find((n) => n.slug === params.slug);
  if (!item) return { title: 'Notícia não encontrada' };
  return {
    title: item.title,
    description: item.excerpt,
    openGraph: {
      title: item.title,
      description: item.excerpt,
      images: [{ url: item.image, alt: item.title }],
    },
  };
}

export default function NoticiaPage({ params }: Props) {
  const item = news.find((n) => n.slug === params.slug);
  if (!item) notFound();

  const related = news.filter((n) => n.id !== item.id && n.category === item.category).slice(0, 3);
  const fallbackRelated = news.filter((n) => n.id !== item.id).slice(0, 3);
  const showRelated = related.length >= 2 ? related : fallbackRelated;

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      {/* Hero image */}
      <section className="relative h-[50vh] min-h-[350px] md:h-[60vh] flex items-end overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover opacity-60"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full pb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm font-exo mb-6 transition-colors"
          >
            <ArrowLeft size={14} /> Voltar
          </Link>
          <span className="inline-block tag-badge bg-[#dc2626] text-white mb-4">{item.category}</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-rajdhani font-bold text-white leading-tight">
            {item.title}
          </h1>
        </div>
      </section>

      {/* Article */}
      <article className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-12">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-5 mb-8 pb-8 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-2 text-white/30 text-sm font-exo">
            <Calendar size={14} className="text-[#dc2626]" />
            {item.date}
          </div>
          <div className="flex items-center gap-2 text-white/30 text-sm font-exo">
            <Clock size={14} className="text-[#dc2626]" />
            {item.readTime} de leitura
          </div>
          <div className="flex items-center gap-2 text-white/30 text-sm font-exo">
            <Tag size={14} className="text-[#dc2626]" />
            {item.category}
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <p className="text-white/70 text-lg leading-[1.8] font-exo mb-6">{item.excerpt}</p>
          <p className="text-white/50 leading-[1.8] font-exo mb-6">
            O mundo dos supercarros nunca para de surpreender. Com avanços tecnológicos constantes e engenharia cada vez mais sofisticada, as montadoras continuam a redefinir os limites do que é possível em um automóvel de alto desempenho.
          </p>
          <p className="text-white/50 leading-[1.8] font-exo mb-6">
            Este modelo representa o estado da arte da indústria automotiva, combinando performance extrema com design arrojado e tecnologia de ponta. Uma verdadeira obra de arte sobre rodas que vai deixar qualquer entusiasta de queixo caído.
          </p>
          <p className="text-white/50 leading-[1.8] font-exo">
            Fique ligado no GMATOSCAR para mais notícias, reviews e rankings sobre os supercarros mais incríveis do mundo. Inscreva-se no canal do YouTube e siga nossas redes sociais para não perder nada!
          </p>
        </div>
      </article>

      {/* Related */}
      {showRelated.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
          <div className="border-t border-[#1e1e1e] pt-12 mb-8">
            <h2 className="text-2xl md:text-3xl font-rajdhani font-bold text-white red-line">
              Mais Notícias
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {showRelated.map((rel) => (
              <NewsCard key={rel.id} item={rel} />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
