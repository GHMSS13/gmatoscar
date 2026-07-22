import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Sobre o GMATOSCAR',
  description:
    'Conheça o GMATOSCAR, o maior canal brasileiro sobre supercarros, hypercars e automóveis de alto desempenho.',
};

const aboutParagraphs = [
  'Bem-vindo ao GMATOSCAR.',
  'O GMATOSCAR é um portal brasileiro especializado em supercarros, hipercarros e esportivos de alto desempenho. Nosso propósito é reunir em um só lugar as melhores notícias, curiosidades, rankings, histórias e informações sobre os carros mais extraordinários do mundo.',
  'Mais do que números de potência, velocidade máxima ou desempenho, acreditamos que cada carro possui uma história única. Alguns revolucionaram a indústria automotiva, outros quebraram recordes, tornaram-se símbolos de uma geração ou conquistaram um lugar entre os modelos mais desejados e exclusivos já produzidos. É esse universo que buscamos explorar todos os dias.',
  'Aqui você encontra conteúdo sobre Ferrari, Lamborghini, Porsche, Bugatti, McLaren, Koenigsegg, Pagani, Aston Martin e outras marcas que marcaram a história do automobilismo de alto desempenho. Também acompanhamos os principais lançamentos, inovações, recordes, leilões, curiosidades e acontecimentos que movimentam o universo dos supercarros.',
  'O GMATOSCAR nasceu para ir além das especificações técnicas. Nosso objetivo é transformar informação em entretenimento de qualidade, contando as histórias por trás das máquinas que despertam admiração em milhões de pessoas ao redor do mundo.',
  'Além das notícias, você encontrará artigos completos sobre modelos icônicos, rankings dos carros mais rápidos, mais caros e mais exclusivos, curiosidades que pouca gente conhece e conteúdos desenvolvidos para quem deseja descobrir cada vez mais sobre esse universo fascinante.',
  'Acreditamos que um grande portal não deve apenas informar, mas também inspirar. Por isso, produzimos conteúdos com responsabilidade, pesquisa e atenção aos detalhes, oferecendo uma experiência de leitura agradável tanto para quem já é apaixonado pelo mundo automotivo quanto para quem está começando a descobrir os carros mais incríveis do planeta.',
  'O GMATOSCAR também está presente nas principais redes sociais, compartilhando diariamente vídeos, curiosidades e notícias para aproximar ainda mais os apaixonados por automóveis de alto desempenho.',
  'Nossa missão é inspirar pessoas por meio das histórias, curiosidades e inovações dos carros mais extraordinários do mundo.',
  'Nossa visão é ser a principal referência brasileira em conteúdo sobre supercarros, hipercarros e esportivos de alto desempenho, construindo uma comunidade apaixonada pelo universo automotivo e oferecendo conteúdo de qualidade que informe, entretenha e desperte a curiosidade de milhões de pessoas.',
  'Se você é apaixonado por Ferrari, Lamborghini, Porsche, Bugatti e pelos carros que marcaram a história do automobilismo, este é o seu lugar.',
  'Seja bem-vindo ao GMATOSCAR.',
];

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 sm:pt-36 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(148,163,184,0.08)_0%,transparent_60%)]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <p className="text-[#dc2626] text-xs font-bold uppercase tracking-[0.3em] font-rajdhani mb-4">
                Sobre
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-semibold text-[#111827] leading-tight mb-5 sm:mb-6">
                Sobre o <span className="text-[#dc2626]">GMATOSCAR</span>
              </h1>
              <p className="text-[#1f2937] text-sm sm:text-base leading-relaxed font-exo mb-7 sm:mb-8">
                Bem-vindo ao GMATOSCAR.
              </p>
              <div className="w-20 h-1 bg-[#dc2626] rounded-full" />
            </div>

            <div className="relative">
              <div className="relative aspect-video rounded-sm overflow-hidden border border-[#dc2626]/30 bg-[#050505] flex items-center justify-center px-6">
                <div className="text-center">
                  <p className="text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-[0.18em] sm:tracking-[0.32em] text-white font-rajdhani whitespace-nowrap">
                    GMATOS
                    <span className="text-[#dc2626]">CAR</span>
                  </p>
                  <p className="mt-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-white/50 font-rajdhani">
                    Supercarros
                  </p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-3 -right-3 w-24 h-24 border border-[#dc2626]/20 rounded-sm" />
              <div className="absolute -bottom-3 -left-3 w-16 h-16 border border-[#dc2626]/10 rounded-sm" />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <article className="bg-white border border-[#e5e7eb] rounded-sm p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#111827] mb-8">
              Sobre o GMATOSCAR
            </h2>
            <div className="space-y-6">
              {aboutParagraphs.map((paragraph, index) => (
                <p key={index} className="text-[#1f2937] text-sm sm:text-base leading-relaxed font-exo">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}
