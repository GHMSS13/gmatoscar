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
        <p className="text-[#6b7280] font-exo text-sm">Última atualização: 16/08/2026</p>

        <div className="mt-10 space-y-8 text-[#1f2937] font-exo leading-relaxed">
          <section>
            <p>O <strong>GMATOSCAR</strong> é um portal brasileiro dedicado ao universo dos supercarros, automóveis extraordinários, automobilismo e ao mundo automotivo.</p>
            <p className="mt-4">Nosso conteúdo é produzido com finalidade <strong>informativa, educativa e de entretenimento</strong>.</p>
            <p className="mt-4">Embora busquemos publicar informações relevantes, claras e atualizadas, algumas informações apresentadas no site podem sofrer alterações ou variar de acordo com o país, versão do veículo, ano de fabricação, configuração, fonte consultada e momento da publicação.</p>
            <p className="mt-4">Por isso, recomendamos a leitura desta Isenção de Responsabilidade antes de utilizar as informações disponibilizadas pelo GMATOSCAR.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">1. Natureza do conteúdo</h2>
            <p>O conteúdo publicado pelo GMATOSCAR tem como objetivo informar e entreter os leitores.</p>
            <p className="mt-4">Nossos artigos podem abordar:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1"><li>supercarros;</li><li>hipercarros;</li><li>carros esportivos;</li><li>carros de competição;</li><li>automobilismo;</li><li>veículos preparados;</li><li>história automotiva;</li><li>fabricantes;</li><li>modelos;</li><li>tecnologia;</li><li>desempenho;</li><li>preços;</li><li>rankings;</li><li>curiosidades;</li><li>lançamentos;</li><li>notícias;</li><li>outros assuntos relacionados ao universo automotivo.</li></ul>
            <p className="mt-4">As informações apresentadas não devem ser consideradas aconselhamento profissional, técnico, financeiro, jurídico ou comercial.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">2. Precisão das informações</h2>
            <p>O GMATOSCAR procura utilizar fontes confiáveis e verificar as informações antes da publicação.</p>
            <p className="mt-4">Entretanto, não podemos garantir que todas as informações disponíveis no site estejam permanentemente:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1"><li>completas;</li><li>atualizadas;</li><li>precisas;</li><li>livres de erros;</li><li>disponíveis.</li></ul>
            <p className="mt-4">Informações podem mudar depois da publicação de um artigo.</p>
            <p className="mt-4">Caso identifiquemos algum erro relevante, poderemos corrigir ou atualizar o conteúdo.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">3. Especificações técnicas</h2>
            <p>Informações relacionadas a veículos, como:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1"><li>potência;</li><li>torque;</li><li>velocidade máxima;</li><li>aceleração;</li><li>peso;</li><li>dimensões;</li><li>consumo;</li><li>produção;</li><li>autonomia;</li><li>motorização;</li><li>capacidade;</li><li>preços;</li><li>desempenho;</li></ul>
            <p className="mt-4">podem variar de acordo com o modelo, versão, ano, configuração, mercado ou condições de teste.</p>
            <p className="mt-4">Os números apresentados pelo GMATOSCAR devem ser considerados <strong>referências informativas</strong>.</p>
            <p className="mt-4">Para obter especificações oficiais e atualizadas, recomendamos consultar diretamente o fabricante ou fontes oficiais.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">4. Preços de veículos e produtos</h2>
            <p>Os preços apresentados no GMATOSCAR são apenas referências.</p>
            <p className="mt-4">O valor de um veículo ou produto pode variar significativamente de acordo com:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1"><li>país;</li><li>moeda;</li><li>câmbio;</li><li>impostos;</li><li>versão;</li><li>opcionais;</li><li>estado de conservação;</li><li>quilometragem;</li><li>localização;</li><li>disponibilidade;</li><li>vendedor;</li><li>data da consulta.</li></ul>
            <p className="mt-4">Portanto, um preço apresentado em um artigo não constitui uma oferta de venda.</p>
            <p className="mt-4">Antes de realizar qualquer negociação, o usuário deve confirmar o preço e as condições diretamente com o fabricante, vendedor ou fornecedor.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">5. Rankings e comparações</h2>
            <p>O GMATOSCAR poderá publicar rankings, listas e comparações entre veículos.</p>
            <p className="mt-4">Esses conteúdos são elaborados com base em critérios editoriais que podem incluir:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1"><li>desempenho;</li><li>velocidade;</li><li>potência;</li><li>preço;</li><li>exclusividade;</li><li>importância histórica;</li><li>tecnologia;</li><li>design;</li><li>capacidade;</li><li>relevância no mercado;</li><li>outros critérios relacionados ao tema analisado.</li></ul>
            <p className="mt-4">Os resultados de um ranking representam <strong>critérios editoriais do GMATOSCAR</strong> e não devem ser interpretados como uma classificação oficial ou universal.</p>
            <p className="mt-4">Diferentes fontes podem utilizar critérios diferentes e, consequentemente, apresentar resultados distintos.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">6. Notícias</h2>
            <p>O GMATOSCAR publica notícias e informações relacionadas ao mundo automotivo com base em informações disponíveis no momento da publicação.</p>
            <p className="mt-4">Notícias podem envolver:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1"><li>lançamentos;</li><li>protótipos;</li><li>rumores;</li><li>declarações;</li><li>mudanças empresariais;</li><li>competições;</li><li>recordes;</li><li>eventos;</li><li>informações divulgadas por fabricantes;</li><li>outros acontecimentos.</li></ul>
            <p className="mt-4">Quando uma informação ainda não estiver oficialmente confirmada, procuraremos deixar isso claro no conteúdo.</p>
            <p className="mt-4">Informações inicialmente divulgadas como rumores ou expectativas podem posteriormente ser confirmadas, modificadas ou desmentidas.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">7. Conteúdo sobre preparação e modificações de veículos</h2>
            <p>O GMATOSCAR poderá apresentar conteúdos relacionados a veículos modificados, preparação automotiva, competições e projetos extremos.</p>
            <p className="mt-4">Esses conteúdos possuem finalidade informativa e de entretenimento.</p>
            <p className="mt-4">Não recomendamos que qualquer modificação apresentada no site seja reproduzida sem conhecimento técnico adequado.</p>
            <p className="mt-4">Alterações em veículos podem afetar:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1"><li>segurança;</li><li>dirigibilidade;</li><li>confiabilidade;</li><li>consumo;</li><li>emissões;</li><li>garantia;</li><li>legalidade;</li><li>funcionamento de componentes.</li></ul>
            <p className="mt-4">Antes de realizar qualquer alteração em um veículo, recomendamos consultar profissionais qualificados e verificar a legislação aplicável.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">8. Conteúdo sobre automobilismo e competição</h2>
            <p>O GMATOSCAR poderá publicar conteúdos relacionados a Fórmula 1, rally, endurance, Dakar, competições off-road e outras modalidades automobilísticas.</p>
            <p className="mt-4">Veículos utilizados em competições geralmente possuem características, equipamentos e configurações específicas para ambientes controlados ou regulamentados.</p>
            <p className="mt-4">Essas características <strong>não significam que o veículo seja adequado ou legal para utilização em vias públicas</strong>.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">9. Links externos</h2>
            <p>O GMATOSCAR poderá disponibilizar links para sites de terceiros.</p>
            <p className="mt-4">Esses links podem incluir:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1"><li>fabricantes;</li><li>lojas;</li><li>marketplaces;</li><li>empresas;</li><li>plataformas de conteúdo;</li><li>redes sociais;</li><li>sites de notícias;</li><li>parceiros;</li><li>programas de afiliados.</li></ul>
            <p className="mt-4">O GMATOSCAR não controla o conteúdo, disponibilidade, preços, políticas, segurança ou práticas desses sites.</p>
            <p className="mt-4">O acesso e utilização de sites externos são de responsabilidade do próprio usuário.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">10. Links de afiliados</h2>
            <p>Alguns conteúdos do GMATOSCAR poderão conter <strong>links de afiliados</strong>.</p>
            <p className="mt-4">Quando o usuário realizar uma compra ou determinada ação através de um link de afiliado, o GMATOSCAR poderá receber uma comissão do parceiro.</p>
            <p className="mt-4">Essa comissão poderá ajudar a manter e desenvolver o portal.</p>
            <p className="mt-4">A existência de um link de afiliado não significa que o preço pago pelo usuário será necessariamente maior.</p>
            <p className="mt-4">Também não significa que determinado produto seja automaticamente recomendado ou considerado superior a todas as alternativas disponíveis.</p>
            <p className="mt-4">As condições comerciais, preços e disponibilidade são determinadas pelos respectivos fornecedores.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">11. Publicidade</h2>
            <p>O GMATOSCAR poderá exibir publicidade através de plataformas de terceiros, incluindo o <strong>Google AdSense</strong>.</p>
            <p className="mt-4">Os anúncios exibidos podem variar de acordo com diferentes fatores e podem ser personalizados conforme as configurações aplicáveis.</p>
            <p className="mt-4">A presença de um anúncio no GMATOSCAR <strong>não significa necessariamente que o GMATOSCAR recomenda, garante ou endossa o produto ou serviço anunciado</strong>.</p>
            <p className="mt-4">Qualquer relação comercial específica será indicada quando aplicável.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">12. Conteúdo de terceiros</h2>
            <p>O GMATOSCAR poderá mencionar, reproduzir de forma permitida ou incorporar conteúdos relacionados a fabricantes, equipes, pilotos, eventos, empresas e outras entidades.</p>
            <p className="mt-4">Marcas, nomes comerciais, logotipos e demais propriedades intelectuais pertencem aos seus respectivos titulares.</p>
            <p className="mt-4">A menção a uma marca ou empresa no GMATOSCAR não significa necessariamente que exista parceria, patrocínio, aprovação ou vínculo comercial.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">13. Decisões tomadas com base no conteúdo</h2>
            <p>O usuário é responsável pelas decisões que tomar com base nas informações encontradas no GMATOSCAR.</p>
            <p className="mt-4">O site não deve ser utilizado como única fonte para decisões envolvendo:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1"><li>compra ou venda de veículos;</li><li>investimentos;</li><li>contratação de serviços;</li><li>preparação de veículos;</li><li>modificações automotivas;</li><li>manutenção;</li><li>segurança;</li><li>questões jurídicas;</li><li>questões financeiras;</li><li>outras decisões que possam gerar consequências materiais.</li></ul>
            <p className="mt-4">Sempre que necessário, recomendamos consultar profissionais qualificados e fontes oficiais.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">14. Segurança</h2>
            <p>Conteúdos relacionados a velocidade, competição, preparação, direção extrema e veículos modificados são apresentados dentro de um contexto informativo e de entretenimento.</p>
            <p className="mt-4">O GMATOSCAR não incentiva práticas ilegais, direção perigosa ou utilização irresponsável de veículos.</p>
            <p className="mt-4">Qualquer atividade envolvendo veículos deve respeitar a legislação, as normas de segurança e as condições adequadas para sua realização.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">15. Disponibilidade do conteúdo</h2>
            <p>O GMATOSCAR poderá alterar, atualizar, corrigir, substituir ou remover conteúdos a qualquer momento.</p>
            <p className="mt-4">Também poderemos modificar a estrutura, funcionalidades ou disponibilidade do site sem aviso prévio.</p>
            <p className="mt-4">Não garantimos que determinado artigo, informação, imagem, vídeo ou página permanecerá disponível indefinidamente.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">16. Limitação de responsabilidade</h2>
            <p>Na medida permitida pela legislação aplicável, o GMATOSCAR não se responsabiliza por prejuízos decorrentes exclusivamente da utilização ou interpretação das informações disponibilizadas no site.</p>
            <p className="mt-4">Isso inclui, entre outros casos:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1"><li>decisões de compra;</li><li>negociações realizadas com terceiros;</li><li>utilização de informações técnicas;</li><li>modificações realizadas em veículos;</li><li>informações desatualizadas;</li><li>alterações de preços;</li><li>indisponibilidade de produtos;</li><li>informações apresentadas por terceiros;</li><li>conteúdo de sites externos;</li><li>problemas decorrentes de serviços de terceiros.</li></ul>
            <p className="mt-4">Nada nesta Isenção de Responsabilidade tem como objetivo excluir direitos que não possam ser legalmente afastados.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">17. Alterações nesta Isenção de Responsabilidade</h2>
            <p>Esta página poderá ser atualizada sempre que necessário para refletir mudanças:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1"><li>no funcionamento do GMATOSCAR;</li><li>nos conteúdos publicados;</li><li>nos serviços utilizados;</li><li>na legislação aplicável;</li><li>nas práticas comerciais;</li><li>nas formas de monetização.</li></ul>
            <p className="mt-4">A versão mais recente estará sempre disponível nesta página.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">18. Legislação aplicável</h2>
            <p>Esta Isenção de Responsabilidade é regida pela legislação brasileira aplicável.</p>
            <p className="mt-4">Eventuais questões relacionadas à utilização do conteúdo do GMATOSCAR serão tratadas de acordo com a legislação vigente no Brasil.</p>
          </section>

          <section>
            <h2 className="text-2xl font-rajdhani font-bold text-[#111827] mb-2">19. Contato</h2>
            <p>Caso tenha dúvidas sobre esta Isenção de Responsabilidade ou queira entrar em contato com o GMATOSCAR, utilize:</p>
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
