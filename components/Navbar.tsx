'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Search } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Marcas', href: '/marcas' },
  { label: 'Ranking', href: '/ranking' },
  { label: 'Pesquisa', href: '/pesquisa' },
  { label: 'Sobre', href: '/sobre' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-[#050505]/95 backdrop-blur-sm border-b border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.25)]'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-36 h-12 md:w-44 md:h-14">
              <Image
                src="/images/gmatoscar_canal_youtube_carros.png"
                alt="GMATOSCAR Supercarros"
                fill
                className="object-contain object-left transition-all duration-300 group-hover:brightness-110"
                priority
                sizes="(max-width: 768px) 140px, 176px"
              />
            </div>
            <span className="hidden md:inline-block text-xs uppercase tracking-[0.45em] font-bold text-white/70 font-rajdhani">
              Supercarros
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold uppercase tracking-[0.28em] font-rajdhani">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative transition-all duration-300 ${
                    isActive ? 'text-[#dc2626]' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute left-0 right-0 bottom-[-6px] mx-auto h-0.5 rounded-full bg-[#dc2626] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/pesquisa"
              className="hidden md:inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] font-semibold text-white/80 transition-all duration-300 hover:border-[#dc2626] hover:text-white hover:bg-[#dc2626]/10"
            >
              Buscar
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full bg-white/5 text-white/80 hover:bg-white/10 transition-colors"
              aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="bg-[#050505]/98 border-t border-white/10 px-4 py-4 flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.28em] transition-all duration-200 ${
                  isActive
                    ? 'bg-[#dc2626]/10 text-[#dc2626]'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/pesquisa"
            className="mt-2 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm uppercase tracking-[0.3em] font-semibold text-white/80 hover:border-[#dc2626] hover:text-white hover:bg-[#dc2626]/10 transition-all duration-200"
          >
            Buscar
          </Link>
        </nav>
      </div>
    </header>
  );
}
