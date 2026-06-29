'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsCard from '@/components/NewsCard';
import SearchBar from '@/components/SearchBar';
import { categories } from '@/lib/data';
import { type Post, getPosts } from '@/lib/posts';

interface PesquisaContentProps {
  posts: Post[];
}

function PesquisaContent({ posts }: PesquisaContentProps) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';

  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [results, setResults] = useState<Post[]>(posts);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const q = query.toLowerCase().trim();
    let filtered = posts;

    if (q) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.excerpt.toLowerCase().includes(q) ||
          item.content.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.slug.toLowerCase().includes(q)
      );
    }

    if (activeCategory !== 'Todos') {
      filtered = filtered.filter((item) => item.category === activeCategory);
    }

    setResults(filtered);
  }, [query, activeCategory, posts]);

  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      {/* Header */}
      <section className="relative pt-36 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(148,163,184,0.06)_0%,transparent_70%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <p className="text-[#dc2626] text-xs font-bold uppercase tracking-[0.3em] font-rajdhani mb-3">
            Pesquisar
          </p>
          <h1 className="text-4xl md:text-5xl font-rajdhani font-bold text-white mb-6">
            Encontre seu Supercarro
          </h1>

          {/* Search input */}
          <div className="max-w-2xl">
            <SearchBar
              variant="default"
              defaultValue={initialQuery}
              onSearch={(q) => setQuery(q)}
            />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={14} className="text-white/30" />
          <span className="text-white/30 text-xs font-exo uppercase tracking-widest">Filtrar por categoria</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-sm text-xs font-rajdhani font-bold uppercase tracking-widest transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-[#dc2626] text-white'
                  : 'bg-[#111] border border-[#2a2a2a] text-white/40 hover:text-white hover:border-[#dc2626]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Results */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-white/30 text-sm font-exo">
            {results.length === 0
              ? 'Nenhum resultado encontrado'
              : `${results.length} resultado${results.length !== 1 ? 's' : ''} encontrado${results.length !== 1 ? 's' : ''}`}
            {query && (
              <span className="text-white/50">
                {' '}para <span className="text-[#dc2626]">&quot;{query}&quot;</span>
              </span>
            )}
          </p>
          {(query || activeCategory !== 'Todos') && (
            <button
              onClick={() => { setQuery(''); setActiveCategory('Todos'); }}
              className="flex items-center gap-1.5 text-white/30 hover:text-[#dc2626] text-xs font-exo transition-colors"
            >
              <X size={12} /> Limpar filtros
            </button>
          )}
        </div>

        {results.length === 0 ? (
          <div className="py-24 text-center">
            <Search size={48} className="text-white/10 mx-auto mb-4" />
            <h2 className="font-rajdhani font-bold text-white text-2xl mb-2">
              Nenhum resultado encontrado
            </h2>
            <p className="text-white/30 font-exo text-sm">
              Tente pesquisar por outra marca ou modelo.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}

export default async function PesquisaPage() {
  const posts = await getPosts();

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
      <PesquisaContent posts={posts} />
    </Suspense>
  );
}
