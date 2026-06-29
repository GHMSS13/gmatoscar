'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  variant?: 'hero' | 'default' | 'inline';
  defaultValue?: string;
  onSearch?: (query: string) => void;
}

export default function SearchBar({
  variant = 'default',
  defaultValue = '',
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    if (onSearch) {
      onSearch(trimmed);
    } else {
      router.push(`/pesquisa?q=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleClear = () => {
    setQuery('');
    if (onSearch) onSearch('');
  };

  if (variant === 'hero') {
    return (
      <form onSubmit={handleSubmit} className="relative group">
        <div className="relative flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0">
          <Search
            size={18}
            className="absolute left-5 top-4 sm:top-1/2 sm:-translate-y-1/2 text-white/40 group-focus-within:text-[#dc2626] transition-colors duration-300 z-10"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquise por marcas, modelos, categorias..."
            className="w-full bg-white/5 backdrop-blur-sm border border-white/15 focus:border-[#dc2626]/60 text-white placeholder-white/30 pl-12 pr-4 sm:pr-32 py-4 rounded-sm outline-none transition-all duration-300 font-exo text-sm focus:bg-white/8 focus:shadow-[0_0_20px_rgba(220,38,38,0.15)]"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-4 sm:top-1/2 sm:-translate-y-1/2 sm:right-24 text-white/30 hover:text-white/70 transition-colors"
            >
              <X size={16} />
            </button>
          )}
          <button
            type="submit"
            className="w-full sm:absolute sm:right-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-rajdhani font-bold uppercase tracking-widest px-5 py-3 sm:py-2.5 rounded-sm transition-all duration-300 text-xs"
          >
            Buscar
          </button>
        </div>
      </form>
    );
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className="relative">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af] pointer-events-none"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pesquisar..."
          className="w-full bg-white border border-[#d1d5db] focus:border-[#dc2626]/50 text-[#111827] placeholder-[#9ca3af] pl-10 pr-4 py-2.5 rounded-sm outline-none transition-all duration-300 font-exo text-sm"
        />
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative group">
      <div className="relative flex items-center">
        <Search
          size={18}
          className="absolute left-4 text-[#9ca3af] group-focus-within:text-[#dc2626] transition-colors duration-300"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pesquisar supercarros..."
          className="w-full bg-white border border-[#d1d5db] focus:border-[#dc2626]/50 text-[#111827] placeholder-[#9ca3af] pl-11 pr-28 py-3 rounded-sm outline-none transition-all duration-300 font-exo text-sm"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-24 text-[#9ca3af] hover:text-[#4b5563] transition-colors"
          >
            <X size={15} />
          </button>
        )}
        <button
          type="submit"
          className="absolute right-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-rajdhani font-bold uppercase tracking-widest px-4 py-1.5 rounded-sm transition-all duration-300 text-xs"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}
