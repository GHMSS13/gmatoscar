import Link from 'next/link';
import { Youtube, Instagram, Facebook } from 'lucide-react';

const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.28 8.28 0 004.84 1.55V6.78a4.85 4.85 0 01-1.07-.09z" />
  </svg>
);

const socialLinks = [
  {
    label: 'YouTube',
    href: 'https://youtube.com/@gmatoscar',
    icon: Youtube,
    color: '#FF0000',
    followers: '500K+',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/gmatoscar',
    icon: Instagram,
    color: '#E1306C',
    followers: '200K+',
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com/@gmatoscar',
    icon: TikTokIcon,
    color: '#FFFFFF',
    followers: '300K+',
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/gmatoscar',
    icon: Facebook,
    color: '#1877F2',
    followers: '150K+',
  },
];

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Marcas', href: '/marcas' },
  { label: 'Pesquisa', href: '/pesquisa' },
  { label: 'Sobre', href: '/sobre' },
];

const categories = [
  { label: 'Ferrari', href: '/pesquisa?q=ferrari' },
  { label: 'Lamborghini', href: '/pesquisa?q=lamborghini' },
  { label: 'Bugatti', href: '/pesquisa?q=bugatti' },
  { label: 'McLaren', href: '/pesquisa?q=mclaren' },
  { label: 'Porsche', href: '/pesquisa?q=porsche' },
  { label: 'Koenigsegg', href: '/pesquisa?q=koenigsegg' },
];

const legalLinks = [
  { label: 'Contato', href: '/contato' },
  { label: 'Política de Privacidade', href: '/politica-de-privacidade' },
  { label: 'Política de Cookies', href: '/politica-de-cookies' },
  { label: 'Termos de Uso', href: '/termos-de-uso' },
  { label: 'Isenção de Responsabilidade', href: '/isencao-de-responsabilidade' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0d0d0d] border-t border-[#1e1e1e]">
      {/* Social strip */}
      <div className="bg-[#111] border-b border-[#1e1e1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <p className="text-white/40 text-sm font-exo">
              Siga o GMATOSCAR nas redes sociais:
            </p>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#222] border border-[#2a2a2a] hover:border-[#dc2626]/30 rounded-sm px-3 py-2 transition-all duration-300 group"
                  >
                    <span style={{ color: s.color }} className="transition-transform duration-300 group-hover:scale-110">
                      <Icon size={16} />
                    </span>
                    <span className="text-white/50 group-hover:text-white/80 text-xs font-rajdhani font-semibold hidden sm:block transition-colors">
                      {s.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-5 text-xl sm:text-2xl font-bold uppercase tracking-[0.18em] sm:tracking-[0.32em] text-white font-rajdhani whitespace-nowrap">
              GMATOS
              <span className="text-[#dc2626]">CAR</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-sm font-exo">
              GMATOSCAR é um portal brasileiro dedicado a supercarros, hipercarros e ao universo automotivo. Descubra curiosidades, notícias, rankings e histórias dos carros mais incríveis do mundo.
            </p>

            {/* Social icons large */}
            <div className="flex flex-wrap items-center gap-3">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-10 h-10 flex items-center justify-center rounded-sm bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#dc2626]/50 text-white/40 hover:text-white transition-all duration-300 hover:shadow-[0_0_10px_rgba(220,38,38,0.2)]"
                    style={{ '--hover-color': s.color } as React.CSSProperties}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-rajdhani font-bold uppercase tracking-[0.2em] text-white text-sm mb-5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-[#dc2626]" />
              Navegação
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/40 hover:text-[#dc2626] text-sm font-exo transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-[#dc2626] group-hover:w-3 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-rajdhani font-bold uppercase tracking-[0.2em] text-white text-sm mb-5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-[#dc2626]" />
              Marcas
            </h4>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="text-white/40 hover:text-[#dc2626] text-sm font-exo transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-[#dc2626] group-hover:w-3 transition-all duration-300" />
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-rajdhani font-bold uppercase tracking-[0.2em] text-white text-sm mb-5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-[#dc2626]" />
              Institucional
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/40 hover:text-[#dc2626] text-sm font-exo transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-[#dc2626] group-hover:w-3 transition-all duration-300" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1e1e1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
          <p className="text-white/25 text-xs font-exo text-center sm:text-left">
            &copy; {year} GMATOSCAR Supercarros. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#dc2626] animate-pulse" />
            <span className="text-white/25 text-xs font-exo">Powered by passion for supercars</span>
          </div>
        </div>
      </div>

      {/* Red gradient line at very bottom */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#dc2626] to-transparent" />
    </footer>
  );
}
