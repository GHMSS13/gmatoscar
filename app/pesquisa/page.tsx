'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsCard from '@/components/NewsCard';
import { type Post, getPostSection, getPosts } from '@/lib/posts';

interface PesquisaContentProps {
  posts: Post[];
}

const searchCategories = ['Todos', 'Notícias', 'Marcas', 'Rankings', 'Carros'] as const;
type SearchCategory = (typeof searchCategories)[number];

const searchCategorySections: Record<Exclude<SearchCategory, 'Todos'>, ReturnType<typeof getPostSection>> = {
  'Notícias': 'Noticias',
  'Marcas': 'Marcas',
  'Rankings': 'Rankings',
  'Carros': 'Garagem dos Sonhos',
};

function PesquisaContent({ posts }: PesquisaContentProps) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';

  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<SearchCategory>('Todos');
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
          item.excerpt.toLowerCase().includes(q)
      );
    }

    if (activeCategory !== 'Todos') {
      const section = searchCategorySections[activeCategory];
      filtered = filtered.filter((item) => getPostSection(item) === section);
    }

    setResults(filtered);
  }, [query, activeCategory, posts]);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-20 sm:pt-24 bg-[radial-gradient(ellipse_at_top,rgba(15,23,42,0.05)_0%,rgba(255,255,255,1)_70%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-5 sm:pb-6">
          <p className="text-[#bc2a1f] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.34em] font-rajdhani">
            Pesquisar
          </p>
          <h1 className="mt-2 text-[2rem] sm:text-[2.1rem] lg:text-[2.3rem] font-serif font-semibold text-[#111827] leading-[1.08]">
            Encontre seu Supercarro
          </h1>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-5 sm:pb-6">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setQuery(query.trim());
            }}
            className="flex flex-col sm:flex-row sm:items-center gap-3"
          >
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b7280]"
                aria-hidden="true"
              />
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Pesquise por marcas, modelos ou categorias..."
                className="h-11 sm:h-12 w-full rounded-full border border-[#d1d5db] bg-white pl-11 sm:pl-12 pr-5 text-[14px] sm:text-[15px] leading-none font-exo text-[#111827] placeholder:text-[#6b7280] outline-none transition-colors duration-300 focus:border-[#dc2626]/60"
              />
            </div>
            <button
              type="submit"
              className="h-11 sm:h-12 w-full sm:w-auto rounded-xl bg-[#dc2626] px-5 text-[13px] sm:text-[14px] leading-none font-rajdhani font-bold uppercase tracking-[0.08em] text-white transition-colors duration-300 hover:bg-[#b91c1c]"
            >
              Buscar
            </button>
          </form>
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={14} className="text-[#9ca3af]" />
          <span className="text-[#9ca3af] text-xs font-exo uppercase tracking-widest">Filtrar por categoria</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {searchCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-sm text-xs font-rajdhani font-bold uppercase tracking-widest transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-[#dc2626] text-white'
                  : 'bg-white border border-[#d1d5db] text-[#111827] hover:border-[#dc2626]/40'
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
              <NewsCard key={item.id} item={item} theme="light" sourcePath="/pesquisa" />
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
