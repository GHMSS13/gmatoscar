"use client";

import type { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

type ComponentProps = {
  children?: ReactNode;
  href?: string;
  src?: string;
  alt?: string;
  inline?: boolean;
};

const standaloneImageUrlRegex = /^https?:\/\/\S+\.(?:png|jpe?g|webp|gif|avif)(?:\?\S*)?$/i;

function normalizeMarkdownContent(content: string) {
  return content
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => {
      const trimmed = line.trim();

      if (standaloneImageUrlRegex.test(trimmed)) {
        return `![](${trimmed})`;
      }

      return line;
    })
    .join('\n');
}

export default function MarkdownContent({ content }: { content: string }): ReactNode {
  const normalizedContent = normalizeMarkdownContent(content);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: ({ children }: ComponentProps) => (
          <h2 className="text-[#111827] font-exo font-bold !text-[1.62rem] sm:!text-[1.9rem] !leading-[1.13] tracking-[-0.005em] mt-7 mb-4">
            {children}
          </h2>
        ),
        h2: ({ children }: ComponentProps) => (
          <h3 className="text-[#111827] font-exo font-bold !text-[1.38rem] sm:!text-[1.55rem] !leading-[1.15] tracking-[-0.004em] mt-6 mb-3">
            {children}
          </h3>
        ),
        h3: ({ children }: ComponentProps) => (
          <h4 className="text-[#111827] font-exo font-bold !text-[1.08rem] sm:!text-[1.2rem] !leading-[1.2] mt-5 mb-2">
            {children}
          </h4>
        ),
        h4: ({ children }: ComponentProps) => (
          <h4 className="text-[#111827] font-exo font-bold !text-[1.02rem] sm:!text-[1.1rem] !leading-[1.2] mt-4 mb-2">
            {children}
          </h4>
        ),
        p: ({ children }: ComponentProps) => <p className="text-[#1f2937] leading-[1.55] font-exo mb-3 break-words">{children}</p>,
        a: ({ href, children }: ComponentProps) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#dc2626] underline underline-offset-2 hover:text-[#b91c1c] break-all"
          >
            {children}
          </a>
        ),
        strong: ({ children }: ComponentProps) => <strong className="font-bold text-[#111827]">{children}</strong>,
        em: ({ children }: ComponentProps) => <em className="italic">{children}</em>,
        del: ({ children }: ComponentProps) => <del className="line-through text-[#6b7280]">{children}</del>,
        code: ({ inline, children }: ComponentProps) =>
          inline ? (
            <code className="bg-[#f3f4f6] text-[#dc2626] px-1.5 py-0.5 rounded font-mono text-sm">
              {children}
            </code>
          ) : (
            <code className="block rounded-lg bg-[#111827] px-4 py-3 font-mono text-sm text-[#e5e7eb] overflow-x-auto">
              {children}
            </code>
          ),
        pre: ({ children }: ComponentProps) => <pre className="my-4">{children}</pre>,
        blockquote: ({ children }: ComponentProps) => (
          <blockquote className="border-l-4 border-[#dc2626] pl-4 py-2 my-4 italic text-[#4b5563] bg-[#f9fafb]">
            {children}
          </blockquote>
        ),
        ul: ({ children }: ComponentProps) => <ul className="list-disc list-inside my-4 space-y-1 text-[#1f2937] font-exo">{children}</ul>,
        ol: ({ children }: ComponentProps) => <ol className="list-decimal list-inside my-4 space-y-1 text-[#1f2937] font-exo">{children}</ol>,
        li: ({ children }: ComponentProps) => <li className="ml-4">{children}</li>,
        table: ({ children }: ComponentProps) => (
          <div className="overflow-x-auto my-4 -mx-1 px-1 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[520px] border-collapse border border-[#d1d5db] text-sm">{children}</table>
          </div>
        ),
        thead: ({ children }: ComponentProps) => <thead>{children}</thead>,
        tbody: ({ children }: ComponentProps) => <tbody>{children}</tbody>,
        tr: ({ children }: ComponentProps) => <tr className="even:bg-[#f9fafb] odd:bg-white">{children}</tr>,
        th: ({ children }: ComponentProps) => (
          <th className="border border-[#d1d5db] bg-[#f3f4f6] px-2.5 sm:px-4 py-2 text-left font-bold text-[#111827] whitespace-nowrap">
            {children}
          </th>
        ),
        td: ({ children }: ComponentProps) => <td className="border border-[#d1d5db] px-2.5 sm:px-4 py-2 text-[#1f2937] break-words">{children}</td>,
        img: ({ src, alt, width, height, style }: any) => {
          const imageAlt = alt || 'Imagem do artigo';
          const hasCustomSize = !!(width || height || (style && (style.width || style.height)));

          return (
            <figure className="my-5 w-full overflow-hidden rounded-xl border border-[#e5e7eb] bg-white text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src || ''}
                alt={imageAlt}
                className={hasCustomSize ? "inline-block max-w-full rounded-xl" : "block w-full h-[200px] sm:h-[280px] md:h-[360px] object-cover"}
                style={{
                  width: width || (style && style.width) || undefined,
                  height: height || (style && style.height) || undefined,
                  ...style
                }}
                loading="lazy"
              />
            </figure>
          );
        },
      }}
    >
      {normalizedContent}
    </ReactMarkdown>
  );
}