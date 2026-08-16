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
        <p className="text-[#6b7280] font-exo text-sm">Última atualização: 16/08/2026</p>

        <div className="mt-10 space-y-8 text-[#1f2937] font-exo leading-relaxed">
          <section>
            <p>Bem-vindo ao <strong>GMATOSCAR</strong>.</p>
            <p className="mt-4">Estes Termos de Uso estabelecem as condições para acesso e utilização do site <strong>gmatoscar.com.br</strong> e de seus conteúdos, serviços e funcionalidades.</p>
            <p className="mt-4">Ao acessar ou utilizar o GMATOSCAR, você declara que leu, compreendeu e concorda com estes Termos de Uso. Caso não concorde com alguma das condições apresentadas, recomendamos que não utilize o site.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">1. Sobre o GMATOSCAR</h2>
            <p>O <strong>GMATOSCAR</strong> é um portal brasileiro especializado no universo dos supercarros.</p>
            <p className="mt-4">O site publica conteúdos relacionados a:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1"><li>supercarros;</li><li>hipercarros;</li><li>carros esportivos;</li><li>automobilismo;</li><li>carros de competição;</li><li>veículos preparados;</li><li>tecnologia automotiva;</li><li>história dos automóveis;</li><li>fabricantes e marcas;</li><li>modelos históricos;</li><li>curiosidades;</li><li>notícias;</li><li>rankings;</li><li>entretenimento automotivo.</li></ul>
            <p className="mt-4">O conceito de supercarro utilizado pelo GMATOSCAR é editorial e pode abranger diferentes tipos de veículos e máquinas extraordinárias, independentemente de preço, marca, potência ou velocidade.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">2. Aceitação dos Termos</h2>
            <p>Ao acessar o GMATOSCAR, o usuário concorda em utilizar o site de acordo com estes Termos de Uso e com a legislação brasileira aplicável.</p>
            <p className="mt-4">Caso não concorde com estes termos, o usuário deverá interromper a utilização do site.</p>
            <p className="mt-4">O GMATOSCAR poderá atualizar estes Termos de Uso periodicamente. A versão mais recente estará sempre disponível nesta página.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">3. Utilização do site</h2>
            <p>O usuário poderá utilizar o GMATOSCAR para fins pessoais, informativos e não comerciais, respeitando estes Termos de Uso.</p>
            <p className="mt-4">É proibido utilizar o site para:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1"><li>praticar atividades ilegais;</li><li>tentar obter acesso não autorizado aos sistemas do site;</li><li>interferir no funcionamento do GMATOSCAR;</li><li>introduzir vírus, códigos maliciosos ou outras tecnologias prejudiciais;</li><li>realizar atividades automatizadas que sobrecarreguem ou prejudiquem o site;</li><li>copiar ou reproduzir conteúdos em larga escala sem autorização;</li><li>utilizar o conteúdo do GMATOSCAR para criar um serviço concorrente sem autorização;</li><li>praticar qualquer atividade que possa prejudicar o GMATOSCAR, seus usuários ou terceiros.</li></ul>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">4. Conteúdo do GMATOSCAR</h2>
            <p>O GMATOSCAR produz e publica conteúdos relacionados ao universo automotivo com o objetivo de informar e entreter seus visitantes.</p>
            <p className="mt-4">Entre os conteúdos disponibilizados estão:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1"><li>artigos;</li><li>notícias;</li><li>curiosidades;</li><li>rankings;</li><li>páginas de marcas;</li><li>páginas de modelos;</li><li>imagens;</li><li>vídeos incorporados;</li><li>informações técnicas;</li><li>conteúdos históricos;</li><li>comparações;</li><li>outros materiais editoriais.</li></ul>
            <p className="mt-4">Buscamos manter as informações publicadas de maneira clara e atualizada.</p>
            <p className="mt-4">Entretanto, especificações, preços, disponibilidade, desempenho, números de produção e outras informações relacionadas a veículos podem sofrer alterações ou apresentar diferenças de acordo com o mercado, ano, versão, configuração ou fonte consultada.</p>
            <p className="mt-4">Por esse motivo, o conteúdo do GMATOSCAR deve ser utilizado como <strong>informação e entretenimento</strong>, e não como única fonte para decisões de compra, investimento, contratação de serviços ou outras decisões relevantes.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">5. Notícias e informações de terceiros</h2>
            <p>O GMATOSCAR poderá publicar notícias e informações baseadas em acontecimentos, comunicados, declarações, dados públicos e informações divulgadas por fabricantes, equipes, eventos, organizações e outras fontes.</p>
            <p className="mt-4">As informações podem ser atualizadas, corrigidas ou modificadas posteriormente.</p>
            <p className="mt-4">O GMATOSCAR poderá corrigir erros identificados, atualizar conteúdos antigos ou remover informações que tenham deixado de ser relevantes.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">6. Preços e valores apresentados</h2>
            <p>Quando o GMATOSCAR apresentar preços de veículos, produtos ou serviços, esses valores deverão ser considerados <strong>informativos</strong>.</p>
            <p className="mt-4">Preços podem variar de acordo com:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1"><li>país;</li><li>impostos;</li><li>câmbio;</li><li>versão;</li><li>opcionais;</li><li>condição do veículo;</li><li>disponibilidade;</li><li>data da consulta;</li><li>mercado;</li><li>vendedor ou fornecedor.</li></ul>
            <p className="mt-4">O usuário deve confirmar o preço diretamente com o fabricante, vendedor ou fornecedor antes de realizar qualquer compra.</p>
            <p className="mt-4">O GMATOSCAR não garante que um preço apresentado no site permanecerá disponível ou será exatamente igual ao praticado por terceiros.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">7. Propriedade intelectual</h2>
            <p>Todo o conteúdo original produzido pelo GMATOSCAR, incluindo textos, identidade visual, elementos gráficos, logotipos, títulos, estrutura editorial e outros materiais protegidos por direitos autorais ou propriedade intelectual, pertence ao GMATOSCAR ou é utilizado mediante autorização ou licença quando aplicável.</p>
            <p className="mt-4">É proibida a reprodução, distribuição, publicação, modificação ou exploração comercial de conteúdos originais do GMATOSCAR sem autorização prévia, salvo nas situações permitidas pela legislação.</p>
            <p className="mt-4">É permitido compartilhar links para conteúdos do GMATOSCAR, desde que isso não implique falsa associação, patrocínio ou representação de vínculo oficial com o GMATOSCAR.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">8. Imagens, marcas e materiais de terceiros</h2>
            <p>O GMATOSCAR poderá apresentar nomes, marcas, logotipos, imagens, vídeos e outros materiais relacionados a fabricantes, equipes, eventos e terceiros.</p>
            <p className="mt-4">As respectivas marcas e direitos pertencem aos seus respectivos proprietários.</p>
            <p className="mt-4">A utilização desses elementos no GMATOSCAR não significa necessariamente que exista patrocínio, parceria, aprovação ou vínculo comercial entre o GMATOSCAR e os respectivos proprietários.</p>
            <p className="mt-4">Quando materiais de terceiros forem utilizados, o GMATOSCAR buscará respeitar os direitos aplicáveis e, quando necessário, as respectivas licenças e autorizações.</p>
            <p className="mt-4">Caso você seja titular de direitos sobre algum material publicado no site e considere que sua utilização viola seus direitos, poderá entrar em contato conosco para análise da situação.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">9. Links externos</h2>
            <p>O GMATOSCAR poderá disponibilizar links para sites e serviços de terceiros.</p>
            <p className="mt-4">Esses links podem direcionar para:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1"><li>fabricantes;</li><li>lojas;</li><li>marketplaces;</li><li>plataformas de notícias;</li><li>redes sociais;</li><li>serviços automotivos;</li><li>parceiros comerciais;</li><li>programas de afiliados;</li><li>outras páginas externas.</li></ul>
            <p className="mt-4">O acesso a esses sites ocorre por iniciativa do próprio usuário.</p>
            <p className="mt-4">O GMATOSCAR não controla o conteúdo, disponibilidade, segurança, preços, políticas ou práticas de privacidade de sites externos.</p>
            <p className="mt-4">Recomendamos que o usuário leia os termos e políticas dos respectivos sites antes de utilizá-los.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">10. Links de afiliados e publicidade</h2>
            <p>O GMATOSCAR poderá utilizar <strong>links de afiliados</strong> e publicidade para ajudar na manutenção e desenvolvimento do portal.</p>
            <p className="mt-4">Determinados links poderão gerar uma comissão para o GMATOSCAR caso o usuário realize uma compra ou outra ação qualificada através de um parceiro.</p>
            <p className="mt-4">Quando aplicável, a existência de uma relação de afiliado será informada de maneira clara.</p>
            <p className="mt-4">A utilização de links de afiliados não significa que o usuário necessariamente pagará um valor adicional pelo produto ou serviço, dependendo das condições estabelecidas pelo respectivo programa.</p>
            <p className="mt-4">O GMATOSCAR também poderá exibir anúncios de empresas e plataformas de publicidade, incluindo, futuramente, o <strong>Google AdSense</strong>.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">11. Recomendações e avaliações</h2>
            <p>O GMATOSCAR poderá publicar recomendações, listas, rankings e avaliações editoriais.</p>
            <p className="mt-4">Esses conteúdos representam critérios e opiniões editoriais utilizados pelo GMATOSCAR e não devem ser interpretados como garantia de que determinado veículo, produto ou serviço será adequado para todas as pessoas.</p>
            <p className="mt-4">Rankings podem considerar diferentes critérios, como:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1"><li>desempenho;</li><li>história;</li><li>exclusividade;</li><li>tecnologia;</li><li>importância;</li><li>preço;</li><li>características técnicas;</li><li>relevância cultural;</li><li>outros critérios editoriais.</li></ul>
            <p className="mt-4">Os critérios utilizados poderão variar de acordo com o conteúdo.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">12. Disponibilidade do site</h2>
            <p>O GMATOSCAR busca manter o site disponível e funcionando adequadamente.</p>
            <p className="mt-4">Entretanto, não podemos garantir que o site estará disponível de forma ininterrupta ou livre de erros.</p>
            <p className="mt-4">O acesso poderá ser temporariamente interrompido em razão de:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1"><li>manutenção;</li><li>atualizações;</li><li>problemas técnicos;</li><li>falhas de hospedagem;</li><li>problemas de conexão;</li><li>ataques cibernéticos;</li><li>eventos fora do controle do GMATOSCAR;</li><li>outras situações técnicas ou operacionais.</li></ul>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">13. Limitação de responsabilidade</h2>
            <p>O GMATOSCAR busca oferecer informações confiáveis, mas não garante que todo conteúdo publicado estará permanentemente completo, atualizado ou livre de erros.</p>
            <p className="mt-4">O GMATOSCAR não será responsável por decisões tomadas exclusivamente com base nas informações disponibilizadas no site.</p>
            <p className="mt-4">Isso inclui, entre outros:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1"><li>decisões de compra;</li><li>investimentos;</li><li>contratação de serviços;</li><li>aquisição de veículos;</li><li>utilização de informações técnicas;</li><li>decisões relacionadas à preparação ou modificação de veículos.</li></ul>
            <p className="mt-4">Sempre recomendamos verificar informações importantes diretamente com fabricantes, profissionais especializados ou fontes oficiais.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">14. Segurança</h2>
            <p>O usuário concorda em não utilizar o GMATOSCAR de maneira que possa comprometer sua segurança, seus sistemas ou sua infraestrutura.</p>
            <p className="mt-4">É proibida qualquer tentativa de:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1"><li>invasão;</li><li>exploração de vulnerabilidades;</li><li>acesso não autorizado;</li><li>introdução de malware;</li><li>interrupção deliberada do serviço;</li><li>coleta automatizada abusiva de informações;</li><li>ataques contra o site ou sua infraestrutura.</li></ul>
            <p className="mt-4">O GMATOSCAR poderá adotar medidas técnicas e legais para proteger seus sistemas e usuários.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">15. Conteúdo enviado pelo usuário</h2>
            <p>Caso o GMATOSCAR disponibilize futuramente recursos que permitam ao usuário enviar comentários, mensagens, imagens, textos ou outros materiais, o usuário será responsável pelo conteúdo enviado.</p>
            <p className="mt-4">O usuário declara que possui os direitos necessários para enviar o material e que sua publicação não viola direitos de terceiros.</p>
            <p className="mt-4">O GMATOSCAR poderá remover conteúdos que:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1"><li>violem a legislação;</li><li>infrinjam direitos de terceiros;</li><li>sejam ofensivos ou abusivos;</li><li>contenham spam;</li><li>tenham caráter fraudulento;</li><li>prejudiquem o funcionamento do site;</li><li>violem estes Termos de Uso.</li></ul>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">16. Privacidade</h2>
            <p>O tratamento de informações pessoais relacionadas à utilização do GMATOSCAR é realizado de acordo com nossa <strong>Política de Privacidade</strong> e <strong>Política de Cookies</strong>.</p>
            <p className="mt-4">Recomendamos que o usuário leia esses documentos antes de utilizar determinadas funcionalidades do site.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">17. Alterações no conteúdo</h2>
            <p>O GMATOSCAR poderá, a qualquer momento e sem necessidade de aviso prévio:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1"><li>atualizar artigos;</li><li>corrigir informações;</li><li>alterar páginas;</li><li>modificar rankings;</li><li>adicionar ou remover conteúdos;</li><li>alterar funcionalidades;</li><li>suspender ou encerrar determinadas áreas do site.</li></ul>
            <p className="mt-4">Essas alterações podem ser realizadas para melhorar a qualidade, segurança e experiência do portal.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">18. Alterações destes Termos de Uso</h2>
            <p>Estes Termos de Uso poderão ser modificados sempre que necessário.</p>
            <p className="mt-4">A versão atualizada será publicada nesta página e passará a valer a partir de sua publicação, salvo quando indicado de outra maneira.</p>
            <p className="mt-4">Recomendamos que os usuários consultem esta página periodicamente.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">19. Legislação aplicável</h2>
            <p>Estes Termos de Uso são regidos pelas leis da <strong>República Federativa do Brasil</strong>.</p>
            <p className="mt-4">Eventuais questões relacionadas à utilização do GMATOSCAR serão tratadas de acordo com a legislação brasileira aplicável.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">20. Contato</h2>
            <p>Caso tenha dúvidas, sugestões, reclamações ou queira entrar em contato com o GMATOSCAR sobre estes Termos de Uso, utilize:</p>
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
