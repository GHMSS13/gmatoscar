import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsCard from '@/components/NewsCard';
import { getPostBySlug, getPosts, type Post } from '@/lib/posts';
import { notFound } from 'next/navigation';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = await getPostBySlug(params.slug);
  if (!item) return { title: 'Notícia não encontrada' };
  return {
    title: item.title,
    description: item.excerpt,
    openGraph: {
      title: item.title,
      description: item.excerpt,
      images: [{ url: item.image_url, alt: item.title }],
    },
  };
}

function renderContent(content: string) {
  return content.split(/\n{2,}/).map((paragraph, index) => (
    <p key={index} className="text-[#4b5563] leading-[1.8] font-exo mb-6 whitespace-pre-line">
      {paragraph}
    </p>
  ));
}

export default async function NoticiaPage({ params }: Props) {
  const item = await getPostBySlug(params.slug);
  if (!item) notFound();

  const allPosts = await getPosts();
  const related = allPosts.filter((n) => n.id !== item.id && n.category === item.category).slice(0, 3);
  const fallbackRelated = allPosts.filter((n) => n.id !== item.id).slice(0, 3);
  const showRelated = related.length >= 2 ? related : fallbackRelated;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero image */}
      <section className="relative h-[50vh] min-h-[350px] md:h-[60vh] flex items-end overflow-hidden">
        <Image
          src={item.image_url}
          alt={item.title}
          fill
          className="object-cover opacity-60"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/85 via-[#111827]/35 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(148,163,184,0.08)_0%,transparent_70%)]" />
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full pb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/75 hover:text-white text-sm font-exo mb-6 transition-colors"
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
        <div className="flex flex-wrap items-center gap-5 mb-8 pb-8 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-2 text-[#6b7280] text-sm font-exo">
            <Calendar size={14} className="text-[#dc2626]" />
            {item.date}
          </div>
          <div className="flex items-center gap-2 text-[#6b7280] text-sm font-exo">
            <Clock size={14} className="text-[#dc2626]" />
            {item.read_time} de leitura
          </div>
          <div className="flex items-center gap-2 text-[#6b7280] text-sm font-exo">
            <Tag size={14} className="text-[#dc2626]" />
            {item.category}
          </div>
        </div>

        {/* Content */}
        <div className="prose max-w-none prose-headings:text-[#111827] prose-p:text-[#4b5563]">
          <p className="text-[#374151] text-lg leading-[1.8] font-exo mb-6">{item.excerpt}</p>
          {renderContent(item.content)}
        </div>
      </article>

      {/* Related */}
      {showRelated.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
          <div className="border-t border-[#e5e7eb] pt-12 mb-8">
            <h2 className="text-2xl md:text-3xl font-rajdhani font-bold text-[#111827] red-line">
              Mais Notícias
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {showRelated.map((rel) => (
              <NewsCard key={rel.id} item={rel} theme="light" />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
