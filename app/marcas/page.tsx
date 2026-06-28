import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Globe, Zap, Gauge, ArrowRight, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { brands } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Marcas de Supercarros',
  description:
    'Explore as maiores marcas de supercarros do mundo: Ferrari, Lamborghini, Bugatti, McLaren, Porsche, Koenigsegg e muito mais.',
};

export default function MarcasPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      {/* Page Header */}
      <section className="relative pt-36 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(148,163,184,0.08)_0%,transparent_70%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <p className="text-[#dc2626] text-xs font-bold uppercase tracking-[0.3em] font-rajdhani mb-3">
            Fabricantes
          </p>
          <h1 className="text-4xl md:text-6xl font-rajdhani font-bold text-white mb-4">
            Marcas Icônicas
          </h1>
          <p className="text-white/50 text-base md:text-lg max-w-xl font-exo leading-relaxed">
            Conheça a história, os modelos e os recordes das marcas mais respeitadas e desejadas do mundo dos supercarros.
          </p>
          {/* Red accent line */}
          <div className="mt-6 w-20 h-1 bg-[#dc2626] rounded-full" />
        </div>
      </section>

      {/* Brands grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brands.map((brand, idx) => (
            <article
              key={brand.id}
              className="group bg-[#111] border border-[#1e1e1e] hover:border-[#dc2626]/40 rounded-sm overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.15)] hover:-translate-y-1"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {/* Car image */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={brand.topModelImage}
                  alt={`${brand.topModel} ${brand.name}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-90"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/30 to-transparent" />

                {/* Country badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm border border-white/10 rounded-sm px-2.5 py-1">
                  <Globe size={11} className="text-white/50" />
                  <span className="text-white/60 text-[10px] font-exo">{brand.country}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="font-rajdhani font-bold text-white text-xl group-hover:text-[#dc2626] transition-colors duration-300">
                    {brand.name}
                  </h2>
                  <div className="flex items-center gap-1 text-white/20 text-xs font-exo">
                    <Calendar size={11} />
                    <span>{brand.founded}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/30 font-exo text-xs">Modelo Top</span>
                    <span className="text-white/70 font-exo text-xs font-medium">{brand.topModel}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-white/30">
                      <Gauge size={11} />
                      <span className="text-xs font-exo">Vel. Máx.</span>
                    </div>
                    <span className="text-[#dc2626] font-rajdhani font-bold text-sm">{brand.maxSpeed}</span>
                  </div>
                </div>

                <div
                  className="h-0.5 w-full rounded-full mb-4 opacity-30"
                  style={{ backgroundColor: brand.color }}
                />

                <Link
                  href={`/marcas/${brand.id}`}
                  className="flex items-center justify-between text-white/40 hover:text-[#dc2626] text-sm font-rajdhani font-bold uppercase tracking-wider transition-colors duration-300 group/link"
                >
                  Ver Detalhes
                  <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>

              {/* Left accent */}
              <div className="absolute top-0 left-0 w-0.5 h-full bg-[#dc2626] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
