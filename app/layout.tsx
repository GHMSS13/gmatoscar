import type { Metadata } from 'next';
import { Exo_2, Rajdhani } from 'next/font/google';
import './globals.css';
import AuthRedirectHandler from '@/components/AuthRedirectHandler';
import CookieConsentBanner from '@/components/CookieConsentBanner';
import AdsenseScript from '@/components/AdsenseScript';

const exo = Exo_2({
  weight: 'variable',
  subsets: ['latin'],
  variable: '--font-exo-2',
  display: 'swap',
});

const rajdhani = Rajdhani({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-rajdhani',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.gmatoscar.com.br'),
  title: {
    default: 'GMATOSCAR Supercarros - Os Melhores Supercarros do Mundo',
    template: '%s | GMATOSCAR Supercarros',
  },
  description:
    'GMATOSCAR é o seu canal de referência para supercarros, hypercars e carros de luxo. Notícias, rankings, marcas e tudo sobre o mundo dos carros mais incríveis do mundo.',
  keywords: [
    'supercarros',
    'hypercars',
    'carros de luxo',
    'Ferrari',
    'Lamborghini',
    'McLaren',
    'Bugatti',
    'Porsche',
    'GMATOSCAR',
    'carros esportivos',
    'carros rápidos',
  ],
  authors: [{ name: 'GMATOSCAR', url: 'https://gmatoscar.com.br' }],
  creator: 'GMATOSCAR',
  publisher: 'GMATOSCAR',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://www.gmatoscar.com.br',
    siteName: 'GMATOSCAR Supercarros',
    title: 'GMATOSCAR Supercarros - Os Melhores Supercarros do Mundo',
    description:
      'Notícias, rankings e conteúdo sobre os supercarros mais incríveis do planeta.',
    images: [
      {
        url: '/images/gmatoscar_canal_youtube_carros.png',
        width: 1280,
        height: 720,
        alt: 'GMATOSCAR Supercarros',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GMATOSCAR Supercarros',
    description: 'Notícias e rankings dos melhores supercarros do mundo.',
    images: ['/images/gmatoscar_canal_youtube_carros.png'],
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
};

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'GMATOSCAR Supercarros',
  url: 'https://www.gmatoscar.com.br',
  description:
    'O melhor canal sobre supercarros, hypercars e carros de luxo do Brasil.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.gmatoscar.com.br/pesquisa?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
  sameAs: [
    'https://youtube.com/@gmatoscar',
    'https://instagram.com/gmatoscar',
    'https://tiktok.com/@gmatoscar',
    'https://facebook.com/gmatoscar',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className={`${exo.variable} ${rajdhani.variable} bg-white text-[#111] antialiased font-exo`}>
        <AuthRedirectHandler />
        <AdsenseScript />
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  );
}
