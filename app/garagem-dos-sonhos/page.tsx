import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DesktopPageSearchBar from '@/components/DesktopPageSearchBar';
import NewsCard from '@/components/NewsCard';
import { getPostSection, getPosts } from '@/lib/posts';
import { SlidersHorizontal } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Garagem dos Sonhos | GMATOSCAR',
  description: 'Descubra seleções especiais com os carros dos sonhos para todo apaixonado por supercarros.',
};

export const dynamic = 'force-dynamic';

interface GaragemDosSonhosPageProps {
  searchParams?: {
    q?: string;
    theme?: string;
    brand?: string;
  };
}

const garageThemes = [
  { value: 'todos', label: 'Todos' },
  { value: 'luxo', label: 'Carros de Luxo' },
  { value: 'esportivos', label: 'Carros Esportivos' },
  { value: 'off-road', label: 'Off Road' },
] as const;

const garageBrandLinks = [
  { label: 'Todos', value: 'todos' },
  { label: 'Ferrari', value: 'ferrari' },
  { label: 'Lamborghini', value: 'lamborghini' },
  { label: 'Bugatti', value: 'bugatti' },
  { label: 'McLaren', value: 'mclaren' },
  { label: 'Porsche', value: 'porsche' },
  { label: 'Koenigsegg', value: 'koenigsegg' },
  { label: 'Pagani', value: 'pagani' },
] as const;

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function matchesGarageTheme(post: { title: string; excerpt: string; content: string; category: string; slug: string; garage_theme?: string | null }, theme: string) {
  if (!theme || theme === 'todos') {
    return true;
  }

  const normalizedGarageTheme = normalizeText(post.garage_theme ?? '');
  if (normalizedGarageTheme) {
    return normalizedGarageTheme === theme;
  }

  const searchable = normalizeText([
    post.title,
    post.excerpt,
    post.content,
    post.category,
    post.slug,
    post.garage_theme ?? '',
  ].join(' '));

  const themeKeywords: Record<string, string[]> = {
    luxo: ['luxo', 'premium', 'exclusivo', 'superluxo', 'de luxo', 'ultra luxuoso'],
    esportivos: ['esportivo', 'sport', 'gt', 'supercarro', 'sportscar', 'performance'],
    'off-road': ['off road', 'off-road', 'todo terreno', '4x4', 'suv', 'terrain', 'rally', 'fora de estrada'],
  };

  return (themeKeywords[theme] ?? []).some((keyword) => searchable.includes(normalizeText(keyword)));
}

function matchesGarageBrand(post: { title: string; excerpt: string; content: string; category: string; slug: string; garage_theme?: string | null }, brand: string) {
  if (!brand || brand === 'todos') {
    return true;
  }

  const searchable = normalizeText([post.title, post.slug].join(' '));

  return searchable.includes(normalizeText(brand));
}

export default async function GaragemDosSonhosPage({ searchParams }: GaragemDosSonhosPageProps) {
  const allPosts = await getPosts({ includePrivateModelPosts: true });
  const garagePosts = allPosts.filter((post) => getPostSection(post) === 'Garagem dos Sonhos');
  const query = (searchParams?.q ?? '').trim();
  const selectedTheme = (searchParams?.theme ?? 'todos').trim().toLowerCase();
  const selectedBrand = (searchParams?.brand ?? '').trim().toLowerCase();
  const normalizedQuery = normalizeText(query);

  const posts = garagePosts.filter((post) => {
    const matchesQuery = !normalizedQuery || normalizeText([
      post.title,
      post.excerpt,
    ].join(' ')).includes(normalizedQuery);

    const matchesTheme = matchesGarageTheme(post, selectedTheme);
    const matchesBrand = matchesGarageBrand(post, selectedBrand);

    return matchesQuery && matchesTheme && matchesBrand;
  });

  const buildThemeUrl = (themeValue: string) => {
    const params = new URLSearchParams();

    if (query) {
      params.set('q', query);
    }

    if (selectedBrand) {
      params.set('brand', selectedBrand);
    }

    if (themeValue !== 'todos') {
      params.set('theme', themeValue);
    }

    const suffix = params.toString();
    return suffix ? `/garagem-dos-sonhos?${suffix}` : '/garagem-dos-sonhos';
  };

  const buildBrandUrl = (brandValue: string) => {
    const params = new URLSearchParams();

    if (query) {
      params.set('q', query);
    }

    if (selectedTheme !== 'todos') {
      params.set('theme', selectedTheme);
    }

    if (brandValue !== 'todos') {
      params.set('brand', brandValue);
    }

    const suffix = params.toString();
    return suffix ? `/garagem-dos-sonhos?${suffix}` : '/garagem-dos-sonhos';
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <DesktopPageSearchBar
        action="/garagem-dos-sonhos"
        placeholder="Pesquise seleções, modelos ou temas da garagem..."
        defaultQuery={query}
        label="Garagem dos Sonhos"
        title="Os Carros Que Todo Entusiasta Gostaria de Ter"
        subtitle="Explore uma seleção de supercarros, carros esportivos, máquinas de competição e modelos extraordinários que marcaram a história e conquistaram um lugar na garagem dos sonhos dos apaixonados por carros."
        filterOptions={garageThemes.map((theme) => ({
          label: theme.label,
          value: theme.value,
          href: buildThemeUrl(theme.value),
        }))}
        activeFilterValue={selectedTheme}
      />

      <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 sm:gap-2.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {garageBrandLinks.map((brand) => {
              const isActive = selectedBrand === brand.value || (brand.value === 'todos' && !selectedBrand);

              return (
                <Link
                  key={brand.label}
                  href={buildBrandUrl(brand.value)}
                  className={[
                    'shrink-0 inline-flex whitespace-nowrap rounded-sm border px-4 py-1.5 text-xs font-rajdhani font-bold uppercase tracking-widest transition-colors duration-200',
                    isActive
                      ? 'border-[#dc2626] bg-[#dc2626] text-white shadow-sm'
                      : 'border-[#e5e7eb] bg-[#fafafa] text-[#111827] hover:border-[#dc2626]/35 hover:text-[#dc2626] hover:bg-white',
                  ].join(' ')}
                >
                  {brand.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto">
          {posts.length === 0 ? (
            <div className="rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-6 text-sm font-exo text-[#4b5563]">
              Nenhum resultado encontrado para o termo ou filtro selecionado.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {posts.map((post) => (
                <NewsCard key={post.id} item={post} theme="light" sourcePath="/garagem-dos-sonhos" />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
