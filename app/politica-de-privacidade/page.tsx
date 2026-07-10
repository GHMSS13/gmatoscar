import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Política de privacidade do GMATOSCAR, com informações sobre coleta, uso e proteção de dados.',
};

export default function PoliticaDePrivacidadePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <p className="text-[#dc2626] text-xs font-bold uppercase tracking-[0.3em] font-rajdhani mb-3">Institucional</p>
        <h1 className="text-4xl md:text-5xl font-serif font-semibold text-[#111827] mb-4">Política de Privacidade</h1>
        <p className="text-[#6b7280] font-exo text-sm">Última atualização: 09/07/2026</p>

        <div className="mt-10 space-y-8 text-[#1f2937] font-exo leading-relaxed">
          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">1. Informações gerais</h2>
            <p>
              Esta Política de Privacidade descreve como o GMATOSCAR coleta, utiliza e protege dados de visitantes em
              nosso site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">2. Dados que podem ser coletados</h2>
            <p>
              Podemos coletar dados de navegação, como páginas visitadas, tempo de permanência e interações com
              conteúdo, além de dados fornecidos voluntariamente em canais de contato.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">3. Uso de cookies e tecnologias similares</h2>
            <p>
              Utilizamos cookies para melhorar a experiência do usuário, analisar desempenho do site e, quando
              autorizado, exibir publicidade com parceiros como o Google AdSense.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">4. Publicidade com Google AdSense</h2>
            <p>
              O Google pode usar cookies para exibir anúncios com base em visitas anteriores dos usuários a este e a
              outros sites. Você pode gerenciar preferências de personalização nas configurações de anúncios do Google.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">5. Compartilhamento de dados</h2>
            <p>
              Não vendemos dados pessoais. Dados podem ser compartilhados com provedores técnicos e parceiros de
              medição/publicidade, conforme necessário para operação do site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">6. Direitos do titular</h2>
            <p>
              Nos termos da LGPD, você pode solicitar confirmação de tratamento, acesso, correção e exclusão de dados
              pessoais, quando aplicável.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">7. Contato</h2>
            <p>
              Para solicitações sobre privacidade, utilize a página de contato do site.
            </p>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}