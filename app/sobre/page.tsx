import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Sobre o GMATOSCAR',
  description:
    'Conheça o GMATOSCAR, o maior canal brasileiro sobre supercarros, hypercars e automóveis de alto desempenho.',
};

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(148,163,184,0.08)_0%,transparent_60%)]" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-[#dc2626] text-xs font-bold uppercase tracking-[0.3em] font-rajdhani mb-4">
              Sobre
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-semibold text-[#111827] leading-tight mb-5 sm:mb-6">
              Sobre o <span className="text-[#dc2626]">GMATOSCAR</span>
            </h1>
            <div className="w-20 h-1 bg-[#dc2626] rounded-full mx-auto" />
          </div>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <article className="bg-white border border-[#e5e7eb] rounded-sm p-6 sm:p-10">
            <div className="space-y-6 text-[#1f2937] font-exo">
              <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#111827] mb-2">
                Mais do que carros. O extraordinário sobre quatro rodas.
              </h2>

              <p className="text-sm sm:text-base leading-relaxed">
                O GMATOSCAR nasceu de uma paixão pelos carros que vão além do comum.
              </p>

              <p className="text-sm sm:text-base leading-relaxed">
                Aqui, acreditamos que um supercarro não é definido apenas pelo preço, pela velocidade, pela potência ou pelo emblema estampado no capô. Para nós, um supercarro é uma máquina que foi levada ao extremo para cumprir uma missão extraordinária.
              </p>

              <p className="text-sm sm:text-base leading-relaxed">
                E é justamente essa ideia que define o GMATOSCAR.
              </p>

              <p className="text-sm sm:text-base leading-relaxed">
                Uma Ferrari construída para alcançar velocidades impressionantes é um supercarro. Mas um Toyota completamente preparado para atravessar as dunas de um deserto também pode ser.
              </p>

              <p className="text-sm sm:text-base leading-relaxed">
                Um carro de Fórmula 1 desenvolvido para disputar décimos de segundo em uma pista é um supercarro. Uma máquina de rally preparada para enfrentar neve, lama e pedras também.
              </p>

              <p className="text-sm sm:text-base leading-relaxed">
                Um hipercarro que quebra recordes de velocidade é extraordinário. Mas um veículo criado para subir montanhas, atravessar terrenos impossíveis ou resistir durante horas às condições mais extremas também merece esse lugar.
              </p>

              <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#111827] mt-8 mb-2">
                O que você encontra no GMATOSCAR
              </h2>

              <p className="text-sm sm:text-base leading-relaxed">
                O GMATOSCAR é um portal brasileiro dedicado ao universo dos supercarros e às máquinas mais extraordinárias do mundo.
              </p>

              <p className="text-sm sm:text-base leading-relaxed">
                Aqui você encontra:
              </p>

              <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base leading-relaxed">
                <li>Notícias do mundo automotivo;</li>
                <li>Curiosidades sobre carros incríveis;</li>
                <li>Histórias de modelos que marcaram época;</li>
                <li>Supercarros de rua e hipercarros;</li>
                <li>Carros de competição;</li>
                <li>Máquinas de velocidade e resistência;</li>
                <li>Veículos preparados para terrenos extremos;</li>
                <li>Carros de luxo e alta exclusividade;</li>
                <li>Projetos de engenharia fora do comum;</li>
                <li>Rankings e comparações;</li>
                <li>Informações sobre grandes fabricantes e modelos históricos.</li>
              </ul>

              <p className="text-sm sm:text-base leading-relaxed">
                Falamos sobre Ferrari, Lamborghini, Porsche, Bugatti, McLaren, Koenigsegg, Pagani e muitas outras marcas.
              </p>

              <p className="text-sm sm:text-base leading-relaxed">
                Mas o GMATOSCAR não se limita aos nomes mais famosos da indústria.
              </p>

              <p className="text-sm sm:text-base leading-relaxed">
                Se existe um carro capaz de fazer algo extraordinário, ele pode encontrar seu lugar aqui.
              </p>

              <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#111827] mt-8 mb-2">
                Nossa visão sobre os supercarros
              </h2>

              <p className="text-sm sm:text-base leading-relaxed">
                A palavra "supercarro" não possui uma definição única e universal.
              </p>

              <p className="text-sm sm:text-base leading-relaxed">
                Por isso, o GMATOSCAR possui a sua própria maneira de enxergar esse conceito.
              </p>

              <p className="text-sm sm:text-base leading-relaxed">
                Para nós, um supercarro é aquele que ultrapassa os limites de um automóvel comum.
              </p>

              <p className="text-sm sm:text-base leading-relaxed">
                Pode ser pela velocidade.
              </p>

              <p className="text-sm sm:text-base leading-relaxed">
                Pelo luxo.
              </p>

              <p className="text-sm sm:text-base leading-relaxed">
                Pela tecnologia.
              </p>

              <p className="text-sm sm:text-base leading-relaxed">
                Pela resistência.
              </p>

              <p className="text-sm sm:text-base leading-relaxed">
                Pela capacidade de enfrentar obstáculos.
              </p>

              <p className="text-sm sm:text-base leading-relaxed">
                Pela engenharia.
              </p>

              <p className="text-sm sm:text-base leading-relaxed">
                Pela competição.
              </p>

              <p className="text-sm sm:text-base leading-relaxed">
                Ou simplesmente pela história que construiu.
              </p>

              <p className="text-sm sm:text-base leading-relaxed">
                Essa visão permite que o GMATOSCAR explore um universo muito maior do que apenas os carros mais caros e rápidos do planeta.
              </p>

              <p className="text-sm sm:text-base leading-relaxed">
                Porque existem muitas maneiras de criar um carro extraordinário.
              </p>

              <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#111827] mt-8 mb-2">
                Conteúdo para quem é apaixonado por carros
              </h2>

              <p className="text-sm sm:text-base leading-relaxed">
                Nosso objetivo é transformar informação em entretenimento.
              </p>

              <p className="text-sm sm:text-base leading-relaxed">
                Não queremos apenas apresentar números de potência, velocidade máxima ou ficha técnica. Queremos contar as histórias por trás das máquinas, revelar curiosidades que pouca gente conhece e mostrar o que torna cada carro especial.
              </p>

              <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#111827] mt-8 mb-2">
                Nossa missão
              </h2>

              <p className="text-sm sm:text-base leading-relaxed">
                Nossa missão é descobrir, contar e compartilhar as histórias dos carros mais extraordinários do mundo, e muitas vezes a história de um Supercarro carrega uma cultura.
              </p>

              <p className="text-sm sm:text-base leading-relaxed">
                Queremos criar um lugar onde qualquer pessoa possa descobrir uma nova máquina, conhecer sua história, entender sua importância e se surpreender com aquilo que os automóveis são capazes de fazer.
              </p>

              <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#111827] mt-8 mb-2">
                O futuro do GMATOSCAR
              </h2>

              <p className="text-sm sm:text-base leading-relaxed">
                O GMATOSCAR nasceu na internet, mas a nossa ambição vai muito além das redes sociais.
              </p>

              <p className="text-sm sm:text-base leading-relaxed">
                Queremos construir uma das maiores referências brasileiras em conteúdo sobre supercarros, criando uma comunidade de pessoas apaixonadas por velocidade, luxo, competição, engenharia, história e, acima de tudo, por máquinas extraordinárias.
              </p>

              <p className="text-sm sm:text-base leading-relaxed">
                Porque, no final, essa é a essência do GMATOSCAR:
              </p>

              <blockquote className="border-l-4 border-[#dc2626] pl-4 py-2 italic text-[#4b5563] bg-[#f9fafb]">
                <strong className="font-bold text-[#111827]">Não importa apenas o carro. Importa o que ele é capaz de fazer.</strong>
              </blockquote>

              <p className="text-sm sm:text-base leading-relaxed font-bold text-[#111827]">
                Bem-vindo ao GMATOSCAR.
              </p>

              <p className="text-sm sm:text-base leading-relaxed font-bold text-[#111827]">
                O universo dos carros que vão além do comum.
              </p>
            </div>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}
