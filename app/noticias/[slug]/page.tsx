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
  const lines = content.split('\n');

  const imageMarkdownRegex = /^!\[(.*?)\]\((https?:\/\/[^\s)]+)\)$/i;
  const imageUrlOnlyRegex = /^https?:\/\/\S+\.(?:png|jpe?g|webp|gif|avif)(?:\?\S*)?$/i;
  const inlineLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/gi;

  return lines.map((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      return <div key={`sp-${index}`} className="h-3" />;
    }

    const markdownImg = trimmed.match(imageMarkdownRegex);
    if (markdownImg) {
      const alt = markdownImg[1] || 'Imagem do artigo';
      const src = markdownImg[2];
      return (
        <figure
          key={`img-md-${index}`}
          className="my-5 w-full overflow-hidden rounded-xl border border-[#e5e7eb] bg-white"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="block w-full h-auto"
            loading="lazy"
          />
          {alt ? <figcaption className="px-4 py-3 text-xs text-[#6b7280] font-exo">{alt}</figcaption> : null}
        </figure>
      );
    }

    if (imageUrlOnlyRegex.test(trimmed)) {
      return (
        <figure
          key={`img-url-${index}`}
          className="my-5 w-full overflow-hidden rounded-xl border border-[#e5e7eb] bg-white"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={trimmed}
            alt="Imagem do artigo"
            className="block w-full h-auto"
            loading="lazy"
          />
        </figure>
      );
    }

    const parts: React.ReactNode[] = [];
    let lastIdx = 0;

    const linkRegex = new RegExp(inlineLinkRegex.source, inlineLinkRegex.flags);
    let match = linkRegex.exec(trimmed);

    while (match) {
      const text = match[1];
      const href = match[2];
      const start = match.index ?? 0;

      if (start > lastIdx) {
        parts.push(trimmed.slice(lastIdx, start));
      }

      parts.push(
        <a
          key={`link-${index}-${start}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#dc2626] underline underline-offset-2 hover:text-[#b91c1c]"
        >
          {text}
        </a>
      );

      lastIdx = start + match[0].length;
      match = linkRegex.exec(trimmed);
    }

    if (lastIdx < trimmed.length) {
      parts.push(trimmed.slice(lastIdx));
    }

    return (
      <p key={`p-${index}`} className="text-[#1f2937] leading-[1.8] font-exo mb-4">
        {parts.length > 0 ? parts : trimmed}
      </p>
    );
  });
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
          className="object-cover opacity-45"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/15" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.35)_0%,transparent_68%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(0,0,0,0.25)_0%,rgba(0,0,0,0.08)_45%,rgba(0,0,0,0.3)_100%)]" />
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full pb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/75 hover:text-white text-sm font-exo mb-6 transition-colors"
          >
            <ArrowLeft size={14} /> Voltar
          </Link>
          <span className="inline-block tag-badge bg-[#dc2626] text-white mb-4">{item.category}</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-rajdhani font-bold text-white leading-tight [text-shadow:0_3px_16px_rgba(0,0,0,0.65)]">
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
        <div className="prose mx-auto max-w-[560px] prose-headings:text-[#111827] prose-p:text-[#1f2937]">
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
