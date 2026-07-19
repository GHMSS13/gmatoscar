import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { brands } from '@/lib/data';

const featuredBrands = ['ferrari', 'lamborghini', 'porsche', 'bugatti', 'pagani', 'mclaren', 'koenigsegg'];
const countryFlags: Record<string, string> = {
  Italia: '🇮🇹',
  Franca: '🇫🇷',
  Alemanha: '🇩🇪',
  Suecia: '🇸🇪',
  'Reino Unido': '🇬🇧',
  Croacia: '🇭🇷',
};

export default function BrandsSection() {
  const items = brands.filter((brand) => featuredBrands.includes(brand.id));

  return (
    <section className="pt-3 pb-14 sm:py-20 bg-[#f9fafb] border-y border-[#e5e7eb]">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 mb-8 sm:mb-12">
          <div>
            <p className="text-[#dc2626] text-xs font-bold uppercase tracking-[0.3em] font-rajdhani mb-2">
              Fabricantes
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#111] red-line">
              Marcas Icônicas
            </h2>
          </div>
          <Link
            href="/marcas"
            className="hidden sm:flex items-center gap-2 text-sm text-[#6b7280] hover:text-[#dc2626] font-rajdhani uppercase tracking-wider transition-colors duration-300 group"
          >
            Ver Todas <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
          {items.map((brand) => (
            <Link
              key={brand.id}
              href={`/marcas/${brand.id}`}
              className="group rounded-sm border border-[#e5e7eb] bg-white hover:border-[#dc2626]/40 p-4 transition-all duration-300"
            >
              <div className="flex items-center gap-2">
                <p className="text-[#111827] font-rajdhani font-bold text-lg group-hover:text-[#dc2626] transition-colors line-clamp-1">
                  {brand.name}
                </p>
                <span className="text-sm leading-none" aria-label={`Bandeira de ${brand.country}`} title={brand.country}>
                  {countryFlags[brand.country] ?? '🌍'}
                </span>
              </div>
              <p className="text-[#6b7280] text-xs font-exo mt-2 line-clamp-2">
                {brand.description}
              </p>
              <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-rajdhani font-bold uppercase tracking-[0.2em] text-[#6b7280] group-hover:text-[#dc2626] transition-colors duration-300">
                Ver Marca
                <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
