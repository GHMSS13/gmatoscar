import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Entre em contato com o GMATOSCAR para dúvidas, parcerias e assuntos editoriais.',
};

const contacts = [
  {
    title: 'Parcerias e publicidade',
    description: 'Solicitações comerciais, campanhas e projetos de marca.',
    email: 'contato@gmatoscar.com.br',
  },
  {
    title: 'Editorial e pauta',
    description: 'Sugestões de conteúdo, correções e temas para cobertura.',
    email: 'editorial@gmatoscar.com.br',
  },
  {
    title: 'Privacidade e dados',
    description: 'Solicitações relacionadas à LGPD e direitos do titular.',
    email: 'privacidade@gmatoscar.com.br',
  },
];

export default function ContatoPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <p className="text-[#dc2626] text-xs font-bold uppercase tracking-[0.3em] font-rajdhani mb-3">Institucional</p>
        <h1 className="text-4xl md:text-5xl font-serif font-semibold text-[#111827] mb-4">Contato</h1>
        <p className="text-[#4b5563] font-exo max-w-3xl leading-relaxed">
          Entre em contato com o GMATOSCAR para assuntos editoriais, comerciais e privacidade. Retornamos o mais
          breve possível.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {contacts.map((item) => (
            <article key={item.email} className="rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] p-5">
              <h2 className="text-xl font-rajdhani font-bold text-[#111827] mb-2">{item.title}</h2>
              <p className="text-sm text-[#6b7280] font-exo mb-4">{item.description}</p>
              <a href={`mailto:${item.email}`} className="text-[#dc2626] hover:text-[#b91c1c] text-sm font-semibold font-exo">
                {item.email}
              </a>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-[#e5e7eb] bg-white p-5 text-sm text-[#4b5563] font-exo leading-relaxed">
          Ao entrar em contato, você também pode consultar nossa{' '}
          <Link href="/politica-de-privacidade" className="text-[#dc2626] hover:text-[#b91c1c] font-semibold">
            Política de Privacidade
          </Link>{' '}
          e nossos{' '}
          <Link href="/termos-de-uso" className="text-[#dc2626] hover:text-[#b91c1c] font-semibold">
            Termos de Uso
          </Link>
          .
        </div>
      </section>

      <Footer />
    </main>
  );
}
