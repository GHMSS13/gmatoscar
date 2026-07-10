import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description: 'Termos de uso do site GMATOSCAR.',
};

export default function TermosDeUsoPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <p className="text-[#dc2626] text-xs font-bold uppercase tracking-[0.3em] font-rajdhani mb-3">Institucional</p>
        <h1 className="text-4xl md:text-5xl font-serif font-semibold text-[#111827] mb-4">Termos de Uso</h1>
        <p className="text-[#6b7280] font-exo text-sm">Última atualização: 09/07/2026</p>

        <div className="mt-10 space-y-8 text-[#1f2937] font-exo leading-relaxed">
          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">1. Aceitação dos termos</h2>
            <p>
              Ao acessar e utilizar o site GMATOSCAR, você concorda com estes Termos de Uso e com a legislação
              aplicável.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">2. Finalidade do conteúdo</h2>
            <p>
              O conteúdo possui caráter informativo e editorial sobre o universo automotivo, podendo incluir opiniões,
              análises e comparativos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">3. Propriedade intelectual</h2>
            <p>
              Textos, identidade visual e demais materiais originais do site são protegidos por direitos autorais. É
              proibida reprodução sem autorização prévia.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">4. Limitação de responsabilidade</h2>
            <p>
              Buscamos manter as informações atualizadas, mas não garantimos ausência de erros ou mudanças de mercado
              após publicação.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">5. Publicidade e parceiros</h2>
            <p>
              O site pode exibir publicidade de terceiros, incluindo Google AdSense, e conteúdos patrocinados quando
              identificados.
            </p>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}
