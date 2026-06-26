import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import NewsGrid from '@/components/NewsGrid';
import BrandsSection from '@/components/BrandsSection';
import RankingPreview from '@/components/RankingPreview';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'GMATOSCAR Supercarros - Os Melhores Supercarros do Mundo',
  description:
    'Notícias atualizadas, rankings e tudo sobre supercarros, hypercars e carros de luxo. O maior canal brasileiro sobre automóveis de alta performance.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <HeroBanner />
      <NewsGrid />
      <BrandsSection />
      <RankingPreview />
      <Footer />
    </main>
  );
}
