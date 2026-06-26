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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0a0a0a]/95 backdrop-blur-md shadow-[0_2px_20px_rgba(220,38,38,0.15)] border-b border-[#dc2626]/20'
          : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group flex-shrink-0">
            <div className="relative w-40 h-10 md:w-48 md:h-12">
              <Image
                src="/images/gmatoscar_canal_youtube_carros.png"
                alt="GMATOSCAR Supercarros"
                fill
                className="object-contain object-left transition-all duration-300 group-hover:brightness-110"
                priority
                sizes="(max-width: 768px) 160px, 192px"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-semibold uppercase tracking-widest font-rajdhani transition-all duration-300 group ${
                    isActive
                      ? 'text-[#dc2626]'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#dc2626] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-3/4'
                    }`}
                  />
                </Link>
              );
            })}
            <Link
              href="/pesquisa"
              className="ml-3 p-2 rounded-full border border-[#dc2626]/40 text-white/70 hover:text-white hover:border-[#dc2626] hover:bg-[#dc2626]/10 transition-all duration-300"
              aria-label="Pesquisar"
            >
              <Search size={16} />
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="bg-[#0d0d0d]/98 backdrop-blur-md border-t border-[#dc2626]/20 px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-rajdhani font-semibold uppercase tracking-widest text-sm transition-all duration-200 ${
                  isActive
                    ? 'text-[#dc2626] bg-[#dc2626]/10 border border-[#dc2626]/30'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] flex-shrink-0" />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
