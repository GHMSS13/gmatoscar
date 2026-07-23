import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import NewsGrid from '@/components/NewsGrid';
import BrandsSection from '@/components/BrandsSection';
import Footer from '@/components/Footer';
import { getPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'GMATOSCAR Supercarros - Os Melhores Supercarros do Mundo',
  description:
    'Notícias atualizadas, rankings e tudo sobre supercarros, hypercars e carros de luxo. O maior canal brasileiro sobre automóveis de alta performance.',
};

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="relative pt-0 sm:pt-10 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(148,163,184,0.08)_0%,transparent_70%)]" />

        <div className="relative z-10">
          <NewsGrid posts={posts} theme="light" />
        </div>
      </section>

      <BrandsSection />
      <Footer />
    </main>
  );
}
