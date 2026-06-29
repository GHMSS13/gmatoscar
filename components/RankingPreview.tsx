import Image from 'next/image';
import Link from 'next/link';
import { Trophy, Zap, Gauge, ArrowRight } from 'lucide-react';
import { rankings } from '@/lib/data';

const medalColors: Record<number, string> = {
  1: '#FFD700',
  2: '#C0C0C0',
  3: '#CD7F32',
};

interface RankingPreviewProps {
  theme?: 'dark' | 'light';
}

export default function RankingPreview({ theme = 'dark' }: RankingPreviewProps) {
  const isLight = theme === 'light';
  const top5 = rankings.slice(0, 5);

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 sm:gap-4 mb-8 sm:mb-12">
        <div>
          <p className="text-[#dc2626] text-xs font-bold uppercase tracking-[0.3em] font-rajdhani mb-2">
            Os Mais Rapidos
          </p>
          <h2 className={`text-3xl md:text-4xl font-bold red-line ${isLight ? 'font-serif text-[#111]' : 'font-rajdhani text-white'}`}>
            Top 5 Supercarros
          </h2>
        </div>
        <Link
          href="/ranking"
          className={`inline-flex items-center gap-2 text-sm hover:text-[#dc2626] font-rajdhani uppercase tracking-wider transition-colors duration-300 group ${isLight ? 'text-[#4b5563]' : 'text-white/40'}`}
        >
          Ranking Completo <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Ranking list */}
      <div className="space-y-3 sm:space-y-4">
        {top5.map((car, idx) => (
          <div
            key={car.position}
            className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-6 bg-[#111] border border-[#1e1e1e] hover:border-[#dc2626]/30 rounded-sm p-3 sm:p-4 md:p-5 transition-all duration-300 hover:shadow-[0_0_20px_rgba(220,38,38,0.1)] overflow-hidden"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {/* Position */}
            <div
              className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-sm font-rajdhani font-bold text-lg sm:text-xl md:text-2xl"
              style={{
                color: medalColors[car.position] ?? '#555',
                backgroundColor: medalColors[car.position]
                  ? `${medalColors[car.position]}15`
                  : '#1a1a1a',
                border: `1px solid ${medalColors[car.position] ? `${medalColors[car.position]}30` : '#2a2a2a'}`,
              }}
            >
              {car.position <= 3 ? (
                <Trophy size={18} style={{ color: medalColors[car.position] }} />
              ) : (
                car.position
              )}
            </div>

            {/* Car image */}
            <div className="flex-shrink-0 relative w-full sm:w-20 h-40 sm:h-14 md:w-28 md:h-20 rounded-sm overflow-hidden">
              <Image
                src={car.image}
                alt={`${car.brand} ${car.name}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 80px, 112px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111]/20" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div className="min-w-0">
                  <p className="text-white/40 text-xs font-exo uppercase tracking-widest mb-0.5">
                    {car.brand}
                  </p>
                  <h3 className="font-rajdhani font-bold text-base sm:text-lg md:text-xl leading-none group-hover:text-[#dc2626] transition-colors duration-300 line-clamp-2">
                    {car.name}
                  </h3>
                </div>
                <span className="font-rajdhani font-bold text-sm sm:text-base md:text-lg flex-shrink-0 self-start sm:self-auto">
                  {car.price}
                </span>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-3 mt-2 sm:mt-3">
                <div className="flex items-center gap-1.5 text-sm">
                  <Gauge size={13} className="text-[#dc2626]" />
                  <span className="text-white/70 font-exo">{car.topSpeed}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <Zap size={13} className="text-[#dc2626]" />
                  <span className="text-white/70 font-exo">{car.horsepower}</span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-sm">
                  <span className="text-white/30 font-exo text-xs">0–100:</span>
                  <span className="text-white/70 font-exo">{car.acceleration}</span>
                </div>
              </div>
            </div>

            {/* Right glow on #1 */}
            {car.position === 1 && (
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-[#FFD700]/50 via-[#FFD700]/30 to-transparent" />
            )}

            {/* Left accent */}
            <div className="absolute top-0 left-0 w-0.5 h-full bg-[#dc2626] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-8 text-center">
        <Link
          href="/ranking"
          className={`inline-flex items-center gap-2 hover:border-[#dc2626] rounded-sm px-8 py-3.5 font-rajdhani font-bold uppercase tracking-widest text-sm transition-all duration-300 group ${isLight ? 'bg-white border border-[#d1d5db] text-[#374151] hover:text-[#dc2626] hover:bg-[#fff5f5]' : 'bg-[#111] border border-[#dc2626]/30 text-white/70 hover:text-[#dc2626] hover:bg-[#dc2626]/10'}`}
        >
          Ver Ranking Completo <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
