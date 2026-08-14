import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DesktopPageSearchBar from '@/components/DesktopPageSearchBar';
import { brands } from '@/lib/data';

const targetBrandIds = ['ferrari', 'lamborghini', 'porsche', 'bugatti', 'pagani', 'mclaren', 'koenigsegg'];
const seoBrands = brands.filter((brand) => targetBrandIds.includes(brand.id));

export const metadata: Metadata = {
  title: 'Marcas de Supercarros',
  description:
    'Páginas editoriais sobre Ferrari, Lamborghini, Porsche, Bugatti, Pagani, McLaren e Koenigsegg com foco em SEO.',
  keywords: [
    'ferrari',
    'lamborghini',
    'porsche',
    'bugatti',
    'pagani',
    'mclaren',
    'koenigsegg',
    'marcas de supercarros',
  ],
  alternates: {
    canonical: '/marcas',
  },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Marcas de Supercarros',
  description: 'Hub editorial das marcas mais relevantes de supercarros.',
  url: 'https://gmatoscar.com.br/marcas',
  mainEntity: seoBrands.map((brand) => ({
    '@type': 'Brand',
    name: brand.name,
    url: `https://gmatoscar.com.br/marcas/${brand.id}`,
  })),
};

interface MarcasPageProps {
  searchParams?: {
    q?: string;
  };
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export default function MarcasPage({ searchParams }: MarcasPageProps) {
  const query = (searchParams?.q ?? '').trim();
  const normalizedQuery = normalizeText(query);

  const filteredBrands = seoBrands.filter((brand) => {
    if (!normalizedQuery) {
      return true;
    }

    const searchable = normalizeText(
      [brand.name, brand.country, brand.description, brand.topModel].join(' ')
    );

    return searchable.includes(normalizedQuery);
  });

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Navbar />

      <DesktopPageSearchBar
        action="/marcas"
        placeholder="Pesquise marcas, países ou modelos icônicos..."
        defaultQuery={query}
        label="Marcas"
        title="Marcas de Supercarros"
        subtitle="Conheça a história das maiores marcas de supercarros do mundo, suas origens, curiosidades, evolução, modelos mais importantes e os carros que ajudaram a construir seu legado."
      />

      <section className="px-4 sm:px-6 lg:px-8 pb-20 max-w-7xl mx-auto">
        {filteredBrands.length === 0 ? (
          <div className="rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-6 text-sm font-exo text-[#4b5563]">
            Nenhuma marca encontrada para o termo pesquisado.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBrands.map((brand) => (
              <Link
                key={brand.id}
                href={`/marcas/${brand.id}`}
                className="rounded-2xl border border-[#e5e7eb] bg-white p-5 sm:p-6 hover:border-[#dc2626]/50 transition-colors"
              >
                <p className="text-[#dc2626] text-xs uppercase tracking-[0.35em] font-bold font-rajdhani mb-2">
                  {brand.country}
                </p>
                <h2 className="text-3xl font-rajdhani font-bold text-[#111827] mb-3">
                  {brand.name}
                </h2>
                <p className="text-[#6b7280] text-sm font-exo leading-relaxed mb-5">
                  {brand.description}
                </p>
                <div className="flex items-center justify-between text-xs font-exo text-[#9ca3af]">
                  <span>Fundada em {brand.founded}</span>
                  <span className="text-[#dc2626] font-rajdhani font-bold uppercase tracking-wider">Ver página</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
