import type { ReactNode } from 'react';

export function renderArticleContent(content: string) {
  const lines = content.replace(/\r\n/g, '\n').split('\n');

  const imageMarkdownRegex = /^!\[(.*?)\]\((https?:\/\/[^\s)]+)\)$/i;
  const imageUrlOnlyRegex = /^https?:\/\/\S+\.(?:png|jpe?g|webp|gif|avif)(?:\?\S*)?$/i;
  const inlineLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/gi;

  // Renderiza formatações inline (bold, itálico, código, strikethrough, links)
  const renderInlineParts = (value: string, lineIndex: number) => {
    const parts: ReactNode[] = [];
    let lastIdx = 0;

    // Regex para diferentes tipos de formatação inline
    const formattingRegex = /(\*\*\*(.+?)\*\*\*)|(\*\*(.+?)\*\*)|(__(.+?)__)|(\*(.+?)\*)|(^|[^_])_([^_]+?)_(?=[^_]|$)|(`([^`]+?)`)|(\~~(.+?)\~~)|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;

    let match;
    const allMatches: Array<{ index: number; length: number; type: string; content: string; href?: string }> = [];

    // Primeiro encontra todos os links
    const linkRegex = new RegExp(inlineLinkRegex.source, inlineLinkRegex.flags);
    let linkMatch = linkRegex.exec(value);
    while (linkMatch) {
      allMatches.push({
        index: linkMatch.index ?? 0,
        length: linkMatch[0].length,
        type: 'link',
        content: linkMatch[1],
        href: linkMatch[2],
      });
      linkMatch = linkRegex.exec(value);
    }

    // Depois encontra todas as outras formatações
    const otherRegex = /(\*\*\*([^*]+?)\*\*\*)|(\*\*([^*]+?)\*\*)|(__([^_]+?)__)|(\*([^*]+?)\*)|(_([^_]+?)_)|(`([^`]+?)`)|(\~~([^~]+?)\~~)/g;
    let otherMatch = otherRegex.exec(value);
    while (otherMatch) {
      const idx = otherMatch.index ?? 0;
      // Verifica se esta formatação não está dentro de um link
      const isInsideLink = allMatches.some(
        m => m.type === 'link' && idx >= m.index && idx < m.index + m.length
      );

      if (!isInsideLink) {
        if (otherMatch[1]) {
          // Bold + Italic: ***text***
          allMatches.push({
            index: idx,
            length: otherMatch[0].length,
            type: 'bolditalic',
            content: otherMatch[2],
          });
        } else if (otherMatch[3]) {
          // Bold: **text**
          allMatches.push({
            index: idx,
            length: otherMatch[0].length,
            type: 'bold',
            content: otherMatch[4],
          });
        } else if (otherMatch[5]) {
          // Bold with underscores: __text__
          allMatches.push({
            index: idx,
            length: otherMatch[0].length,
            type: 'bold',
            content: otherMatch[6],
          });
        } else if (otherMatch[7]) {
          // Italic: *text*
          allMatches.push({
            index: idx,
            length: otherMatch[0].length,
            type: 'italic',
            content: otherMatch[8],
          });
        } else if (otherMatch[9]) {
          // Italic with underscores: _text_
          allMatches.push({
            index: idx,
            length: otherMatch[0].length,
            type: 'italic',
            content: otherMatch[10],
          });
        } else if (otherMatch[11]) {
          // Inline code: `text`
          allMatches.push({
            index: idx,
            length: otherMatch[0].length,
            type: 'code',
            content: otherMatch[12],
          });
        } else if (otherMatch[13]) {
          // Strikethrough: ~~text~~
          allMatches.push({
            index: idx,
            length: otherMatch[0].length,
            type: 'strikethrough',
            content: otherMatch[14],
          });
        }
      }
      otherMatch = otherRegex.exec(value);
    }

    // Ordena matches pelo índice
    allMatches.sort((a, b) => a.index - b.index);

    // Remove matches sobrepostos (mantém o mais longo ou o primeiro)
    const sortedMatches: typeof allMatches = [];
    let lastEndIdx = 0;
    for (const m of allMatches) {
      if (m.index >= lastEndIdx) {
        sortedMatches.push(m);
        lastEndIdx = m.index + m.length;
      }
    }

    // Renderiza os matches
    sortedMatches.forEach((m, i) => {
      if (m.index > lastIdx) {
        parts.push(value.slice(lastIdx, m.index));
      }

      if (m.type === 'bold') {
        parts.push(
          <strong key={`bold-${lineIndex}-${i}`} className="font-bold">
            {m.content}
          </strong>
        );
      } else if (m.type === 'italic') {
        parts.push(
          <em key={`italic-${lineIndex}-${i}`} className="italic">
            {m.content}
          </em>
        );
      } else if (m.type === 'bolditalic') {
        parts.push(
          <strong key={`bolditalic-${lineIndex}-${i}`} className="font-bold italic">
            {m.content}
          </strong>
        );
      } else if (m.type === 'code') {
        parts.push(
          <code
            key={`code-${lineIndex}-${i}`}
            className="bg-[#f3f4f6] text-[#dc2626] px-2 py-1 rounded font-mono text-sm"
          >
            {m.content}
          </code>
        );
      } else if (m.type === 'strikethrough') {
        parts.push(
          <del key={`strikethrough-${lineIndex}-${i}`} className="line-through">
            {m.content}
          </del>
        );
      } else if (m.type === 'link') {
        parts.push(
          <a
            key={`link-${lineIndex}-${i}`}
            href={m.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#dc2626] underline underline-offset-2 hover:text-[#b91c1c]"
          >
            {m.content}
          </a>
        );
      }

      lastIdx = m.index + m.length;
    });

    if (lastIdx < value.length) {
      parts.push(value.slice(lastIdx));
    }

    return parts.length > 0 ? parts : value;
  };

  const nodes: ReactNode[] = [];
  let previousWasBlank = false;
  let inCodeBlock = false;
  let codeBlockContent = '';
  let codeBlockLanguage = '';
  let listItems: { type: 'ul' | 'ol'; items: string[] } | null = null;
  let blockquoteContent: string[] = [];

  const flushList = () => {
    if (listItems) {
      const key = `list-${nodes.length}`;
      if (listItems.type === 'ul') {
        nodes.push(
          <ul key={key} className="list-disc list-inside my-4 space-y-1 text-[#1f2937] font-exo">
            {listItems.items.map((item, i) => (
              <li key={`${key}-${i}`} className="ml-4">
                {renderInlineParts(item, nodes.length)}
              </li>
            ))}
          </ul>
        );
      } else {
        nodes.push(
          <ol key={key} className="list-decimal list-inside my-4 space-y-1 text-[#1f2937] font-exo">
            {listItems.items.map((item, i) => (
              <li key={`${key}-${i}`} className="ml-4">
                {renderInlineParts(item, nodes.length)}
              </li>
            ))}
          </ol>
        );
      }
      listItems = null;
    }
  };

  const flushBlockquote = () => {
    if (blockquoteContent.length > 0) {
      const key = `blockquote-${nodes.length}`;
      nodes.push(
        <blockquote
          key={key}
          className="border-l-4 border-[#dc2626] pl-4 py-2 my-4 italic text-[#4b5563] bg-[#f9fafb]"
        >
          {blockquoteContent.map((line, i) => (
            <div key={`${key}-${i}`} className="text-[#1f2937] font-exo">
              {renderInlineParts(line, nodes.length)}
            </div>
          ))}
        </blockquote>
      );
      blockquoteContent = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Handle code blocks
    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        inCodeBlock = false;
        const key = `codeblock-${index}`;
        nodes.push(
          <pre
            key={key}
            className="bg-[#111827] text-[#e5e7eb] p-4 rounded-lg overflow-x-auto my-4 font-mono text-sm"
          >
            <code>{codeBlockContent}</code>
          </pre>
        );
        codeBlockContent = '';
        codeBlockLanguage = '';
        return;
      } else {
        flushList();
        flushBlockquote();
        inCodeBlock = true;
        codeBlockLanguage = trimmed.slice(3).trim();
        return;
      }
    }

    if (inCodeBlock) {
      codeBlockContent += (codeBlockContent ? '\n' : '') + line;
      return;
    }

    // Handle blockquotes
    if (trimmed.startsWith('>')) {
      const blockquoteText = trimmed.slice(1).trim();
      blockquoteContent.push(blockquoteText);
      return;
    } else if (blockquoteContent.length > 0) {
      flushBlockquote();
    }

    // Handle empty lines
    if (!trimmed) {
      if (!previousWasBlank) {
        flushList();
        nodes.push(<div key={`sp-${index}`} className="h-2" />);
      }
      previousWasBlank = true;
      return;
    }

    previousWasBlank = false;

    // Handle unordered lists
    if (/^[-*+]\s+/.test(trimmed)) {
      flushBlockquote();
      const itemText = trimmed.replace(/^[-*+]\s+/, '');
      if (!listItems || listItems.type !== 'ul') {
        flushList();
        listItems = { type: 'ul', items: [] };
      }
      listItems.items.push(itemText);
      return;
    }

    // Handle ordered lists
    if (/^\d+\.\s+/.test(trimmed)) {
      flushBlockquote();
      const itemText = trimmed.replace(/^\d+\.\s+/, '');
      if (!listItems || listItems.type !== 'ol') {
        flushList();
        listItems = { type: 'ol', items: [] };
      }
      listItems.items.push(itemText);
      return;
    }

    // If we have any pending list or blockquote, flush them
    if (listItems || blockquoteContent.length > 0) {
      flushList();
      flushBlockquote();
    }

    // Handle bold subtitle (full line bold)
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

    // Handle headings
    const headingMatch = trimmed.match(/^(#{1,4})\s*(.+)$/);
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

    // Handle markdown images
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

    // Handle direct image URLs
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

    // Handle paragraphs
    nodes.push(
      <p key={`p-${index}`} className="text-[#1f2937] leading-[1.45] font-exo mb-3">
        {renderInlineParts(trimmed, index)}
      </p>
    );
  });

  // Flush any remaining list or blockquote
  flushList();
  flushBlockquote();

  return nodes;
}
