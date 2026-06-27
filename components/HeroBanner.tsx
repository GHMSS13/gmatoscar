'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Zap, Trophy, Car } from 'lucide-react';
import SearchBar from './SearchBar';

export default function HeroBanner() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background: full-screen banner image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/gmatoscar_canal_youtube_carros.png"
          alt="GMATOSCAR Supercarros"
          fill
          className="object-cover object-center opacity-40"
          priority
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/50 to-[#0a0a0a]" />
        {/* Red vignette left */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(220,38,38,0.15)_0%,transparent_60%)]" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 z-0 grid-pattern opacity-30" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 max-w-5xl mx-auto pt-24 pb-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#dc2626]/15 border border-[#dc2626]/40 rounded-full px-4 py-1.5 mb-8 animate-fade-in">
          <Zap size={14} className="text-[#dc2626]" fill="currentColor" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#dc2626] font-rajdhani">
            Canal de Supercarros
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-rajdhani font-bold uppercase tracking-tight mb-4 animate-fade-in-up leading-none">
          <span className="text-white">GMATOS</span>
          <span className="text-[#dc2626]">CAR</span>
        </h1>

        <p className="text-lg md:text-2xl font-rajdhani font-semibold uppercase tracking-[0.3em] text-white/50 mb-4 animate-fade-in-up">
          Supercarros
        </p>

        <p className="text-base md:text-lg text-white/60 max-w-2xl mb-10 leading-relaxed font-exo animate-fade-in-up">
          O maior canal brasileiro sobre supercarros, hypercars e carros de luxo.
          Notícias, rankings e conteúdo exclusivo sobre os carros mais incríveis do mundo.
        </p>

        {/* Search bar */}
        <div className="w-full max-w-2xl mb-12 animate-fade-in-up">
          <SearchBar variant="hero" />
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 animate-fade-in-up">
          <div className="flex flex-col items-center">
            <Car size={22} className="text-[#dc2626] mb-2" />
            <span className="text-2xl font-bold font-rajdhani text-white">200+</span>
            <span className="text-xs text-white/40 uppercase tracking-widest font-exo">Modelos</span>
          </div>
          <div className="w-px h-10 bg-white/10 hidden md:block" />
          <div className="flex flex-col items-center">
            <Trophy size={22} className="text-[#dc2626] mb-2" />
            <span className="text-2xl font-bold font-rajdhani text-white">50+</span>
            <span className="text-xs text-white/40 uppercase tracking-widest font-exo">Rankings</span>
          </div>
          <div className="w-px h-10 bg-white/10 hidden md:block" />
          <div className="flex flex-col items-center">
            <Zap size={22} className="text-[#dc2626] mb-2" />
            <span className="text-2xl font-bold font-rajdhani text-white">500+</span>
            <span className="text-xs text-white/40 uppercase tracking-widest font-exo">Notícias</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-12 animate-fade-in-up">
          <Link
            href="/marcas"
            className="btn-shine relative inline-flex items-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-rajdhani font-bold uppercase tracking-widest px-8 py-3.5 rounded-sm transition-all duration-300 text-sm shadow-[0_0_20px_rgba(220,38,38,0.4)]"
          >
            Explorar Marcas
          </Link>
          <Link
            href="/ranking"
            className="inline-flex items-center gap-2 border border-white/20 hover:border-[#dc2626]/60 text-white/80 hover:text-white font-rajdhani font-bold uppercase tracking-widest px-8 py-3.5 rounded-sm transition-all duration-300 text-sm hover:bg-[#dc2626]/10"
          >
            Ver Ranking
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-white/30 uppercase tracking-widest font-rajdhani">Scroll</span>
        <ChevronDown size={20} className="text-[#dc2626]" />
      </div>

      {/* Bottom red line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#dc2626]/60 to-transparent" />
    </section>
  );
}
