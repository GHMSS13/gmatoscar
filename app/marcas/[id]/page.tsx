import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Globe, Gauge, Zap, Calendar, Trophy, Sparkles, Camera } from 'lucide-react';
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
      <section className="relative overflow-hidden pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(148,163,184,0.08)_0%,transparent_68%)]" />

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Link
            href="/marcas"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm font-exo mb-6 transition-colors"
          >
            <ArrowLeft size={14} /> Todas as Marcas
          </Link>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-end">
            <div>
              <div
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-white/50 font-rajdhani mb-5"
              >
                <Sparkles size={12} className="text-[#dc2626]" />
                Marca em destaque
              </div>
              <div className="w-12 h-1 rounded-full mb-4" style={{ backgroundColor: brand.color }} />
              <h1 className="text-5xl md:text-7xl font-rajdhani font-bold text-white mb-4">
                {brand.name}
              </h1>
              <p className="max-w-2xl text-white/60 text-base md:text-lg leading-relaxed font-exo mb-6">
                {brand.description}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-white/40 font-exo text-sm">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  <Globe size={14} /> {brand.country}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  <Calendar size={14} /> Fundada em {brand.founded}
                </span>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#0f0f0f] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
              <div className="relative overflow-hidden rounded-2xl aspect-[16/10] mb-4 bg-[#111]">
                <Image
                  src={brand.topModelImage}
                  alt={`${brand.topModel} - imagem de destaque`}
                  fill
                  className="object-cover opacity-85"
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                <div className="absolute top-3 left-3 inline-flex items-center gap-2 rounded-full bg-black/70 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white/60 font-rajdhani">
                  <Camera size={12} className="text-[#dc2626]" />
                  Foto de referência
                </div>
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-white/35 text-xs uppercase tracking-[0.3em] font-rajdhani mb-2">
                    Modelo em destaque
                  </p>
                  <h2 className="text-2xl font-rajdhani font-bold text-white mb-1">
                    {brand.topModel}
                  </h2>
                  <p className="text-white/45 text-sm font-exo">
                    A imagem serve como referência visual da marca e do carro mais representativo da linha.
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white/35 text-xs uppercase tracking-[0.3em] font-rajdhani mb-2">
                    Vel. máx.
                  </p>
                  <div className="text-[#dc2626] text-xl font-rajdhani font-bold">
                    {brand.maxSpeed}
                  </div>
                </div>
              </div>
            </div>
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

        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] mb-14">
          <div className="rounded-2xl border border-[#1e1e1e] bg-[#0f0f0f] p-6">
            <p className="text-[#dc2626] text-xs uppercase tracking-[0.35em] font-bold font-rajdhani mb-3">
              Contexto da marca
            </p>
            <h2 className="text-2xl font-rajdhani font-bold text-white mb-4">
              Uma visão mais completa e confiável
            </h2>
            <p className="text-white/55 font-exo leading-relaxed mb-4">
              Esta página agora prioriza identidade, história e ficha técnica. A fotografia aparece como apoio visual, para reduzir a chance de mostrar imagens soltas ou pouco fiéis à marca.
            </p>
            <p className="text-white/55 font-exo leading-relaxed">
              Se você quiser, eu posso transformar isso depois em páginas editoriais completas para cada marca, com linha do tempo, modelos importantes e notícias relacionadas.
            </p>
          </div>

          <div className="rounded-2xl border border-[#1e1e1e] bg-[#0f0f0f] p-6">
            <p className="text-[#dc2626] text-xs uppercase tracking-[0.35em] font-bold font-rajdhani mb-3">
              Resumo rápido
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-white/35 text-xs uppercase tracking-widest font-exo">Origem</span>
                <span className="text-white/80 font-exo">{brand.country}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-white/35 text-xs uppercase tracking-widest font-exo">Primeiro ano</span>
                <span className="text-white/80 font-exo">{brand.founded}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-white/35 text-xs uppercase tracking-widest font-exo">Modelo principal</span>
                <span className="text-white/80 font-exo">{brand.topModel}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/35 text-xs uppercase tracking-widest font-exo">Velocidade</span>
                <span className="text-[#dc2626] font-rajdhani font-bold">{brand.maxSpeed}</span>
              </div>
            </div>
          </div>
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
