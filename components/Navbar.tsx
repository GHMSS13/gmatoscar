'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search } from 'lucide-react';
import SearchBar from './SearchBar';

const navLinks = [
  { label: 'Início', href: '/' },
  { label: 'Artigos', href: '/noticias' },
  { label: 'Sobre', href: '/sobre' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-[#050505] border-b border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.25)]`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          <Link href="/" className="text-base sm:text-xl md:text-[1.32rem] lg:text-2xl font-bold uppercase tracking-[0.18em] sm:tracking-[0.32em] md:tracking-[0.2em] lg:tracking-[0.32em] text-white font-rajdhani whitespace-nowrap">
            GMATOS
            <span className="text-[#dc2626]">CAR</span>
          </Link>

          <nav className="hidden md:flex flex-1 items-center justify-end md:px-6 lg:pl-0 lg:pr-10 gap-4 lg:gap-10 text-[10px] lg:text-sm font-semibold uppercase tracking-[0.12em] lg:tracking-[0.28em] font-rajdhani">
            {navLinks.map((link) => {
              const isActive = isActiveLink(link.href);
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

          <div className="flex items-center gap-2 sm:gap-3 relative">
            <button
              type="button"
              onClick={() => {
                setIsSearchOpen((open) => !open);
                setIsOpen(false);
              }}
              className={`inline-flex items-center justify-center rounded-full border bg-white/5 p-1.5 sm:p-2 transition-colors ${
                isSearchOpen || isActiveLink('/pesquisa')
                  ? 'border-[#dc2626] text-white/80'
                  : 'border-white/10 text-white/80 hover:bg-white/10'
              }`}
              aria-label={isSearchOpen ? 'Fechar pesquisa' : 'Abrir pesquisa'}
              aria-expanded={isSearchOpen}
              aria-controls="header-search"
            >
              {isSearchOpen ? <X size={18} /> : <Search size={18} />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-1.5 sm:p-2 rounded-full bg-white/5 text-white/80 hover:bg-white/10 transition-colors"
              aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <div
          id="header-search"
          className="absolute right-4 top-full z-[60] mt-2 w-[calc(100vw-2rem)] rounded-xl border border-white/10 bg-[#050505] p-3 shadow-[0_16px_40px_rgba(0,0,0,0.35)] sm:right-6 sm:w-96 lg:right-8"
        >
          <SearchBar variant="default" autoFocus />
        </div>
      )}

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="bg-[#050505]/98 border-t border-white/10 px-3 sm:px-4 py-3 sm:py-4 flex flex-col gap-1.5 sm:gap-2">
          {navLinks.map((link) => {
            const isActive = isActiveLink(link.href);
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
        </nav>
      </div>
    </header>
  );
}
