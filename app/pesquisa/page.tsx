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
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <section className="relative pt-28 sm:pt-36 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(148,163,184,0.06)_0%,transparent_70%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <p className="text-[#dc2626] text-xs font-bold uppercase tracking-[0.3em] font-rajdhani mb-3">
            Pesquisar
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-[#111827] mb-6 leading-tight">
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
          <Filter size={14} className="text-[#9ca3af]" />
          <span className="text-[#9ca3af] text-xs font-exo uppercase tracking-widest">Filtrar por categoria</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-sm text-xs font-rajdhani font-bold uppercase tracking-widest transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-[#dc2626] text-white'
                  : 'bg-white border border-[#d1d5db] text-[#6b7280] hover:text-[#111827] hover:border-[#dc2626]/40'
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <p className="text-[#6b7280] text-sm font-exo leading-relaxed">
            {results.length === 0
              ? 'Nenhum resultado encontrado'
              : `${results.length} resultado${results.length !== 1 ? 's' : ''} encontrado${results.length !== 1 ? 's' : ''}`}
            {query && (
              <span className="text-[#6b7280]">
                {' '}para <span className="text-[#dc2626]">&quot;{query}&quot;</span>
              </span>
            )}
          </p>
          {(query || activeCategory !== 'Todos') && (
            <button
              onClick={() => { setQuery(''); setActiveCategory('Todos'); }}
              className="flex items-center gap-1.5 text-[#6b7280] hover:text-[#dc2626] text-xs font-exo transition-colors"
            >
              <X size={12} /> Limpar filtros
            </button>
          )}
        </div>

        {results.length === 0 ? (
          <div className="py-24 text-center">
            <Search size={48} className="text-[#d1d5db] mx-auto mb-4" />
            <h2 className="font-rajdhani font-bold text-[#111827] text-2xl mb-2">
              Nenhum resultado encontrado
            </h2>
            <p className="text-[#6b7280] font-exo text-sm">
              Tente pesquisar por outra marca ou modelo.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((item) => (
              <NewsCard key={item.id} item={item} theme="light" />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}

export default async function PesquisaPage() {
  const posts = await getPosts({ includePrivateModelPosts: true });

  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <PesquisaContent posts={posts} />
    </Suspense>
  );
}
