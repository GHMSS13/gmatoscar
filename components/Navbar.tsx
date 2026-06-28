'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search } from 'lucide-react';
import SearchBar from './SearchBar';

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

  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-[#050505] border-b border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.25)]`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="text-lg md:text-xl font-bold uppercase tracking-[0.4em] text-white font-rajdhani">
            GMATOS
            <span className="text-[#dc2626]">CAR</span>
          </Link>

          <nav className="hidden lg:flex flex-1 items-center justify-center gap-10 text-sm font-semibold uppercase tracking-[0.28em] font-rajdhani">
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

          <div className="flex items-center gap-3 relative">
            <button
              onClick={() => setShowSearch((state) => !state)}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-white/80 hover:bg-white/10 transition-colors"
              aria-label={showSearch ? 'Fechar pesquisa' : 'Abrir pesquisa'}
            >
              <Search size={18} />
            </button>

            <div className={`absolute right-0 top-full z-50 mt-2 w-[calc(100vw-2rem)] max-w-sm rounded-2xl border border-white/10 bg-[#050505]/95 p-3 shadow-[0_20px_80px_rgba(0,0,0,0.35)] transition-all duration-300 backdrop-blur-sm ${showSearch ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'}`}>
              <SearchBar variant="inline" />
            </div>

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
