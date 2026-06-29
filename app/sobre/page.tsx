import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Youtube, Instagram, Facebook, Zap, Target, Eye, Heart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.28 8.28 0 004.84 1.55V6.78a4.85 4.85 0 01-1.07-.09z" />
  </svg>
);

export const metadata: Metadata = {
  title: 'Sobre o GMATOSCAR',
  description:
    'Conheça o GMATOSCAR, o maior canal brasileiro sobre supercarros, hypercars e automóveis de alto desempenho.',
};

const stats = [
  { value: '500K+', label: 'Inscritos YouTube' },
  { value: '200K+', label: 'Seguidores Instagram' },
  { value: '300K+', label: 'Seguidores TikTok' },
  { value: '500+', label: 'Vídeos Publicados' },
];

const values = [
  {
    icon: Zap,
    title: 'Velocidade',
    desc: 'Notícias atualizadas em tempo real sobre o mundo dos supercarros.',
  },
  {
    icon: Target,
    title: 'Precisão',
    desc: 'Informações técnicas e dados verificados sobre cada modelo.',
  },
  {
    icon: Eye,
    title: 'Exclusividade',
    desc: 'Conteúdo único sobre os carros mais raros e exclusivos do mundo.',
  },
  {
    icon: Heart,
    title: 'Paixão',
    desc: 'Movidos pela paixão genuína pelos automóveis de alto desempenho.',
  },
];

const socialLinks = [
  { label: 'YouTube', href: 'https://youtube.com/@gmatoscar', icon: Youtube, color: '#FF0000', desc: 'Vídeos, reviews e test drives' },
  { label: 'Instagram', href: 'https://instagram.com/gmatoscar', icon: Instagram, color: '#E1306C', desc: 'Fotos exclusivas e stories' },
  { label: 'TikTok', href: 'https://tiktok.com/@gmatoscar', icon: TikTokIcon, color: '#FFFFFF', desc: 'Clipes curtos e tendências' },
  { label: 'Facebook', href: 'https://facebook.com/gmatoscar', icon: Facebook, color: '#1877F2', desc: 'Comunidade de fãs' },
];

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 sm:pt-36 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(148,163,184,0.08)_0%,transparent_60%)]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <p className="text-[#dc2626] text-xs font-bold uppercase tracking-[0.3em] font-rajdhani mb-4">
                Sobre nos
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-semibold text-[#111827] leading-tight mb-5 sm:mb-6">
                O Canal Referência em{' '}
                <span className="text-[#dc2626]">Supercarros</span> no Brasil
              </h1>
              <p className="text-[#4b5563] text-sm sm:text-base leading-relaxed font-exo mb-5 sm:mb-6">
                O GMATOSCAR nasceu da paixão por automóveis extraordinários. Desde o início, nosso objetivo é trazer para o público brasileiro o melhor conteúdo sobre supercarros, hypercars e automóveis de alto desempenho do mundo todo.
              </p>
              <p className="text-[#6b7280] text-sm sm:text-base leading-relaxed font-exo mb-7 sm:mb-8">
                Com uma comunidade apaixonada em crescimento, produzimos notícias, rankings, reviews e comparativos dos veículos mais incríveis do planeta — sempre com rigor técnico e paixão genuína pela velocidade.
              </p>
              <div className="w-20 h-1 bg-[#dc2626] rounded-full" />
            </div>

            <div className="relative">
              <div className="relative aspect-video rounded-sm overflow-hidden border border-[#dc2626]/20">
                <Image
                  src="/images/gmatoscar_canal_youtube_carros.png"
                  alt="GMATOSCAR"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-[#111827]/15" />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-3 -right-3 w-24 h-24 border border-[#dc2626]/20 rounded-sm" />
              <div className="absolute -bottom-3 -left-3 w-16 h-16 border border-[#dc2626]/10 rounded-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#f9fafb] border-y border-[#e5e7eb] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-rajdhani font-bold text-[#dc2626] mb-1">
                  {stat.value}
                </div>
                <div className="text-[#6b7280] text-xs uppercase tracking-widest font-exo">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#dc2626] text-xs font-bold uppercase tracking-[0.3em] font-rajdhani mb-3">
            Nossos Valores
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#111827]">
            O Que Nos Move
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.title}
                className="group bg-white border border-[#e5e7eb] hover:border-[#dc2626]/30 rounded-sm p-6 text-center transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-sm bg-[#dc2626]/10 border border-[#dc2626]/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#dc2626]/20 transition-colors">
                  <Icon size={22} className="text-[#dc2626]" />
                </div>
                <h3 className="font-rajdhani font-bold text-[#111827] text-lg mb-2">
                  {val.title}
                </h3>
                <p className="text-[#6b7280] text-sm font-exo leading-relaxed">{val.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Social links */}
      <section className="bg-[#f9fafb] border-t border-[#e5e7eb] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#dc2626] text-xs font-bold uppercase tracking-[0.3em] font-rajdhani mb-3">
              Nos Siga
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#111827] mb-4">
              Estamos em Todas as Plataformas
            </h2>
            <p className="text-[#6b7280] text-sm font-exo max-w-lg mx-auto">
              Acompanhe o GMATOSCAR nas suas redes favoritas e fique por dentro de todo o conteúdo sobre supercarros.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {socialLinks.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white border border-[#e5e7eb] hover:border-[#dc2626]/30 rounded-sm p-6 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(220,38,38,0.1)]"
                >
                  <span
                    className="mb-3 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: s.color }}
                  >
                    <Icon size={32} />
                  </span>
                  <h3 className="font-rajdhani font-bold text-[#111827] text-lg mb-1">{s.label}</h3>
                  <p className="text-[#6b7280] text-xs font-exo">{s.desc}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="bg-white border border-[#dc2626]/20 rounded-sm p-10 md:p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.05)_0%,transparent_70%)]" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-serif font-semibold text-[#111827] mb-4">
              Junte-se à Comunidade
            </h2>
            <p className="text-[#6b7280] text-base font-exo mb-8 max-w-lg mx-auto leading-relaxed">
              Faça parte da maior comunidade brasileira de fãs de supercarros. Conteúdo exclusivo todos os dias.
            </p>
            <a
              href="https://youtube.com/@gmatoscar"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine inline-flex items-center gap-3 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-rajdhani font-bold uppercase tracking-widest px-8 py-4 rounded-sm transition-all duration-300 text-sm shadow-[0_0_30px_rgba(220,38,38,0.3)]"
            >
              <Youtube size={18} />
              Inscrever-se no YouTube
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
