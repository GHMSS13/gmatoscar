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
        <p className="text-[#6b7280] font-exo text-sm">Última atualização: 16/08/2026</p>

        <div className="mt-10 space-y-8 text-[#1f2937] font-exo leading-relaxed">
          <section>
            <p>
              A sua privacidade é importante para o GMATOSCAR. Esta Política de Privacidade explica como coletamos,
              utilizamos, armazenamos e protegemos informações relacionadas aos visitantes do site <strong>gmatoscar.com.br</strong>.
            </p>
            <p className="mt-4">
              O GMATOSCAR é um portal brasileiro especializado em supercarros, apresentando notícias, curiosidades,
              histórias, rankings e conteúdos relacionados ao universo automotivo.
            </p>
            <p className="mt-4">Ao acessar o site, o usuário poderá estar sujeito às práticas descritas nesta Política de Privacidade.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-3">1. Informações que podemos coletar</h2>
            <p>Dependendo da forma como você utiliza o GMATOSCAR, podemos coletar informações de diferentes maneiras.</p>
            <h3 className="text-xl font-rajdhani font-bold text-[#111827] mt-5 mb-2">Informações fornecidas pelo usuário</h3>
            <p>Caso determinadas funcionalidades sejam disponibilizadas no site, o usuário poderá fornecer voluntariamente informações como:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Nome;</li>
              <li>Endereço de e-mail;</li>
              <li>Informações enviadas através de formulários;</li>
              <li>Informações fornecidas em contatos com o GMATOSCAR;</li>
              <li>Outras informações necessárias para determinada funcionalidade.</li>
            </ul>
            <p className="mt-4">O fornecimento dessas informações ocorrerá de acordo com a finalidade apresentada no momento da coleta.</p>
            <h3 className="text-xl font-rajdhani font-bold text-[#111827] mt-5 mb-2">Informações coletadas automaticamente</h3>
            <p>Quando você acessa o GMATOSCAR, algumas informações técnicas podem ser coletadas automaticamente, incluindo:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Endereço IP;</li><li>Tipo de dispositivo;</li><li>Sistema operacional;</li><li>Tipo e versão do navegador;</li>
              <li>Páginas visitadas;</li><li>Data e horário de acesso;</li><li>Tempo de permanência;</li><li>Origem do acesso;</li>
              <li>Informações relacionadas à navegação;</li><li>Interações realizadas no site;</li><li>Cookies e tecnologias semelhantes.</li>
            </ul>
            <p className="mt-4">Essas informações são utilizadas principalmente para compreender como o site é utilizado, melhorar seu funcionamento, analisar audiência e oferecer uma experiência melhor aos visitantes.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">2. Como utilizamos as informações</h2>
            <p>As informações coletadas poderão ser utilizadas para:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>disponibilizar e manter o funcionamento do GMATOSCAR;</li><li>melhorar a experiência de navegação;</li><li>analisar o desempenho do site;</li>
              <li>entender quais conteúdos são mais acessados;</li><li>desenvolver novos conteúdos;</li><li>identificar problemas técnicos;</li>
              <li>melhorar a estrutura e funcionalidade do site;</li><li>proteger o site contra atividades fraudulentas ou abusivas;</li><li>medir audiência e desempenho;</li>
              <li>exibir publicidade, quando aplicável;</li><li>cumprir obrigações legais;</li><li>responder solicitações realizadas pelos usuários.</li>
            </ul>
            <p className="mt-4">O GMATOSCAR procura utilizar as informações pessoais de acordo com finalidades legítimas, específicas e compatíveis com o funcionamento do site.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">3. Google Analytics</h2>
            <p>O GMATOSCAR poderá utilizar o <strong>Google Analytics</strong>, serviço fornecido pelo Google, para analisar o tráfego e compreender como os visitantes utilizam o site.</p>
            <p className="mt-4">O Google Analytics pode coletar informações relacionadas à utilização do site, como páginas acessadas, informações sobre dispositivos, navegador, localização aproximada, interações e dados relacionados às sessões.</p>
            <p className="mt-4">Essas informações são utilizadas para compreender o desempenho do GMATOSCAR e melhorar seus conteúdos e funcionalidades.</p>
            <p className="mt-4">O Google possui sua própria política de privacidade e regras relacionadas ao funcionamento do Google Analytics.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">4. Google Search Console</h2>
            <p>O GMATOSCAR poderá utilizar o <strong>Google Search Console</strong> para acompanhar o desempenho do site nos resultados da Pesquisa Google, identificar problemas técnicos, analisar páginas indexadas e compreender como o site aparece nos resultados de pesquisa.</p>
            <p className="mt-4">O Search Console é utilizado principalmente para fins de monitoramento, manutenção e otimização do desempenho do site nos mecanismos de busca.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">5. Google AdSense e publicidade</h2>
            <p>O GMATOSCAR poderá utilizar o <strong>Google AdSense</strong> para exibir anúncios em determinadas páginas do site.</p>
            <p className="mt-4">O Google e seus parceiros de publicidade poderão utilizar cookies, identificadores, endereço IP e tecnologias semelhantes para fornecer, medir e personalizar publicidade, de acordo com as configurações aplicáveis e com as políticas do Google.</p>
            <p className="mt-4">A publicidade poderá ser baseada em determinados fatores relacionados à navegação do usuário e, quando aplicável, em informações sobre sua atividade em sites e serviços.</p>
            <p className="mt-4">O usuário poderá encontrar informações adicionais sobre o funcionamento da publicidade do Google e as opções disponíveis para gerenciamento de anúncios nas ferramentas e políticas disponibilizadas pelo próprio Google.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">6. Cookies</h2>
            <p>O GMATOSCAR poderá utilizar cookies e tecnologias semelhantes.</p>
            <p className="mt-4">Cookies são pequenos arquivos armazenados no dispositivo do usuário que permitem, entre outras funções, reconhecer determinadas informações relacionadas ao navegador e melhorar o funcionamento do site.</p>
            <p className="mt-4">Os cookies podem ser utilizados para:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1"><li>funcionamento do site;</li><li>armazenamento de preferências;</li><li>análise de audiência;</li><li>melhoria da experiência do usuário;</li><li>medição de desempenho;</li><li>publicidade;</li><li>identificação de comportamentos anormais ou atividades suspeitas.</li></ul>
            <p className="mt-4">O usuário pode controlar ou excluir cookies através das configurações do navegador. Entretanto, a desativação de determinados cookies poderá afetar algumas funcionalidades do site.</p>
            <p className="mt-4">Informações mais detalhadas sobre os cookies utilizados pelo GMATOSCAR estarão disponíveis em nossa <strong>Política de Cookies</strong>.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">7. Compartilhamento de informações</h2>
            <p>O GMATOSCAR <strong>não vende dados pessoais dos usuários</strong>.</p>
            <p className="mt-4">Entretanto, determinadas informações poderão ser processadas por empresas terceiras que fornecem serviços necessários ao funcionamento do site.</p>
            <p className="mt-4">Esses terceiros podem incluir fornecedores relacionados a:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1"><li>hospedagem;</li><li>segurança;</li><li>análise de audiência;</li><li>publicidade;</li><li>infraestrutura tecnológica;</li><li>serviços de comunicação;</li><li>ferramentas de desempenho;</li><li>outros serviços necessários ao funcionamento do GMATOSCAR.</li></ul>
            <p className="mt-4">Também poderemos compartilhar informações quando isso for necessário para:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1"><li>cumprir uma obrigação legal;</li><li>atender uma determinação judicial ou administrativa;</li><li>proteger os direitos do GMATOSCAR;</li><li>investigar atividades fraudulentas;</li><li>proteger a segurança dos usuários e do site.</li></ul>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">8. Links de afiliados</h2>
            <p>O GMATOSCAR poderá utilizar <strong>links de afiliados</strong> em determinados conteúdos.</p>
            <p className="mt-4">Isso significa que, quando um usuário acessar determinados links e realizar uma compra ou outra ação qualificada na plataforma de um parceiro, o GMATOSCAR poderá receber uma comissão.</p>
            <p className="mt-4">A utilização de links de afiliados não necessariamente aumenta o preço pago pelo usuário, sendo isso determinado pelas condições estabelecidas por cada programa ou parceiro.</p>
            <p className="mt-4">A existência de uma relação de afiliado não significa que todas as recomendações sejam pagas ou patrocinadas. Sempre que aplicável, o GMATOSCAR buscará deixar clara a existência dessa relação comercial.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">9. Links para sites de terceiros</h2>
            <p>O GMATOSCAR poderá disponibilizar links para sites externos, incluindo fabricantes de automóveis, lojas, plataformas, redes sociais, parceiros e anunciantes.</p>
            <p className="mt-4">Ao acessar esses sites, o usuário estará sujeito às políticas de privacidade e aos termos de uso das respectivas plataformas.</p>
            <p className="mt-4">O GMATOSCAR não controla as práticas de privacidade, segurança ou conteúdo de sites de terceiros.</p>
            <p className="mt-4">Recomendamos que o usuário consulte as políticas de privacidade desses sites antes de fornecer informações pessoais.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">10. Segurança</h2>
            <p>O GMATOSCAR adota medidas técnicas e organizacionais razoáveis para proteger as informações tratadas contra acessos não autorizados, perda, alteração, divulgação ou destruição indevida.</p>
            <p className="mt-4">Apesar disso, nenhum sistema conectado à internet pode garantir segurança absoluta.</p>
            <p className="mt-4">Por esse motivo, não é possível garantir que as informações estarão completamente livres de riscos decorrentes de eventos fora do controle do GMATOSCAR.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">11. Armazenamento e retenção de informações</h2>
            <p>As informações poderão ser mantidas pelo período necessário para cumprir as finalidades descritas nesta Política de Privacidade, atender obrigações legais ou regulatórias, solucionar disputas ou proteger os direitos do GMATOSCAR.</p>
            <p className="mt-4">Quando as informações deixarem de ser necessárias e não existir obrigação legal para sua conservação, elas poderão ser excluídas ou anonimizadas, conforme aplicável.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">12. Direitos dos titulares</h2>
            <p>Nos termos da <strong>Lei Geral de Proteção de Dados Pessoais (LGPD) (Lei nº 13.709/2018)</strong>, o titular dos dados pessoais poderá exercer os direitos previstos na legislação aplicável.</p>
            <p className="mt-4">Entre eles estão, conforme aplicável:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1"><li>confirmação da existência de tratamento;</li><li>acesso aos dados pessoais;</li><li>correção de dados incompletos, inexatos ou desatualizados;</li><li>informações sobre o tratamento realizado;</li><li>informações sobre compartilhamento de dados;</li><li>revogação do consentimento, quando essa for a base legal utilizada;</li><li>eliminação de dados tratados com base no consentimento, observadas as hipóteses legais de conservação;</li><li>demais direitos previstos pela legislação.</li></ul>
            <p className="mt-4">As solicitações poderão ser realizadas através do contato indicado nesta Política de Privacidade.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">13. Privacidade de crianças e adolescentes</h2>
            <p>O GMATOSCAR é um portal de conteúdo automotivo destinado ao público em geral.</p>
            <p className="mt-4">Não buscamos coletar intencionalmente dados pessoais de crianças de maneira incompatível com a legislação aplicável.</p>
            <p className="mt-4">Caso um responsável legal identifique que uma criança forneceu informações pessoais ao GMATOSCAR de maneira inadequada, poderá entrar em contato conosco para que a situação seja analisada.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">14. Alterações nesta Política de Privacidade</h2>
            <p>Esta Política de Privacidade poderá ser atualizada periodicamente para refletir:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1"><li>alterações na legislação;</li><li>mudanças no funcionamento do GMATOSCAR;</li><li>inclusão de novos serviços;</li><li>mudanças nas ferramentas utilizadas;</li><li>alterações nas práticas de tratamento de dados.</li></ul>
            <p className="mt-4">Quando houver alterações relevantes, a nova versão será publicada nesta página juntamente com a respectiva data de atualização.</p>
            <p className="mt-4">Recomendamos que os usuários consultem esta página periodicamente.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">15. Legislação aplicável</h2>
            <p>Esta Política de Privacidade é regida pela legislação brasileira aplicável, especialmente pela <strong>Lei nº 13.709/2018 — Lei Geral de Proteção de Dados Pessoais (LGPD)</strong>.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">16. Contato</h2>
            <p>Caso tenha dúvidas sobre esta Política de Privacidade, queira exercer algum direito relacionado aos seus dados pessoais ou precise entrar em contato com o GMATOSCAR sobre questões de privacidade, utilize:</p>
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