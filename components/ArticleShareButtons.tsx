'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Share2, MessageCircle, Facebook, Copy, ChevronDown } from 'lucide-react';

interface Props {
  title: string;
  slug: string;
}

export default function ArticleShareButtons({ title, slug }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const shareUrl = useMemo(() => {
    const cleanSlug = slug.trim().replace(/^\/+|\/+$/g, '');
    return `https://gmatoscar.com.br/noticias/${encodeURIComponent(cleanSlug)}`;
  }, [slug]);

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const whatsappUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
  const xUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const canUseNativeShare = typeof navigator !== 'undefined' && Boolean(navigator.share);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current) return;

      if (event.target instanceof Node && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
      setIsOpen(false);
    } catch {
      setIsOpen(false);
    }
  };

  const handleNativeShare = async () => {
    if (!navigator.share) {
      return;
    }

    try {
      await navigator.share({
        title,
        url: shareUrl,
      });
      setIsOpen(false);
    } catch {
      // User cancelled native share.
    }
  };

  return (
    <div ref={wrapperRef} className="relative ml-0 w-full sm:ml-auto sm:w-auto">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex w-full sm:w-auto justify-center sm:justify-start items-center gap-1.5 rounded-full border border-[#e5e7eb] bg-white px-3 py-1.5 text-xs font-exo text-[#4b5563] hover:border-[#dc2626]/40 hover:text-[#dc2626] transition-colors"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Abrir opcoes de compartilhamento"
      >
        <Share2 size={14} />
        <span className="hidden sm:inline">Compartilhar</span>
        <ChevronDown size={12} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {copied ? (
        <span className="absolute -bottom-7 right-0 text-[11px] font-exo text-[#16a34a]">Link copiado</span>
      ) : null}

      {isOpen ? (
        <div className="absolute left-0 sm:left-auto sm:right-0 top-full z-20 mt-2 w-full sm:w-[240px] rounded-xl border border-[#e5e7eb] bg-white p-2 shadow-lg">
          {canUseNativeShare ? (
            <button
              type="button"
              onClick={handleNativeShare}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-exo text-[#374151] hover:bg-[#f9fafb]"
            >
              <Share2 size={14} /> Compartilhar no dispositivo
            </button>
          ) : null}

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-exo text-[#374151] hover:bg-[#f9fafb]"
            aria-label="Compartilhar no WhatsApp"
          >
            <MessageCircle size={14} /> WhatsApp
          </a>

          <a
            href={xUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-exo text-[#374151] hover:bg-[#f9fafb]"
            aria-label="Compartilhar no X"
          >
            <Share2 size={14} /> X
          </a>

          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-exo text-[#374151] hover:bg-[#f9fafb]"
            aria-label="Compartilhar no Facebook"
          >
            <Facebook size={14} /> Facebook
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-exo text-[#374151] hover:bg-[#f9fafb]"
            aria-label="Copiar link do artigo"
          >
            <Copy size={14} /> Copiar link
          </button>
        </div>
      ) : null}
    </div>
  );
}
