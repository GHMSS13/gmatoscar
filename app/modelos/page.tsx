import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { modelPages } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Modelos de Supercarros',
  description:
    'Explore páginas de modelos de supercarros com ficha técnica, destaques e notícias relacionadas para cada carro.',
  keywords: ['modelos de supercarros', 'ficha técnica supercarros', 'ferrari f40', 'laferrari', 'sf90'],
  alternates: {
    canonical: '/modelos',
  },
};

export default function ModelosPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      <section className="pt-28 pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <p className="text-[#dc2626] text-xs uppercase tracking-[0.35em] font-bold font-rajdhani mb-3">Modelos</p>
        <h1 className="text-4xl md:text-5xl font-rajdhani font-bold text-white mb-4">
          Hub de modelos otimizados para SEO
        </h1>
        <p className="text-white/55 font-exo max-w-2xl leading-relaxed">
          Cada página de modelo possui conteúdo editorial, metadados e links internos para melhorar a indexação no Google.
        </p>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {modelPages.map((model) => (
            <Link
              key={model.slug}
              href={`/modelos/${model.slug}`}
              className="rounded-2xl border border-[#1e1e1e] bg-[#0f0f0f] p-5 hover:border-[#dc2626]/40 transition-colors"
            >
              <p className="text-white font-rajdhani text-2xl font-bold mb-2 leading-tight">{model.name}</p>
              <p className="text-white/50 font-exo text-sm mb-4">{model.description}</p>
              <span className="inline-flex items-center gap-2 text-[#dc2626] text-xs uppercase tracking-[0.3em] font-bold font-rajdhani">
                Ver página <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
