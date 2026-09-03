'use client';

import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface GarageBrandOption {
  label: string;
  href: string;
  isActive: boolean;
}

interface GarageBrandCarouselProps {
  brands: GarageBrandOption[];
}

function chipClassName(isActive: boolean) {
  return [
    'shrink-0 inline-flex whitespace-nowrap rounded-sm border px-4 py-1.5 text-xs font-rajdhani font-bold uppercase tracking-widest transition-colors duration-200',
    isActive
      ? 'border-[#dc2626] bg-[#dc2626] text-white shadow-sm'
      : 'border-[#e5e7eb] bg-[#fafafa] text-[#111827] hover:border-[#dc2626]/35 hover:text-[#dc2626] hover:bg-white',
  ].join(' ');
}

export default function GarageBrandCarousel({ brands }: GarageBrandCarouselProps) {
  return (
    <div className="rounded-xl border border-[#f3d6d6] bg-[#fff8f8] p-3 shadow-[0_2px_10px_rgba(220,38,38,0.06)] sm:border-[#e5e7eb] sm:bg-white sm:p-4 sm:shadow-none">
      <div className="relative px-9 sm:px-11 lg:hidden">
        <Carousel opts={{ align: 'start', loop: false }} className="w-full">
          <CarouselContent className="-ml-2">
            {brands.map((brand) => (
              <CarouselItem key={brand.label} className="basis-auto pl-2">
                <Link href={brand.href} className={chipClassName(brand.isActive)}>
                  {brand.label}
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-9 sm:-left-11 h-8 w-8 border-[#dc2626]/40 bg-white text-[#dc2626] hover:bg-white hover:border-[#dc2626]" />
          <CarouselNext className="-right-9 sm:-right-11 h-8 w-8 border-[#dc2626]/40 bg-white text-[#dc2626] hover:bg-white hover:border-[#dc2626]" />
        </Carousel>
      </div>

      <div className="hidden lg:flex lg:flex-wrap lg:items-center lg:justify-center lg:gap-2.5">
        {brands.map((brand) => (
          <Link key={`${brand.label}-desktop`} href={brand.href} className={chipClassName(brand.isActive)}>
            {brand.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
