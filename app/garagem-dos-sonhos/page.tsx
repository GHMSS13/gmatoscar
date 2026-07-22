import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Garagem dos Sonhos | GMATOSCAR',
  description: 'Descubra seleções especiais com os carros dos sonhos para todo apaixonado por supercarros.',
};

export default function GaragemDosSonhosPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-28 sm:pt-36 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#dc2626] text-xs font-bold uppercase tracking-[0.3em] font-rajdhani mb-4">
            Garagem dos Sonhos
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-[#111827] leading-tight mb-6">
            Uma seleção para quem sonha alto
          </h1>
          <p className="text-[#1f2937] text-sm sm:text-base leading-relaxed font-exo max-w-3xl">
            Nesta página você encontra seleções temáticas com modelos icônicos, raros e desejados,
            reunindo inspirações para montar a garagem perfeita de qualquer entusiasta.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
