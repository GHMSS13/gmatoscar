'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ArticleBackButtonProps {
  fallbackHref?: string;
  compact?: boolean;
  floating?: boolean;
}

export default function ArticleBackButton({
  fallbackHref = '/',
  compact = false,
  floating = false,
}: ArticleBackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window === 'undefined') {
      router.push(fallbackHref);
      return;
    }

    const hasHistory = window.history.length > 1;
    const hasInternalReferrer =
      typeof document !== 'undefined' &&
      document.referrer.startsWith(window.location.origin);

    if (hasHistory || hasInternalReferrer) {
      router.back();
      return;
    }

    router.push(fallbackHref);
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label="Voltar para a página anterior"
      className={[
        'group inline-flex items-center justify-center transition-all',
        compact
          ? 'h-11 w-11 rounded-full border border-black/10 bg-white text-[#111827] shadow-md hover:bg-[#f9fafb] hover:shadow-lg'
          : 'gap-3 rounded-full bg-white/10 px-2 py-1.5 text-white/90 ring-1 ring-white/30 hover:bg-white/15 hover:text-white hover:ring-white/55',
        floating ? 'hidden md:inline-flex fixed left-4 top-1/2 z-50 -translate-y-1/2 md:left-6 md:h-12 md:w-12' : '',
      ].join(' ')}
    >
      {compact ? (
        <ArrowLeft size={18} />
      ) : (
        <>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/35 bg-black/20 transition-colors group-hover:border-white/60">
            <ArrowLeft size={15} />
          </span>
          <span className="pr-2 text-[11px] font-bold uppercase tracking-[0.24em] font-rajdhani">Voltar</span>
        </>
      )}
    </button>
  );
}
