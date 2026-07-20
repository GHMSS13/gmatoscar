import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Sobre o GMATOSCAR',
  description:
    'Conheça o GMATOSCAR, o maior canal brasileiro sobre supercarros, hypercars e automóveis de alto desempenho.',
};

const aboutParagraphs = [
  'Bem-vindo ao GMATOSCAR, um portal dedicado aos apaixonados por supercarros, carros esportivos e ao universo automotivo.',
  'Nossa missão é reunir em um só lugar as melhores curiosidades, notícias, histórias, rankings e informações sobre os carros mais incríveis do mundo. Aqui você encontra conteúdo atualizado sobre Ferrari, Lamborghini, Porsche, Bugatti, McLaren, Koenigsegg, Pagani, Aston Martin e muitas outras marcas que marcaram a história da indústria automotiva.',
  'Acreditamos que um supercarro vai muito além de seus números de potência ou velocidade máxima. Cada modelo possui uma história única, tecnologias inovadoras, curiosidades surpreendentes e detalhes que despertam a admiração de milhões de pessoas ao redor do mundo. É exatamente esse lado que buscamos mostrar em nossos conteúdos.',
  'No GMATOSCAR, você acompanha as principais notícias do mundo automotivo, conhece modelos raros e exclusivos, descobre curiosidades que poucas pessoas conhecem, explora rankings dos carros mais rápidos, mais caros e mais desejados do planeta, além de encontrar artigos completos sobre modelos que fizeram história.',
  'Nosso objetivo é transformar informação em entretenimento, tornando o universo dos supercarros acessível para todos. Seja você um grande entusiasta do automobilismo ou alguém que simplesmente gosta de conhecer máquinas extraordinárias, sempre haverá algo novo para descobrir por aqui.',
  'Além do portal, o GMATOSCAR está presente nas principais redes sociais, compartilhando vídeos, curiosidades e notícias para levar o melhor conteúdo automotivo a cada vez mais pessoas.',
  'Este site faz parte de um projeto maior: construir a principal referência brasileira em curiosidades, entretenimento e notícias sobre supercarros. Cada artigo publicado é desenvolvido com cuidado para oferecer informações relevantes, linguagem acessível e uma ótima experiência de leitura.',
  'Se você procura curiosidades sobre Ferrari, Lamborghini, Porsche, Bugatti e outras marcas icônicas, quer acompanhar as últimas notícias automotivas ou simplesmente descobrir histórias fascinantes sobre os carros mais exclusivos do mundo, o GMATOSCAR é o lugar certo.',
  'Acelere com a gente e descubra, todos os dias, um novo motivo para se apaixonar pelo universo dos supercarros.',
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
              <p className="text-[#4b5563] text-sm sm:text-base leading-relaxed font-exo mb-7 sm:mb-8">
                Bem-vindo ao GMATOSCAR, um portal dedicado aos apaixonados por supercarros, carros esportivos e ao universo automotivo.
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
                <p key={index} className="text-[#4b5563] text-sm sm:text-base leading-relaxed font-exo">
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
