import type { Metadata } from 'next';
import Image from 'next/image';
import { Trophy, Gauge, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { rankings } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Ranking dos Supercarros',
  description:
    'O ranking definitivo dos supercarros mais rápidos, poderosos e exclusivos do mundo. Velocidade máxima, potência e aceleração.',
};

const medalColors: Record<number, { bg: string; border: string; text: string }> = {
  1: { bg: 'rgba(255,215,0,0.1)', border: 'rgba(255,215,0,0.3)', text: '#FFD700' },
  2: { bg: 'rgba(192,192,192,0.1)', border: 'rgba(192,192,192,0.3)', text: '#C0C0C0' },
  3: { bg: 'rgba(205,127,50,0.1)', border: 'rgba(205,127,50,0.3)', text: '#CD7F32' },
};

export default function RankingPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      {/* Header */}
      <section className="relative pt-24 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(148,163,184,0.08)_0%,transparent_70%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <p className="text-[#dc2626] text-xs font-bold uppercase tracking-[0.3em] font-rajdhani mb-3">
            Os Mais Rapidos
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-rajdhani font-bold text-white mb-3 sm:mb-4">
            Ranking de Supercarros
          </h1>
          <p className="text-white/50 text-sm sm:text-base md:text-lg max-w-xl font-exo leading-relaxed">
            Os supercarros mais rápidos, poderosos e impressionantes do planeta, classificados por desempenho e tecnologia.
          </p>
          <div className="mt-5 sm:mt-6 w-20 h-1 bg-[#dc2626] rounded-full" />
        </div>
      </section>

      {/* Stats summary */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {[
            { label: 'Modelos', value: rankings.length.toString(), icon: Trophy },
            { label: 'Vel. Max', value: '445 km/h', icon: Gauge },
            { label: 'Pot. Max', value: '2.300 CV', icon: Zap },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-[#111] border border-[#1e1e1e] rounded-sm p-4 md:p-6 text-center">
                <Icon size={18} className="text-[#dc2626] mx-auto mb-2" />
                <div className="text-xl md:text-3xl font-rajdhani font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/30 uppercase tracking-widest font-exo mt-1">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Full ranking table */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
        <div className="space-y-4">
          {rankings.map((car, idx) => {
            const medal = medalColors[car.position];
            return (
              <div
                key={car.position}
                className="group relative flex items-center gap-4 md:gap-6 rounded-sm overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: medal ? medal.bg : '#111111',
                  border: `1px solid ${medal ? medal.border : '#1e1e1e'}`,
                }}
              >
                {/* Position number */}
                <div
                  className="flex-shrink-0 w-14 md:w-20 h-full min-h-[100px] flex items-center justify-center flex-col gap-1"
                  style={{
                    borderRight: `1px solid ${medal ? medal.border : '#1e1e1e'}`,
                    background: medal ? `${medal.bg}` : '#0d0d0d',
                  }}
                >
                  {car.position <= 3 ? (
                    <Trophy size={20} style={{ color: medal?.text }} />
                  ) : null}
                  <span
                    className="font-rajdhani font-bold text-2xl md:text-3xl"
                    style={{ color: medal ? medal.text : '#333' }}
                  >
                    {car.position}
                  </span>
                </div>

                {/* Image */}
                <div className="flex-shrink-0 relative w-24 h-16 md:w-36 md:h-24 rounded-sm overflow-hidden">
                  <Image
                    src={car.image}
                    alt={`${car.brand} ${car.name}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 96px, 144px"
                  />
                </div>

                {/* Main info */}
                <div className="flex-1 min-w-0 py-4 pr-4">
                  <p className="text-white/30 text-xs font-exo uppercase tracking-widest mb-0.5">{car.brand}</p>
                  <h2 className="font-rajdhani font-bold text-white text-xl md:text-2xl leading-none mb-3">
                    {car.name}
                  </h2>

                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    <div className="flex items-center gap-1.5">
                      <Gauge size={13} className="text-[#dc2626]" />
                      <span className="text-white/60 font-exo text-sm">{car.topSpeed}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Zap size={13} className="text-[#dc2626]" />
                      <span className="text-white/60 font-exo text-sm">{car.horsepower}</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-1.5">
                      <span className="text-white/25 font-exo text-xs">0–100 km/h:</span>
                      <span className="text-white/60 font-exo text-sm">{car.acceleration}</span>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="flex-shrink-0 pr-5 text-right hidden sm:block">
                  <p className="text-white/20 text-xs font-exo uppercase tracking-wider mb-1">Preço Aprox.</p>
                  <p
                    className="font-rajdhani font-bold text-lg"
                    style={{ color: medal ? medal.text : '#dc2626' }}
                  >
                    {car.price}
                  </p>
                </div>

                {/* Top indicator */}
                {car.position === 1 && (
                  <div className="absolute top-0 right-0 bg-[#FFD700] text-black text-[9px] font-bold font-rajdhani uppercase px-2 py-0.5 tracking-widest">
                    #1 MUNDIAL
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}
