import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: 'Política de cookies do GMATOSCAR, com categorias e finalidades de uso.',
};

export default function PoliticaDeCookiesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <p className="text-[#dc2626] text-xs font-bold uppercase tracking-[0.3em] font-rajdhani mb-3">Institucional</p>
        <h1 className="text-4xl md:text-5xl font-serif font-semibold text-[#111827] mb-4">Política de Cookies</h1>
        <p className="text-[#6b7280] font-exo text-sm">Última atualização: 09/07/2026</p>

        <div className="mt-10 space-y-8 text-[#1f2937] font-exo leading-relaxed">
          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">1. O que são cookies</h2>
            <p>
              Cookies são pequenos arquivos armazenados no navegador para lembrar preferências e melhorar a
              experiência no site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">2. Como usamos cookies</h2>
            <p>
              Utilizamos cookies essenciais para funcionamento, cookies de desempenho/medição e, mediante
              consentimento, cookies de publicidade para personalização de anúncios.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">3. Google AdSense</h2>
            <p>
              O Google AdSense pode usar cookies para exibir anúncios relevantes com base em navegação prévia do
              usuário.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">4. Gestão do consentimento</h2>
            <p>
              Você pode aceitar ou recusar cookies não essenciais no banner exibido no site. Também pode apagar ou
              bloquear cookies nas configurações do navegador.
            </p>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}
