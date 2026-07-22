import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsCard from '@/components/NewsCard';
import { brands, modelPages } from '@/lib/data';
import { getPosts, type Post } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Ferrari: historia completa, modelos e noticias | GMATOSCAR',
  description:
    'Enciclopedia da Ferrari com historia completa, fundacao, pais de origem, logotipo, linha do tempo detalhada, curiosidades, modelos, artigos relacionados e ultimas noticias.',
  keywords: [
    'ferrari',
    'historia da ferrari',
    'ferrari fundacao',
    'ferrari pais de origem',
    'logotipo ferrari',
    'modelos ferrari',
    'ferrari noticias',
    'ferrari curiosidades',
    'ferrari linha do tempo',
    'supercarros ferrari',
  ],
  alternates: {
    canonical: '/marcas/ferrari',
  },
  openGraph: {
    title: 'Ferrari: historia completa, modelos e noticias | GMATOSCAR',
    description:
      'Pagina enciclopedica da Ferrari com contexto historico, tecnico e cultural para quem quer entender a marca em profundidade.',
    url: 'https://gmatoscar.com.br/marcas/ferrari',
    siteName: 'GMATOSCAR',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ferrari: historia completa, modelos e noticias | GMATOSCAR',
    description:
      'Tudo sobre a Ferrari em uma pagina completa: origem, evolucao, modelos iconicos e noticias recentes.',
  },
};

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function getFerrariPosts(posts: Post[]) {
  return posts
    .filter((post) => {
      const text = normalizeText([post.title, post.excerpt, post.content, post.category, post.slug].join(' '));
      return text.includes('ferrari');
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

const historyChapters = [
  {
    title: 'Origem e visao de Enzo Ferrari',
    paragraphs: [
      'A historia da Ferrari comeca antes do primeiro carro de rua. Enzo Ferrari construiu sua reputacao no automobilismo ao trabalhar com equipes de competicao e ao criar uma mentalidade focada em performance, disciplina tecnica e evolucao continua.',
      'Essa base de competicao definiu um principio que permanece ate hoje: os carros de rua devem carregar o mesmo espirito das pistas, com resposta dinamica, precisao de engenharia e identidade visual inconfundivel.',
    ],
  },
  {
    title: 'Nascimento da fabricante',
    paragraphs: [
      'A Ferrari foi fundada em 1939 e iniciou sua trajetoria de fabricante com o 125 S em 1947. A partir desse momento, a marca italiana passou a combinar tradicao mecanica, design autoral e inovacao tecnologica.',
      'Nos anos seguintes, a empresa consolidou sua presenca em corridas e em modelos de producao limitada, criando um posicionamento premium baseado em exclusividade, resultado esportivo e desejo global.',
    ],
  },
  {
    title: 'Consolidacao global',
    paragraphs: [
      'Ao longo das decadas, a Ferrari evoluiu de uma estrutura artesanal para uma marca global de alto desempenho, mantendo o foco em motores de alta rotacao, acerto de chassis refinado e aerodinamica cada vez mais eficiente.',
      'Modelos como 250 GTO, F40, Enzo, LaFerrari, SF90 e F80 representam diferentes fases dessa evolucao, sempre com o mesmo objetivo: entregar emocao e desempenho no mais alto nivel do setor automotivo.',
    ],
  },
];

const encyclopediaTimeline = [
  {
    year: '1929',
    title: 'Fundacao da Scuderia Ferrari',
    description: 'Enzo Ferrari cria a Scuderia Ferrari como estrutura voltada para corridas e preparacao esportiva.',
  },
  {
    year: '1939',
    title: 'Nascimento da Auto Avio Costruzioni',
    description: 'Marco empresarial que antecede a criacao da Ferrari como fabricante de automoveis.',
  },
  {
    year: '1947',
    title: 'Primeiro carro com nome Ferrari',
    description: 'O 125 S inaugura oficialmente a fase da Ferrari como marca automotiva de alto desempenho.',
  },
  {
    year: '1950',
    title: 'Entrada na Formula 1 moderna',
    description: 'A Ferrari participa da temporada inaugural da Formula 1 e passa a construir seu legado na categoria.',
  },
  {
    year: '1962',
    title: 'Era 250 GTO',
    description: 'A Ferrari 250 GTO se torna simbolo de corrida, exclusividade e valor historico no mercado automotivo.',
  },
  {
    year: '1969',
    title: 'Parceria industrial com a Fiat',
    description: 'Acordo importante para expansao produtiva, mantendo o DNA esportivo da marca.',
  },
  {
    year: '1987',
    title: 'Lancamento da F40',
    description: 'A F40 consolida a imagem da Ferrari como referencia de supercarro extremo e visceral.',
  },
  {
    year: '2002',
    title: 'Ferrari Enzo',
    description: 'A marca aplica tecnologia inspirada na Formula 1 para criar um dos carros mais icones do seculo.',
  },
  {
    year: '2013',
    title: 'LaFerrari e a fase hibrida',
    description: 'A Ferrari inicia uma nova etapa com eletrificacao orientada a performance.',
  },
  {
    year: '2019',
    title: 'SF90 Stradale',
    description: 'Primeiro plug-in hybrid de producao em serie da marca, com foco em potencia e eficiencia dinamica.',
  },
  {
    year: '2022',
    title: 'Chegada da Purosangue',
    description: 'A Ferrari amplia o portifolio com um modelo de quatro portas sem abandonar a identidade esportiva.',
  },
  {
    year: '2024',
    title: 'Nova geracao com a F80',
    description: 'A F80 representa o topo da evolucao recente da marca em engenharia, aerodinamica e desempenho.',
  },
];

const logoDetails = [
  {
    title: 'Cavallino Rampante',
    text: 'O cavalo empinado simboliza forca, velocidade e espirito competitivo. Ele se tornou o elemento central da identidade visual da Ferrari e um dos emblemas mais reconhecidos do mundo.',
  },
  {
    title: 'Fundo amarelo',
    text: 'O amarelo remete a Modena, cidade historicamente ligada a Enzo Ferrari. Esse detalhe reforca a origem italiana da marca e sua conexao cultural.',
  },
  {
    title: 'Faixas tricolores',
    text: 'A presenca das cores da bandeira italiana no topo do escudo reforca o orgulho nacional e a heranca esportiva da fabricante.',
  },
  {
    title: 'Tipografia Ferrari',
    text: 'A escrita Ferrari no emblema ajuda a consolidar a assinatura visual da marca, com leitura imediata e forte memorizacao global.',
  },
];

const curiosities = [
  'A Ferrari manteve por decadas a estrategia de producao limitada para preservar exclusividade e valor de marca.',
  'A relacao entre corridas e carros de rua sempre foi um dos pilares tecnicos da fabricante.',
  'Modelos de serie especial costumam introduzir tecnologias que depois influenciam toda a linha da marca.',
  'A Ferrari e frequentemente usada como referencia de design automotivo em escolas de engenharia e estilo automotivo.',
  'A 250 GTO e constantemente citada entre os carros classicos mais valiosos ja negociados no mundo.',
  'A F40 marcou uma geracao por seu comportamento analogico e foco total em desempenho bruto.',
  'A marca evoluiu de motores aspirados iconicos para uma fase de hibridizacao sem perder foco em performance.',
  'A Ferrari trabalha fortemente com aerodinamica ativa para ganho de estabilidade e eficiencia em alta velocidade.',
  'A experiencia de dirigir um Ferrari combina desempenho, ergonomia esportiva e feedback mecanico preciso.',
  'No mercado de colecionadores, historico de manutencao e originalidade influenciam fortemente o valor de cada unidade.',
];

const modelGenerations = [
  {
    era: 'Classicos de corrida e colecionismo',
    models: ['125 S', '166 MM', '250 Testa Rossa', '250 GTO', '275 GTB'],
  },
  {
    era: 'Supercarros de transicao e mito moderno',
    models: ['288 GTO', 'F40', 'F50', 'Enzo Ferrari'],
  },
  {
    era: 'Nova era de eletrificacao e alta tecnologia',
    models: ['LaFerrari', 'SF90 Stradale', '296 GTB', 'Purosangue', 'F80'],
  },
];

const faqItems = [
  {
    question: 'Quando a Ferrari foi fundada?',
    answer: 'A Ferrari foi fundada em 1939 e iniciou a fase de fabricante com o 125 S em 1947.',
  },
  {
    question: 'Qual e o pais de origem da Ferrari?',
    answer: 'A Ferrari e uma fabricante italiana, com origem ligada a Modena e forte tradicao no automobilismo.',
  },
  {
    question: 'Por que o logotipo da Ferrari e tao famoso?',
    answer: 'Porque combina simbolismo historico, identidade nacional italiana e associacao direta com desempenho e exclusividade.',
  },
  {
    question: 'Quais modelos sao referencias historicas da Ferrari?',
    answer: '250 GTO, F40, Enzo, LaFerrari, SF90 Stradale e F80 sao alguns dos modelos mais representativos da marca.',
  },
];

export default async function FerrariBrandPage() {
  const ferrari = brands.find((brand) => brand.id === 'ferrari');
  if (!ferrari) notFound();

  const posts = await getPosts({ includePrivateModelPosts: true });
  const ferrariNews = getFerrariPosts(posts).slice(0, 6);
  const relatedArticles = getFerrariPosts(posts).slice(0, 6);
  const ferrariModels = modelPages.filter((model) => model.brandId === 'ferrari').slice(0, 10);

  const brandSchema = {
    '@context': 'https://schema.org',
    '@type': 'Brand',
    name: ferrari.name,
    description: ferrari.description,
    foundingDate: String(ferrari.founded),
    slogan: 'Paixao por supercarros de alto desempenho',
    logo: ferrari.logo,
    url: 'https://gmatoscar.com.br/marcas/ferrari',
    sameAs: [
      'https://www.instagram.com/ferrari/',
      'https://www.facebook.com/Ferrari/',
      'https://www.youtube.com/ferrari',
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://gmatoscar.com.br/' },
      { '@type': 'ListItem', position: 2, name: 'Marcas', item: 'https://gmatoscar.com.br/marcas' },
      { '@type': 'ListItem', position: 3, name: 'Ferrari', item: 'https://gmatoscar.com.br/marcas/ferrari' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(brandSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar />

      <header className="pt-28 sm:pt-32 pb-10 px-4 sm:px-6 lg:px-8 border-b border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto">
          <Link href="/marcas" className="text-[#6b7280] hover:text-[#111827] text-sm font-exo transition-colors">
            Voltar para Marcas
          </Link>

          <p className="mt-6 text-[#dc2626] text-xs uppercase tracking-[0.35em] font-bold font-rajdhani">Marca</p>
          <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-serif font-semibold text-[#111827]">Ferrari</h1>
          <p className="mt-4 text-[#374151] text-sm sm:text-base leading-relaxed font-exo max-w-3xl">
            Conheça a história da Ferrari, seus modelos mais famosos, curiosidades, notícias e tudo sobre a fabricante italiana.
          </p>

          <nav className="mt-8 flex flex-wrap gap-2.5" aria-label="Navegacao por secoes da Ferrari">
            {[
              'historia',
              'fundacao',
              'pais-de-origem',
              'logotipo',
              'linha-do-tempo',
              'curiosidades',
              'modelos',
              'artigos-relacionados',
              'ultimas-noticias',
            ].map((anchor) => (
              <a
                key={anchor}
                href={`#${anchor}`}
                className="rounded-full border border-[#d1d5db] bg-white px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-[#374151] font-rajdhani font-semibold hover:border-[#dc2626] hover:text-[#dc2626] transition-colors"
              >
                {anchor.replace(/-/g, ' ')}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <section className="px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          <article id="historia" className="lg:col-span-8 rounded-2xl border border-[#e5e7eb] bg-white p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl text-[#111827] font-rajdhani font-bold mb-5">Historia</h2>
            <div className="space-y-7">
              {historyChapters.map((chapter) => (
                <div key={chapter.title} className="border-l-2 border-[#dc2626]/30 pl-5">
                  <h3 className="text-xl text-[#111827] font-rajdhani font-bold mb-3">{chapter.title}</h3>
                  {chapter.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-[#1f2937] text-sm sm:text-base leading-relaxed font-exo mb-3 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </article>

          <aside className="lg:col-span-4 rounded-2xl border border-[#e5e7eb] bg-[#fafafa] p-6 sm:p-7">
            <h2 className="text-xl text-[#111827] font-rajdhani font-bold mb-4">Resumo da marca</h2>
            <div className="space-y-3">
              <div className="rounded-xl border border-[#e5e7eb] bg-white p-4">
                <p className="text-[#6b7280] text-xs uppercase tracking-[0.25em] font-rajdhani mb-2">Fundacao</p>
                <p className="text-[#111827] text-2xl font-rajdhani font-bold">{ferrari.founded}</p>
              </div>
              <div className="rounded-xl border border-[#e5e7eb] bg-white p-4">
                <p className="text-[#6b7280] text-xs uppercase tracking-[0.25em] font-rajdhani mb-2">Pais de origem</p>
                <p className="text-[#111827] text-2xl font-rajdhani font-bold">{ferrari.country}</p>
              </div>
              <div className="rounded-xl border border-[#e5e7eb] bg-white p-4">
                <p className="text-[#6b7280] text-xs uppercase tracking-[0.25em] font-rajdhani mb-2">Modelo destaque</p>
                <p className="text-[#dc2626] text-2xl font-rajdhani font-bold">{ferrari.topModel}</p>
              </div>
              <div className="rounded-xl border border-[#e5e7eb] bg-white p-4">
                <p className="text-[#6b7280] text-xs uppercase tracking-[0.25em] font-rajdhani mb-2">Velocidade de referencia</p>
                <p className="text-[#111827] text-2xl font-rajdhani font-bold">{ferrari.maxSpeed}</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          <article id="fundacao" className="rounded-2xl border border-[#e5e7eb] bg-white p-6 sm:p-8">
            <h2 className="text-2xl text-[#111827] font-rajdhani font-bold mb-4">Fundacao</h2>
            <p className="text-[#1f2937] text-sm sm:text-base leading-relaxed font-exo mb-4">
              A fundacao da Ferrari aconteceu em {ferrari.founded}. A empresa nasceu com mentalidade esportiva e foco
              em excelencia mecanica, em um contexto de forte transformacao da industria automotiva europeia.
            </p>
            <p className="text-[#1f2937] text-sm sm:text-base leading-relaxed font-exo">
              Desde o inicio, a Ferrari adotou uma estrategia de posicionamento premium baseada em baixa escala,
              tecnologia aplicada e valor de marca. Esse modelo ajudou a construir uma identidade forte e sustentavel
              ao longo das decadas.
            </p>
          </article>

          <article id="pais-de-origem" className="rounded-2xl border border-[#e5e7eb] bg-white p-6 sm:p-8">
            <h2 className="text-2xl text-[#111827] font-rajdhani font-bold mb-4">Pais de origem</h2>
            <p className="text-[#1f2937] text-sm sm:text-base leading-relaxed font-exo mb-4">
              A Ferrari tem origem na {ferrari.country}, pais com papel historico central no design automotivo,
              motorsport e engenharia de alto desempenho. Esse ambiente cultural ajudou a moldar a assinatura tecnica e
              estetica da marca.
            </p>
            <p className="text-[#1f2937] text-sm sm:text-base leading-relaxed font-exo">
              A conexao com a tradicao italiana pode ser percebida em proporcoes de carroceria, acabamento interno,
              cuidado artesanal e em uma linguagem visual que combina agressividade e elegancia.
            </p>
          </article>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-10">
        <div id="logotipo" className="max-w-7xl mx-auto rounded-2xl border border-[#e5e7eb] bg-white p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl text-[#111827] font-rajdhani font-bold mb-6">Logotipo</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-5">
              <img src={ferrari.logo} alt="Logotipo da Ferrari" className="w-full h-auto rounded-lg" loading="lazy" />
            </div>
            <div className="space-y-4">
              {logoDetails.map((detail) => (
                <article key={detail.title} className="rounded-xl border border-[#e5e7eb] bg-[#fafafa] p-4">
                  <h3 className="text-[#111827] text-lg font-rajdhani font-bold mb-2">{detail.title}</h3>
                  <p className="text-[#1f2937] text-sm sm:text-base leading-relaxed font-exo">{detail.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-10">
        <div id="linha-do-tempo" className="max-w-7xl mx-auto rounded-2xl border border-[#e5e7eb] bg-white p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl text-[#111827] font-rajdhani font-bold mb-6">Linha do tempo</h2>
          <div className="space-y-5">
            {encyclopediaTimeline.map((item) => (
              <article key={`${item.year}-${item.title}`} className="border-l-2 border-[#dc2626]/35 pl-4">
                <p className="text-[#dc2626] text-xs uppercase tracking-[0.28em] font-rajdhani font-bold mb-1">{item.year}</p>
                <h3 className="text-[#111827] text-lg font-rajdhani font-bold mb-1">{item.title}</h3>
                <p className="text-[#374151] text-sm sm:text-base leading-relaxed font-exo">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-10">
        <div id="curiosidades" className="max-w-7xl mx-auto rounded-2xl border border-[#e5e7eb] bg-white p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl text-[#111827] font-rajdhani font-bold mb-6">Curiosidades</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {curiosities.map((curiosity) => (
              <li
                key={curiosity}
                className="rounded-xl border border-[#e5e7eb] bg-[#fafafa] p-4 text-[#1f2937] text-sm sm:text-base font-exo leading-relaxed"
              >
                {curiosity}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-10">
        <div id="modelos" className="max-w-7xl mx-auto rounded-2xl border border-[#e5e7eb] bg-white p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl text-[#111827] font-rajdhani font-bold mb-6">Modelos</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
            {modelGenerations.map((group) => (
              <article key={group.era} className="rounded-xl border border-[#e5e7eb] bg-[#fafafa] p-4">
                <h3 className="text-[#111827] text-lg font-rajdhani font-bold mb-3">{group.era}</h3>
                <ul className="space-y-1.5 text-[#374151] text-sm font-exo">
                  {group.models.map((model) => (
                    <li key={model}>- {model}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <h3 className="text-xl text-[#111827] font-rajdhani font-bold mb-4">Modelos com pagina dedicada no GMATOSCAR</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ferrariModels.map((model) => (
              <Link
                key={model.slug}
                href={`/modelos/${model.slug}`}
                className="rounded-xl border border-[#e5e7eb] bg-[#fafafa] p-4 hover:border-[#dc2626]/45 hover:bg-white transition-colors"
              >
                <h4 className="text-[#111827] text-lg font-rajdhani font-bold">{model.name}</h4>
                <p className="text-[#6b7280] text-xs uppercase tracking-[0.24em] font-rajdhani mt-2">{model.year}</p>
                <p className="text-[#374151] text-sm font-exo mt-3 leading-relaxed">{model.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-10">
        <div id="artigos-relacionados" className="max-w-7xl mx-auto rounded-2xl border border-[#e5e7eb] bg-white p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl text-[#111827] font-rajdhani font-bold mb-6">Artigos relacionados</h2>
          {relatedArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedArticles.map((post) => (
                <Link
                  key={post.id}
                  href={`/noticias/${post.slug}`}
                  className="rounded-xl border border-[#e5e7eb] bg-[#fafafa] p-4 hover:border-[#dc2626]/45 hover:bg-white transition-colors"
                >
                  <p className="text-[#dc2626] text-xs uppercase tracking-[0.24em] font-rajdhani font-bold mb-2">{post.category}</p>
                  <h3 className="text-[#111827] text-lg font-rajdhani font-bold mb-2">{post.title}</h3>
                  <p className="text-[#374151] text-sm font-exo leading-relaxed">{post.excerpt}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-[#4b5563] text-sm font-exo">Ainda nao ha artigos relacionados da Ferrari.</p>
          )}
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-7xl mx-auto rounded-2xl border border-[#e5e7eb] bg-white p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl text-[#111827] font-rajdhani font-bold mb-6">Perguntas frequentes sobre a Ferrari</h2>
          <div className="space-y-4">
            {faqItems.map((item) => (
              <article key={item.question} className="rounded-xl border border-[#e5e7eb] bg-[#fafafa] p-4">
                <h3 className="text-[#111827] text-lg font-rajdhani font-bold mb-2">{item.question}</h3>
                <p className="text-[#374151] text-sm sm:text-base font-exo leading-relaxed">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div id="ultimas-noticias" className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl text-[#111827] font-rajdhani font-bold mb-6">Ultimas noticias</h2>
          {ferrariNews.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ferrariNews.map((post) => (
                <NewsCard key={post.id} item={post} variant="related" theme="light" />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 text-[#4b5563] font-exo text-sm">
              Ainda nao temos noticias publicadas da Ferrari.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
