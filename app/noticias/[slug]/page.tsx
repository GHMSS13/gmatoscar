import type { Metadata } from 'next';
import Image from 'next/image';
import { Clock, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsCard from '@/components/NewsCard';
import ArticleShareButtons from '@/components/ArticleShareButtons';
import ArticleFollowBanner from '@/components/ArticleFollowBanner';
import ArticleBackButton from '@/components/ArticleBackButton';
import { getPostBySlug, getPosts, type Post } from '@/lib/posts';
import MarkdownContent from '@/lib/articleContent';
import { notFound } from 'next/navigation';

interface Props {
  params: { slug: string };
}

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ' ')
    .replace(/[^a-z0-9\s-]/g, ' ');

const buildTokenSet = (value: string) => {
  const stopWords = new Set([
    'de', 'da', 'do', 'das', 'dos', 'e', 'o', 'a', 'os', 'as', 'um', 'uma',
    'no', 'na', 'nos', 'nas', 'com', 'para', 'por', 'em', 'ao', 'aos', 'que',
    'seu', 'sua', 'seus', 'suas', 'mais', 'sobre', 'como', 'novo', 'nova', 'carro',
  ]);

  return new Set(
    normalizeText(value)
      .split(/\s+/)
      .map((token) => token.trim())
      .filter((token) => token.length >= 3 && !stopWords.has(token))
  );
};

const relatedScore = (current: Post, candidate: Post) => {
  const currentTokens = buildTokenSet(`${current.title} ${current.excerpt} ${current.slug}`);
  const candidateTokens = buildTokenSet(`${candidate.title} ${candidate.excerpt} ${candidate.slug}`);

  let overlap = 0;
  currentTokens.forEach((token) => {
    if (candidateTokens.has(token)) {
      overlap += 1;
    }
  });

  if (overlap === 0) {
    return 0;
  }

  const currentTitle = normalizeText(current.title);
  const candidateTitle = normalizeText(candidate.title);
  let hasTitleKeyword = false;
  currentTokens.forEach((token) => {
    if (!hasTitleKeyword && currentTitle.includes(token) && candidateTitle.includes(token)) {
      hasTitleKeyword = true;
    }
  });

  return overlap + (hasTitleKeyword ? 2 : 0);
};

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

export default async function NoticiaPage({ params }: Props) {
  const item = await getPostBySlug(params.slug);
  if (!item) notFound();

  const allPosts = await getPosts();
  const rankedRelated = allPosts
    .filter((n) => n.id !== item.id)
    .map((candidate) => ({
      candidate,
      score: relatedScore(item, candidate),
    }))
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return new Date(b.candidate.date).getTime() - new Date(a.candidate.date).getTime();
    });

  const prioritized = rankedRelated.filter((entry) => entry.score > 0).map((entry) => entry.candidate);
  const fallbackRelated = rankedRelated.filter((entry) => entry.score === 0).map((entry) => entry.candidate);
  const showRelated = [...prioritized, ...fallbackRelated].slice(0, 3);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <ArticleBackButton fallbackHref="/" compact floating />

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
          <ArticleShareButtons title={item.title} slug={item.slug} />
        </div>

        {/* Content */}
        <div className="prose mx-auto max-w-[560px] prose-headings:text-[#111827] prose-headings:leading-tight prose-p:text-[#1f2937] prose-p:leading-[1.45] prose-p:mb-3">
          <p className="text-[#374151] text-lg leading-[1.45] font-exo mb-3">{item.excerpt}</p>
          <ArticleFollowBanner />
          <MarkdownContent content={item.content} />
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
              <NewsCard key={rel.id} item={rel} variant="related" theme="light" />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
