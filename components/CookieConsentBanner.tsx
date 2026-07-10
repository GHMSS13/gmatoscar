'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const CONSENT_KEY = 'gmatoscar_cookie_consent';

type ConsentStatus = 'granted' | 'denied' | null;

function readConsent(): ConsentStatus {
  if (typeof window === 'undefined') return null;
  const value = window.localStorage.getItem(CONSENT_KEY);
  if (value === 'granted' || value === 'denied') return value;
  return null;
}

export default function CookieConsentBanner() {
  const [consent, setConsent] = useState<ConsentStatus>(null);

  useEffect(() => {
    setConsent(readConsent());
  }, []);

  function setCookieConsent(status: Exclude<ConsentStatus, null>) {
    window.localStorage.setItem(CONSENT_KEY, status);
    setConsent(status);
    window.dispatchEvent(
      new CustomEvent('cookie-consent-updated', {
        detail: { status },
      })
    );
  }

  if (consent) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] px-3 pb-3 sm:px-6 sm:pb-6">
      <div className="mx-auto max-w-5xl rounded-2xl border border-[#fecaca] bg-white p-4 shadow-[0_20px_60px_rgba(0,0,0,0.25)] sm:p-5">
        <p className="text-[#111827] text-sm font-exo leading-relaxed">
          Usamos cookies para melhorar a navegação, medir audiência e exibir anúncios relevantes pelo Google AdSense.
          Ao clicar em "Aceitar", você concorda com o uso de cookies para personalização quando aplicável.
          Leia nossa{' '}
          <Link href="/politica-de-privacidade" className="text-[#dc2626] hover:text-[#b91c1c] font-semibold">
            Política de Privacidade
          </Link>{' '}
          e{' '}
          <Link href="/politica-de-cookies" className="text-[#dc2626] hover:text-[#b91c1c] font-semibold">
            Política de Cookies
          </Link>
          .
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setCookieConsent('granted')}
            className="rounded-full bg-[#dc2626] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#b91c1c]"
          >
            Aceitar
          </button>
          <button
            type="button"
            onClick={() => setCookieConsent('denied')}
            className="rounded-full border border-[#d1d5db] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#374151] transition-colors hover:bg-[#f9fafb]"
          >
            Recusar
          </button>
        </div>
      </div>
    </div>
  );
}