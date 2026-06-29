import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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

export default function MarcasPage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Navbar />

      <section className="relative pt-28 pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-15" />
        <div className="relative z-10">
          <p className="text-[#dc2626] text-xs font-bold uppercase tracking-[0.3em] font-rajdhani mb-3">
            Fase 1
          </p>
          <h1 className="text-4xl md:text-6xl font-serif font-semibold text-[#111827] mb-4">
            Hub de Marcas para SEO
          </h1>
          <p className="text-[#4b5563] text-sm sm:text-base md:text-lg max-w-3xl font-exo leading-relaxed">
            Esta página concentra as marcas estratégicas para ranqueamento orgânico e distribui autoridade para as páginas individuais de cada fabricante.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {seoBrands.map((brand) => (
            <Link
              key={brand.id}
              href={`/marcas/${brand.id}`}
              className="rounded-2xl border border-[#e5e7eb] bg-white p-6 hover:border-[#dc2626]/50 transition-colors"
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
      </section>

      <Footer />
    </main>
  );
}
