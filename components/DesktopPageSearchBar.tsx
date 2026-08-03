import { Search } from 'lucide-react';

interface DesktopPageSearchBarProps {
  action: string;
  placeholder: string;
  defaultQuery?: string;
  label?: string;
  title: string;
  subtitle: string;
}

export default function DesktopPageSearchBar({
  action,
  placeholder,
  defaultQuery = '',
  label = 'Pesquisar',
  title,
  subtitle,
}: DesktopPageSearchBarProps) {
  return (
    <section className="pt-20 sm:pt-24 border-b border-[#e5e7eb] bg-[radial-gradient(ellipse_at_top,rgba(15,23,42,0.05)_0%,rgba(255,255,255,1)_70%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-5 sm:pb-6">
        <p className="text-[#bc2a1f] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.34em] font-rajdhani">
          {label}
        </p>
        <h1 className="mt-2 text-[2rem] sm:text-[2.1rem] lg:text-[2.3rem] font-serif font-semibold text-[#111827] leading-[1.08]">
          {title}
        </h1>
        <p className="mt-2 text-[14px] sm:text-[15px] lg:text-[16px] font-exo leading-[1.55] text-[#374151] max-w-[980px]">
          {subtitle}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-5 sm:pb-6">
        <form action={action} method="get" className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b7280]"
              aria-hidden="true"
            />
            <input
              type="text"
              name="q"
              defaultValue={defaultQuery}
              placeholder={placeholder}
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
  );
}
