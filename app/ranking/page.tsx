import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Rankings | GMATOSCAR',
  description: 'Explore os rankings de velocidade, preço e exclusividade dos supercarros.',
};

export default function RankingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-28 sm:pt-36 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#dc2626] text-xs font-bold uppercase tracking-[0.3em] font-rajdhani mb-4">
            Rankings
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-[#111827] leading-tight mb-6">
            Comparativos e listas dos gigantes
          </h1>
          <p className="text-[#1f2937] text-sm sm:text-base leading-relaxed font-exo max-w-3xl">
            Veja os carros mais rápidos, mais caros e mais exclusivos do planeta em rankings
            organizados para quem gosta de desempenho, engenharia e história automotiva.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
