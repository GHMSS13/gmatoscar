import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { brands } from '@/lib/data';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

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
    <section className="pt-2 pb-12 sm:py-16 bg-[#f9fafb] border-y border-[#e5e7eb]">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2.5 mb-6 sm:mb-9">
          <div>
            <p className="text-[#dc2626] text-[11px] font-bold uppercase tracking-[0.28em] font-rajdhani mb-1.5">
              Pagina Marcas
            </p>
            <h2 className="text-[1.95rem] sm:text-4xl font-serif font-semibold text-[#111] red-line leading-[1.04]">
              Marcas em Destaque
            </h2>
          </div>
          <Link
            href="/marcas"
            className="hidden sm:flex items-center gap-2 text-sm text-[#6b7280] hover:text-[#dc2626] font-rajdhani uppercase tracking-wider transition-colors duration-300 group"
          >
            Ver Todas <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <Carousel opts={{ align: 'start', loop: true }} className="w-full">
          <CarouselContent>
            {items.map((brand) => (
              <CarouselItem key={brand.id} className="basis-full sm:basis-1/2 lg:basis-1/4">
                <Link
                  href={`/marcas/${brand.id}`}
                  className="group relative block rounded-sm overflow-hidden border border-[#e5e7eb] bg-white hover:border-[#dc2626]/40 transition-all duration-300 h-[300px] sm:h-[320px]"
                >
                  <div className="absolute inset-0">
                    <Image
                      src={brand.topModelImage}
                      alt={brand.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
                  </div>

                  <div className="relative h-full p-4 sm:p-5 flex flex-col justify-end">
                    <div className="inline-flex items-center gap-2 mb-2.5">
                      <span className="text-sm leading-none" aria-label={`Bandeira de ${brand.country}`} title={brand.country}>
                        {countryFlags[brand.country] ?? '🌍'}
                      </span>
                      <p className="text-white/80 text-[10px] font-rajdhani font-bold uppercase tracking-[0.16em]">
                        {brand.country}
                      </p>
                    </div>
                    <h3 className="text-white font-rajdhani font-bold text-[2rem] sm:text-[2.2rem] leading-none mb-2 group-hover:text-[#ffb4b4] transition-colors line-clamp-1">
                      {brand.name}
                    </h3>
                    <p className="text-white/75 text-[13px] sm:text-sm leading-relaxed font-exo line-clamp-2 mb-3.5">
                      {brand.description}
                    </p>
                    <div className="inline-flex items-center gap-1 text-xs font-rajdhani font-bold uppercase tracking-[0.2em] text-white group-hover:text-[#ffd4d4] transition-colors duration-300">
                      Ver Marca
                      <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-3 sm:-left-4 bg-white border-[#e5e7eb] hover:bg-white" />
          <CarouselNext className="-right-3 sm:-right-4 bg-white border-[#e5e7eb] hover:bg-white" />
        </Carousel>
      </div>
    </section>
  );
}
