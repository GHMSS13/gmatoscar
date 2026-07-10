import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Isenção de Responsabilidade',
  description: 'Isenção de responsabilidade do GMATOSCAR sobre conteúdo editorial, links externos e publicidade.',
};

export default function IsencaoDeResponsabilidadePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <p className="text-[#dc2626] text-xs font-bold uppercase tracking-[0.3em] font-rajdhani mb-3">Institucional</p>
        <h1 className="text-4xl md:text-5xl font-serif font-semibold text-[#111827] mb-4">Isenção de Responsabilidade</h1>
        <p className="text-[#6b7280] font-exo text-sm">Última atualização: 09/07/2026</p>

        <div className="mt-10 space-y-8 text-[#1f2937] font-exo leading-relaxed">
          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">1. Conteúdo informativo</h2>
            <p>
              O conteúdo do GMATOSCAR é produzido para fins informativos e editoriais. Informações sobre preços,
              especificações e disponibilidade de veículos podem mudar sem aviso prévio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">2. Opiniões e análises</h2>
            <p>
              Opiniões publicadas no site refletem avaliações editoriais no momento da publicação e não constituem
              recomendação técnica, financeira ou comercial individualizada.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">3. Links externos</h2>
            <p>
              O site pode conter links para páginas de terceiros. Não nos responsabilizamos por conteúdo, políticas ou
              práticas desses sites externos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">4. Publicidade e monetização</h2>
            <p>
              Podemos exibir anúncios de parceiros, incluindo Google AdSense, e eventualmente conteúdos patrocinados,
              sempre identificados quando aplicável.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">5. Limitação de responsabilidade</h2>
            <p>
              Embora busquemos precisão e atualização constante, não garantimos ausência total de erros e não nos
              responsabilizamos por decisões tomadas exclusivamente com base nas informações publicadas no site.
            </p>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}
