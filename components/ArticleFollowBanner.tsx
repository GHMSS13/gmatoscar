import Image from 'next/image';
import { Youtube, Instagram, Facebook } from 'lucide-react';

const PROFILE_IMAGE_SRC = '/images/gmatoscar_profile.jpg?v=1';

const TikTokIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.28 8.28 0 004.84 1.55V6.78a4.85 4.85 0 01-1.07-.09z" />
  </svg>
);

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://facebook.com/gmatoscar',
    icon: Facebook,
    hoverClass: 'hover:text-[#1877F2] hover:border-[#1877F2]/30',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/gmatoscar',
    icon: Instagram,
    hoverClass: 'hover:text-[#E1306C] hover:border-[#E1306C]/30',
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com/@gmatoscar',
    icon: TikTokIcon,
    hoverClass: 'hover:text-[#111827] hover:border-[#111827]/30',
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@gmatoscar',
    icon: Youtube,
    hoverClass: 'hover:text-[#FF0000] hover:border-[#FF0000]/30',
  },
];

export default function ArticleFollowBanner() {
  return (
    <div className="my-5 rounded-2xl border border-[#e5e7eb] bg-white p-4">
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative h-11 w-11 overflow-hidden rounded-full border border-[#e5e7eb] bg-white shrink-0">
            <Image
              src={PROFILE_IMAGE_SRC}
              alt="Perfil GMATOSCAR"
              fill
              sizes="44px"
              className="object-cover"
            />
          </div>

          <p className="text-[#111827] font-rajdhani font-bold uppercase tracking-[0.12em] text-sm sm:text-base">
            Siga o GMATOSCAR
          </p>
        </div>

        <div className="flex items-center gap-2 sm:ml-auto">
          {socialLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Seguir no ${item.label}`}
                className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#4b5563] transition-colors ${item.hoverClass}`}
              >
                <Icon size={14} />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
