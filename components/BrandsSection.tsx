import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Globe } from 'lucide-react';
import { brands } from '@/lib/data';

export default function BrandsSection() {
  const preview = brands.slice(0, 6);

  return (
    <section className="py-20 bg-[#0d0d0d] border-y border-[#1e1e1e]">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
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

        {/* Brands grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {preview.map((brand) => (
            <Link
              key={brand.id}
              href={`/marcas/${brand.id}`}
              className="group relative bg-[#111] border border-[#1e1e1e] hover:border-[#dc2626]/40 rounded-sm overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(220,38,38,0.15)]"
            >
              {/* Car image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={brand.topModelImage}
                  alt={`${brand.topModel} ${brand.name}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/40 to-transparent" />
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-rajdhani font-bold text-white text-base group-hover:text-[#dc2626] transition-colors duration-300 mb-1">
                  {brand.name}
                </h3>
                <div className="flex items-center gap-1 text-white/30 text-xs font-exo mb-2">
                  <Globe size={10} />
                  <span>{brand.country}</span>
                </div>
                <p className="text-[10px] text-white/20 font-exo uppercase tracking-wider">
                  {brand.topModel}
                </p>
              </div>

              {/* Red left accent on hover */}
              <div className="absolute top-0 left-0 w-0.5 h-full bg-[#dc2626] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
            </Link>
          ))}
        </div>

        {/* Mobile link */}
        <div className="sm:hidden mt-8 text-center">
          <Link
            href="/marcas"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-[#dc2626] font-rajdhani uppercase tracking-wider transition-colors"
          >
            Ver Todas as Marcas <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
