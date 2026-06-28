import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Globe, Gauge, Zap, Calendar, Trophy } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { brands } from '@/lib/data';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  return brands.map((b) => ({ id: b.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const brand = brands.find((b) => b.id === params.id);
  if (!brand) return { title: 'Marca não encontrada' };
  return {
    title: `${brand.name} - Supercarros`,
    description: `Conheça os modelos, história e records da ${brand.name}. Fundada em ${brand.founded}, com velocidade máxima de ${brand.maxSpeed}.`,
  };
}

export default function BrandPage({ params }: Props) {
  const brand = brands.find((b) => b.id === params.id);
  if (!brand) notFound();

  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <Image
          src={brand.logo}
          alt={brand.name}
          fill
          className="object-cover opacity-40"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(148,163,184,0.08)_0%,transparent_70%)]" />

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pb-12">
          <Link
            href="/marcas"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm font-exo mb-6 transition-colors"
          >
            <ArrowLeft size={14} /> Todas as Marcas
          </Link>
          <div
            className="w-12 h-1 rounded-full mb-4"
            style={{ backgroundColor: brand.color }}
          />
          <h1 className="text-5xl md:text-7xl font-rajdhani font-bold text-white mb-2">
            {brand.name}
          </h1>
          <div className="flex items-center gap-2 text-white/40 font-exo text-sm">
            <Globe size={14} />
            <span>{brand.country}</span>
            <span className="text-white/20">·</span>
            <Calendar size={14} />
            <span>Fundada em {brand.founded}</span>
          </div>
        </div>
      </section>

      {/* Stats cards */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { label: 'Modelo Top', value: brand.topModel, icon: Trophy },
            { label: 'Vel. Máxima', value: brand.maxSpeed, icon: Gauge },
            { label: 'País', value: brand.country, icon: Globe },
            { label: 'Fundação', value: String(brand.founded), icon: Calendar },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-[#111] border border-[#1e1e1e] rounded-sm p-5 text-center">
                <Icon size={20} className="text-[#dc2626] mx-auto mb-3" />
                <div className="text-xl md:text-2xl font-rajdhani font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-white/30 uppercase tracking-widest font-exo">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center py-12 text-white/20 font-exo">
          <Zap size={40} className="text-[#dc2626]/30 mx-auto mb-4" />
          <p className="text-sm">Mais conteúdo em breve...</p>
          <Link
            href="/marcas"
            className="inline-flex items-center gap-2 mt-6 text-[#dc2626] hover:text-[#ef4444] font-rajdhani font-bold uppercase tracking-wider text-sm transition-colors"
          >
            <ArrowLeft size={14} /> Voltar para Marcas
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
