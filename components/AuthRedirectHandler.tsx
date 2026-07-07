'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const ADMIN_REDIRECT_STORAGE_KEY = 'gmatoscar-admin-redirect';
const ADMIN_REDIRECT_TTL_MS = 10 * 60 * 1000;

interface PendingRedirect {
  path: string;
  createdAt: number;
}

const readPendingRedirect = (): PendingRedirect | null => {
  const rawValue = window.localStorage.getItem(ADMIN_REDIRECT_STORAGE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(rawValue) as PendingRedirect;

    if (
      typeof parsedValue.path !== 'string' ||
      typeof parsedValue.createdAt !== 'number' ||
      Date.now() - parsedValue.createdAt > ADMIN_REDIRECT_TTL_MS
    ) {
      window.localStorage.removeItem(ADMIN_REDIRECT_STORAGE_KEY);
      return null;
    }

    return parsedValue;
  } catch {
    window.localStorage.removeItem(ADMIN_REDIRECT_STORAGE_KEY);
    return null;
  }
};

const clearPendingRedirect = () => {
  window.localStorage.removeItem(ADMIN_REDIRECT_STORAGE_KEY);
};

const hasOAuthTokensInHash = () => {
  const hashValue = window.location.hash;
  if (!hashValue) {
    return false;
  }

  return /access_token=|refresh_token=|provider_token=/.test(hashValue);
};

export default function AuthRedirectHandler() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const syncRedirectWithSession = async () => {
      const pendingRedirect = readPendingRedirect();

      if (!pendingRedirect) {
        // Fallback: if OAuth lands on home (/#...) without pending localStorage,
        // still push the user to /admin after successful sign-in.
        if (pathname !== '/admin' && hasOAuthTokensInHash()) {
          router.replace('/admin');
        }
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        return;
      }

      if (pathname === pendingRedirect.path) {
        clearPendingRedirect();
        return;
      }

      router.replace(pendingRedirect.path);
    };

    syncRedirectWithSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const pendingRedirect = readPendingRedirect();

      if (!pendingRedirect || !session?.user) {
        if (pathname !== '/admin' && session?.user && hasOAuthTokensInHash()) {
          router.replace('/admin');
        }
        return;
      }

      if (pathname === pendingRedirect.path) {
        clearPendingRedirect();
        return;
      }

      router.replace(pendingRedirect.path);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [pathname, router]);

  return null;
}