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

export default function AuthRedirectHandler() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const syncRedirectWithSession = async () => {
      const pendingRedirect = readPendingRedirect();

      if (!pendingRedirect) {
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