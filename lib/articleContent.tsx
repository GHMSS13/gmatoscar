import type { ReactNode } from 'react';

export function renderArticleContent(content: string) {
  const lines = content.replace(/\r\n/g, '\n').split('\n');

  const imageMarkdownRegex = /^!\[(.*?)\]\((https?:\/\/[^\s)]+)\)$/i;
  const imageUrlOnlyRegex = /^https?:\/\/\S+\.(?:png|jpe?g|webp|gif|avif)(?:\?\S*)?$/i;
  const inlineLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/gi;

  const renderInlineParts = (value: string, lineIndex: number) => {
    const parts: ReactNode[] = [];
    let lastIdx = 0;

    const linkRegex = new RegExp(inlineLinkRegex.source, inlineLinkRegex.flags);
    let match = linkRegex.exec(value);

    while (match) {
      const text = match[1];
      const href = match[2];
      const start = match.index ?? 0;

      if (start > lastIdx) {
        parts.push(value.slice(lastIdx, start));
      }

      parts.push(
        <a
          key={`link-${lineIndex}-${start}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#dc2626] underline underline-offset-2 hover:text-[#b91c1c]"
        >
          {text}
        </a>
      );

      lastIdx = start + match[0].length;
      match = linkRegex.exec(value);
    }

    if (lastIdx < value.length) {
      parts.push(value.slice(lastIdx));
    }

    return parts.length > 0 ? parts : value;
  };

  const nodes: ReactNode[] = [];
  let previousWasBlank = false;

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      if (!previousWasBlank) {
        nodes.push(<div key={`sp-${index}`} className="h-2" />);
      }
      previousWasBlank = true;
      return;
    }

    previousWasBlank = false;

    const boldSubtitleMatch = trimmed.match(/^(?:\*\*|__)(.+?)(?:\*\*|__)$/);
    if (boldSubtitleMatch) {
      nodes.push(
        <h3
          key={`hb-${index}`}
          className="text-[#111827] font-exo font-bold !text-[1.3rem] sm:!text-[1.5rem] !leading-[1.15] tracking-[-0.003em] mt-6 mb-3"
        >
          {renderInlineParts(boldSubtitleMatch[1].trim(), index)}
        </h3>
      );

      return;
    }

    const headingMatch = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const headingText = headingMatch[2].trim();

      if (level === 1) {
        nodes.push(
          <h2
            key={`h1-${index}`}
            className="text-[#111827] font-exo font-bold !text-[1.62rem] sm:!text-[1.9rem] !leading-[1.13] tracking-[-0.005em] mt-7 mb-4"
          >
            {renderInlineParts(headingText, index)}
          </h2>
        );
      } else if (level === 2) {
        nodes.push(
          <h3
            key={`h2-${index}`}
            className="text-[#111827] font-exo font-bold !text-[1.38rem] sm:!text-[1.55rem] !leading-[1.15] tracking-[-0.004em] mt-6 mb-3"
          >
            {renderInlineParts(headingText, index)}
          </h3>
        );
      } else {
        nodes.push(
          <h4
            key={`h3-${index}`}
            className="text-[#111827] font-exo font-bold !text-[1.08rem] sm:!text-[1.2rem] !leading-[1.2] mt-5 mb-2"
          >
            {renderInlineParts(headingText, index)}
          </h4>
        );
      }

      return;
    }

    const markdownImg = trimmed.match(imageMarkdownRegex);
    if (markdownImg) {
      const alt = markdownImg[1] || 'Imagem do artigo';
      const src = markdownImg[2];

      nodes.push(
        <figure
          key={`img-md-${index}`}
          className="my-5 w-full overflow-hidden rounded-xl border border-[#e5e7eb] bg-white"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="block w-full h-[220px] sm:h-[280px] md:h-[360px] object-cover"
            loading="lazy"
          />
          {alt ? <figcaption className="px-4 py-3 text-xs text-[#6b7280] font-exo">{alt}</figcaption> : null}
        </figure>
      );

      return;
    }

    if (imageUrlOnlyRegex.test(trimmed)) {
      nodes.push(
        <figure
          key={`img-url-${index}`}
          className="my-5 w-full overflow-hidden rounded-xl border border-[#e5e7eb] bg-white"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={trimmed}
            alt="Imagem do artigo"
            className="block w-full h-[220px] sm:h-[280px] md:h-[360px] object-cover"
            loading="lazy"
          />
        </figure>
      );

      return;
    }

    nodes.push(
      <p key={`p-${index}`} className="text-[#1f2937] leading-[1.45] font-exo mb-3">
        {renderInlineParts(trimmed, index)}
      </p>
    );
  });

  return nodes;
}
