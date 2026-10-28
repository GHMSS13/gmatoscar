'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const GA_ID = 'G-G5MSRJXEDY';
const CONSENT_KEY = 'gmatoscar_cookie_consent';

declare global {
  interface Window {
    dataLayer: IArguments[];
    gtag: (...args: unknown[]) => void;
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [consentGranted, setConsentGranted] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const updateConsent = () => {
      setConsentGranted(window.localStorage.getItem(CONSENT_KEY) === 'granted');
    };

    updateConsent();
    window.addEventListener('cookie-consent-updated', updateConsent);
    return () => window.removeEventListener('cookie-consent-updated', updateConsent);
  }, []);

  useEffect(() => {
    if (!consentGranted) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { send_page_view: false });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    script.dataset.googleAnalytics = GA_ID;
    document.head.appendChild(script);
    setInitialized(true);

    return () => {
      script.remove();
      setInitialized(false);
    };
  }, [consentGranted]);

  useEffect(() => {
    if (!consentGranted || !initialized) return;

    window.gtag('event', 'page_view', {
      page_path: `${pathname}${searchParams.toString() ? `?${searchParams}` : ''}`,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [consentGranted, initialized, pathname, searchParams]);

  return null;
}
