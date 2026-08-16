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
        <p className="text-[#6b7280] font-exo text-sm">Última atualização: 16/08/2026</p>

        <div className="mt-10 space-y-8 text-[#1f2937] font-exo leading-relaxed">
          <section>
            <p>Esta Política de Cookies explica como o <strong>GMATOSCAR</strong> utiliza cookies e tecnologias semelhantes em seu site, disponível em <strong>gmatoscar.com.br</strong>.</p>
            <p className="mt-4">Nosso objetivo é proporcionar uma experiência de navegação adequada, compreender como os visitantes utilizam o site, melhorar nossos conteúdos e, quando aplicável, disponibilizar publicidade e outros recursos.</p>
            <p className="mt-4">Ao continuar navegando pelo GMATOSCAR, determinados cookies poderão ser armazenados no seu dispositivo, de acordo com suas preferências e com as configurações de consentimento disponíveis no site.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">1. O que são cookies?</h2>
            <p>Cookies são pequenos arquivos de texto armazenados no navegador ou dispositivo do visitante quando ele acessa determinadas páginas da internet.</p>
            <p className="mt-4">Eles podem permitir que um site reconheça um determinado navegador ou dispositivo e, dependendo de sua finalidade, podem armazenar informações relacionadas às preferências e à utilização do site.</p>
            <p className="mt-4">Os cookies podem ser utilizados, por exemplo, para:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1"><li>permitir o funcionamento de determinadas funcionalidades;</li><li>lembrar preferências;</li><li>compreender como os visitantes utilizam o site;</li><li>medir audiência;</li><li>melhorar o desempenho;</li><li>personalizar determinadas experiências;</li><li>exibir e medir publicidade.</li></ul>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">2. Por que o GMATOSCAR utiliza cookies?</h2>
            <p>O GMATOSCAR poderá utilizar cookies para diferentes finalidades, incluindo:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1"><li>funcionamento técnico do site;</li><li>segurança;</li><li>armazenamento de preferências;</li><li>análise de audiência;</li><li>melhoria da experiência do usuário;</li><li>análise de desempenho;</li><li>publicidade;</li><li>medição de resultados;</li><li>funcionamento de serviços de terceiros.</li></ul>
            <p className="mt-4">Nem todos os cookies possuem a mesma finalidade. Alguns são necessários para o funcionamento do site, enquanto outros dependem das preferências ou do consentimento do usuário, quando aplicável.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-3">3. Tipos de cookies utilizados</h2>
            <p>Os cookies utilizados pelo GMATOSCAR podem ser classificados de acordo com sua finalidade.</p>
            <h3 className="text-xl font-rajdhani font-bold text-[#111827] mt-5 mb-2">3.1. Cookies necessários</h3>
            <p>Esses cookies são utilizados para permitir o funcionamento adequado do site e de determinadas funcionalidades.</p>
            <p className="mt-4">Eles podem estar relacionados, por exemplo, a:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1"><li>segurança;</li><li>funcionamento técnico;</li><li>preferências essenciais;</li><li>gerenciamento de sessão;</li><li>funcionamento de ferramentas necessárias ao site.</li></ul>
            <p className="mt-4">Quando determinados cookies forem estritamente necessários para o funcionamento de uma funcionalidade solicitada pelo usuário, eles poderão ser utilizados independentemente de determinados cookies opcionais.</p>
            <h3 className="text-xl font-rajdhani font-bold text-[#111827] mt-5 mb-2">3.2. Cookies de preferência</h3>
            <p>Podemos utilizar cookies para lembrar determinadas escolhas realizadas pelo usuário.</p>
            <p className="mt-4">Eles podem permitir, por exemplo:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1"><li>armazenamento de preferências;</li><li>reconhecimento de determinadas configurações;</li><li>melhoria da experiência de navegação.</li></ul>
            <h3 className="text-xl font-rajdhani font-bold text-[#111827] mt-5 mb-2">3.3. Cookies de análise e desempenho</h3>
            <p>O GMATOSCAR poderá utilizar cookies e tecnologias semelhantes para compreender como os visitantes utilizam o site.</p>
            <p className="mt-4">Esses dados podem ajudar a identificar:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1"><li>quais páginas são mais acessadas;</li><li>quais conteúdos possuem maior interesse;</li><li>como os visitantes chegam ao site;</li><li>quais dispositivos são utilizados;</li><li>quanto tempo os usuários permanecem em determinadas páginas;</li><li>possíveis problemas de navegação.</li></ul>
            <p className="mt-4">Essas informações ajudam o GMATOSCAR a melhorar sua estrutura, conteúdos e experiência de usuário.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">4. Google Analytics</h2>
            <p>O GMATOSCAR poderá utilizar o <strong>Google Analytics</strong>, serviço fornecido pelo Google, para analisar o tráfego e o comportamento dos visitantes.</p>
            <p className="mt-4">O Google Analytics utiliza cookies e tecnologias semelhantes para coletar informações relacionadas à utilização do site.</p>
            <p className="mt-4">Dependendo da configuração implementada, essas informações podem incluir dados relacionados a:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1"><li>páginas acessadas;</li><li>interações realizadas;</li><li>dispositivo utilizado;</li><li>navegador;</li><li>sistema operacional;</li><li>origem do acesso;</li><li>informações aproximadas de localização;</li><li>dados relacionados às sessões.</li></ul>
            <p className="mt-4">O GMATOSCAR utiliza essas informações para compreender o desempenho do site e melhorar seus conteúdos e funcionalidades.</p>
            <p className="mt-4">O funcionamento do Google Analytics está sujeito também às políticas e configurações disponibilizadas pelo Google.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">5. Google AdSense e cookies de publicidade</h2>
            <p>O GMATOSCAR poderá utilizar o <strong>Google AdSense</strong> para exibir publicidade em determinadas páginas.</p>
            <p className="mt-4">O Google e seus parceiros de publicidade podem utilizar cookies, identificadores e tecnologias semelhantes para:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1"><li>exibir anúncios;</li><li>medir o desempenho dos anúncios;</li><li>evitar a repetição excessiva de determinados anúncios;</li><li>compreender interações com publicidade;</li><li>personalizar anúncios quando permitido e aplicável.</li></ul>
            <p className="mt-4">A utilização de cookies para publicidade pode variar de acordo com a localização do usuário, suas escolhas de consentimento e as configurações implementadas no site.</p>
            <p className="mt-4">O Google possui mecanismos próprios para gerenciamento de preferências relacionadas à publicidade.</p>
            <p className="mt-4">Para obter informações atualizadas sobre como o Google utiliza cookies e dados para publicidade, recomendamos consultar as informações disponibilizadas pelo próprio Google.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">6. Cookies de terceiros</h2>
            <p>Além dos cookies utilizados diretamente pelo GMATOSCAR, determinados serviços de terceiros incorporados ao site poderão utilizar seus próprios cookies ou tecnologias semelhantes.</p>
            <p className="mt-4">Esses terceiros podem incluir, conforme os serviços efetivamente utilizados pelo GMATOSCAR:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1"><li>Google;</li><li>ferramentas de análise;</li><li>plataformas de publicidade;</li><li>serviços de vídeo;</li><li>redes sociais;</li><li>plataformas de afiliados;</li><li>outros fornecedores de tecnologia.</li></ul>
            <p className="mt-4">O funcionamento desses cookies está sujeito às políticas de privacidade e cookies dos respectivos terceiros.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">7. Links de afiliados</h2>
            <p>O GMATOSCAR poderá utilizar links de afiliados em determinados conteúdos.</p>
            <p className="mt-4">Quando o usuário acessa um link de afiliado, a plataforma parceira poderá utilizar cookies ou tecnologias semelhantes para identificar a origem da indicação e atribuir uma eventual comissão ao GMATOSCAR.</p>
            <p className="mt-4">Esses cookies são controlados pelas respectivas plataformas e programas de afiliados.</p>
            <p className="mt-4">O GMATOSCAR não controla diretamente os cookies utilizados pelos sites de terceiros acessados através desses links.</p>
            <p className="mt-4">Sempre que aplicável, informações adicionais sobre relações de afiliados estarão disponíveis nos conteúdos correspondentes ou na Política de Privacidade do GMATOSCAR.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">8. Cookies próprios</h2>
            <p>O GMATOSCAR poderá utilizar cookies próprios, ou seja, cookies definidos diretamente pelo domínio <strong>gmatoscar.com.br</strong>.</p>
            <p className="mt-4">Esses cookies poderão ser utilizados para:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1"><li>funcionamento do site;</li><li>segurança;</li><li>armazenamento de preferências;</li><li>funcionalidades específicas;</li><li>melhoria da experiência;</li><li>gerenciamento de determinadas configurações.</li></ul>
            <p className="mt-4">A utilização desses cookies poderá variar conforme as funcionalidades disponíveis no site.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">9. Gerenciamento de cookies</h2>
            <p>Dependendo da configuração do GMATOSCAR, o usuário poderá escolher quais categorias de cookies deseja aceitar.</p>
            <p className="mt-4">Quando disponibilizado, o banner ou painel de consentimento poderá apresentar opções como:</p>
            <p className="mt-2"><strong>Aceitar todos</strong></p>
            <p><strong>Recusar cookies não essenciais</strong></p>
            <p><strong>Configurar preferências</strong></p>
            <p className="mt-4">Os cookies estritamente necessários para o funcionamento do site poderão continuar sendo utilizados quando forem necessários para fornecer uma funcionalidade solicitada pelo usuário ou garantir o funcionamento e a segurança do serviço.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">10. Como desativar cookies pelo navegador</h2>
            <p>O usuário também pode controlar ou excluir cookies através das configurações do navegador utilizado.</p>
            <p className="mt-4">Os procedimentos podem variar entre navegadores, mas normalmente é possível:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1"><li>visualizar cookies armazenados;</li><li>bloquear determinados cookies;</li><li>bloquear cookies de terceiros;</li><li>excluir cookies existentes;</li><li>configurar o navegador para solicitar autorização antes de armazenar determinados cookies.</li></ul>
            <p className="mt-4">A desativação de cookies poderá afetar determinadas funcionalidades ou a experiência de navegação do GMATOSCAR.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">11. Cookies e dispositivos diferentes</h2>
            <p>As preferências de cookies podem ser armazenadas de acordo com o navegador ou dispositivo utilizado.</p>
            <p className="mt-4">Isso significa que, caso você acesse o GMATOSCAR utilizando outro dispositivo ou navegador, poderá ser necessário configurar novamente suas preferências.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">12. Alterações na Política de Cookies</h2>
            <p>Esta Política de Cookies poderá ser atualizada periodicamente para refletir:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1"><li>alterações na legislação;</li><li>mudanças na estrutura do GMATOSCAR;</li><li>inclusão ou remoção de ferramentas;</li><li>alterações nos serviços utilizados;</li><li>mudanças nos cookies empregados;</li><li>alterações nas práticas de publicidade e análise.</li></ul>
            <p className="mt-4">Quando houver alterações relevantes, a versão atualizada será publicada nesta página juntamente com a respectiva data de atualização.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">13. Relação com a Política de Privacidade</h2>
            <p>Esta Política de Cookies complementa a <strong>Política de Privacidade do GMATOSCAR</strong>.</p>
            <p className="mt-4">A Política de Privacidade apresenta informações mais amplas sobre a coleta, utilização, armazenamento e tratamento de dados pessoais.</p>
            <p className="mt-4">A Política de Cookies concentra-se especificamente no uso de cookies e tecnologias semelhantes.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">14. Contato</h2>
            <p>Caso tenha dúvidas sobre esta Política de Cookies ou sobre a utilização de cookies pelo GMATOSCAR, entre em contato conosco:</p>
            <p className="mt-4"><strong>GMATOSCAR</strong></p>
            <p><strong>Site:</strong> gmatoscar.com.br</p>
            <p><strong>E-mail:</strong> contato@gmatoscar.com.br</p>
            <p><strong>Última atualização:</strong> 16/08/2026</p>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}
