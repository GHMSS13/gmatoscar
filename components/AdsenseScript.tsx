'use client';

import { useEffect, useState } from 'react';

const CONSENT_KEY = 'gmatoscar_cookie_consent';

function shouldLoadAdsense() {
  if (typeof window === 'undefined') return false;
  const consent = window.localStorage.getItem(CONSENT_KEY);
  return consent === 'granted';
}

function buildScriptSrc(clientId: string) {
  return `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
}

export default function AdsenseScript() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const handleConsentUpdate = () => setEnabled(shouldLoadAdsense());

    setEnabled(shouldLoadAdsense());
    window.addEventListener('cookie-consent-updated', handleConsentUpdate);

    return () => {
      window.removeEventListener('cookie-consent-updated', handleConsentUpdate);
    };
  }, []);

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
    if (!enabled || !clientId) return;

    const src = buildScriptSrc(clientId);
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = src;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }, [enabled]);

  return null;
}