import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { brands } from '@/lib/data';

const featuredBrands = ['ferrari', 'lamborghini', 'porsche', 'bugatti', 'pagani', 'mclaren', 'koenigsegg'];

export default function BrandsSection() {
  const items = brands.filter((brand) => featuredBrands.includes(brand.id));

  return (
    <section className="py-14 sm:py-20 bg-[#0d0d0d] border-y border-[#1e1e1e]">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 mb-8 sm:mb-12">
          <div>
            <p className="text-[#dc2626] text-xs font-bold uppercase tracking-[0.3em] font-rajdhani mb-2">
              Fabricantes
            </p>
            <h2 className="text-3xl md:text-4xl font-rajdhani font-bold text-white red-line">
              Marcas Icônicas
            </h2>
          </div>
          <Link
            href="/marcas"
            className="hidden sm:flex items-center gap-2 text-sm text-white/40 hover:text-[#dc2626] font-rajdhani uppercase tracking-wider transition-colors duration-300 group"
          >
            Ver Todas <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
          {items.map((brand) => (
            <Link
              key={brand.id}
              href={`/marcas/${brand.id}`}
              className="group rounded-sm border border-[#1e1e1e] bg-[#111] hover:border-[#dc2626]/40 p-4 transition-all duration-300"
            >
              <p className="text-white font-rajdhani font-bold text-lg group-hover:text-[#dc2626] transition-colors line-clamp-1">
                {brand.name}
              </p>
              <p className="text-white/45 text-xs font-exo mt-2 line-clamp-2">
                {brand.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
