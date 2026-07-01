export interface Brand {
  id: string;
  name: string;
  country: string;
  description: string;
  logo: string;
  topModelImage: string;
  founded: number;
  topModel: string;
  maxSpeed: string;
  color: string;
  timeline: {
    year: number;
    title: string;
    description: string;
  }[];
  famousModels: {
    slug: string;
    name: string;
    year: string;
    highlight: string;
  }[];
}

export interface ModelPage {
  slug: string;
  name: string;
  brandId: string;
  year: string;
  category: string;
  image: string;
  gallery?: string[];
  description: string;
  keywords: string[];
  specs: {
    power: string;
    topSpeed: string;
    acceleration: string;
    drivetrain: string;
  };
  highlights: string[];
}

export interface RankingItem {
  position: number;
  name: string;
  brand: string;
  topSpeed: string;
  horsepower: string;
  price: string;
  image: string;
  acceleration: string;
}

function createBrandLogo(label: string, background: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675" fill="none">
      <rect width="1200" height="675" rx="48" fill="${background}"/>
      <circle cx="600" cy="270" r="112" fill="rgba(255,255,255,0.10)"/>
      <text x="600" y="290" text-anchor="middle" fill="white" font-family="Arial, Helvetica, sans-serif" font-size="92" font-weight="700" letter-spacing="8">${label}</text>
      <text x="600" y="382" text-anchor="middle" fill="rgba(255,255,255,0.72)" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="600" letter-spacing="6">SUPERCARS</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export const brands: Brand[] = [
  {
    id: 'ferrari',
    name: 'Ferrari',
    country: 'Italia',
    description: 'Referência absoluta em superesportivos italianos, com foco em desempenho, tradição e design.',
    logo: createBrandLogo('Ferrari', '#ff2800'),
    topModelImage: 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=1200',
    founded: 1939,
    topModel: 'Ferrari F80',
    maxSpeed: '350+ km/h',
    color: '#ff2800',
    timeline: [
      { year: 1939, title: 'Fundação da Auto Avio Costruzioni', description: 'Enzo Ferrari inicia a operação que mais tarde se tornaria a Ferrari.' },
      { year: 1947, title: 'Primeiro carro com o nome Ferrari', description: 'O 125 S marca o nascimento oficial da marca como fabricante de automóveis.' },
      { year: 1987, title: 'Era dos ícones V8 e V12', description: 'Modelos como F40 consolidam a Ferrari como referência de desejo e performance.' },
      { year: 2024, title: 'Nova geração híbrida', description: 'A marca combina eletrificação com alta performance em uma nova fase tecnológica.' },
    ],
    famousModels: [
      { slug: 'ferrari-250-gto', name: '250 GTO', year: '1962', highlight: 'O clássico mais valioso e reverenciado da Ferrari.' },
      { slug: 'ferrari-458-italia', name: '458 Italia', year: '2009', highlight: 'O último V8 aspirado puro antes da era turbo.' },
      { slug: 'ferrari-sf90-stradale', name: 'SF90 Stradale', year: '2019', highlight: 'O híbrido plug-in que levou a Ferrari a um novo patamar de potência.' },
      { slug: 'ferrari-f80-preco-motor-potencia-hipercarro-1200cv', name: 'F80', year: '2024', highlight: 'O hypercar que assume o topo da nova linhagem da Ferrari.' },
      { slug: 'ferrari-296-gtb', name: '296 GTB', year: '2021', highlight: 'O V6 híbrido que redefiniu o equilíbrio entre leveza e desempenho.' },
      { slug: 'ferrari-purosangue', name: 'Purosangue', year: '2022', highlight: 'A interpretação da Ferrari para conforto, espaço e performance.' },
    ],
  },
  {
    id: 'lamborghini',
    name: 'Lamborghini',
    country: 'Italia',
    description: 'Marca conhecida pelo visual agressivo, V12 aspirado e uma identidade muito forte nas pistas e nas ruas.',
    logo: createBrandLogo('Lamborghini', '#d4af37'),
    topModelImage: 'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=1200',
    founded: 1963,
    topModel: 'Revuelto',
    maxSpeed: '350 km/h',
    color: '#ffd700',
    timeline: [
      { year: 1963, title: 'Nascimento da marca', description: 'Ferruccio Lamborghini funda a empresa para criar esportivos mais ousados.' },
      { year: 1974, title: 'Miura e Countach', description: 'A Lamborghini ganha fama mundial com carros de desenho radical.' },
      { year: 2011, title: 'V12 como assinatura', description: 'A marca reforça sua identidade com modelos como o Aventador.' },
      { year: 2023, title: 'Era híbrida', description: 'O Revuelto inaugura a nova geração eletrificada da marca.' },
    ],
    famousModels: [
      { slug: 'lamborghini-miura', name: 'Miura', year: '1966', highlight: 'Considerado um dos primeiros supercarros modernos.' },
      { slug: 'lamborghini-countach', name: 'Countach', year: '1974', highlight: 'Linha angular que virou símbolo da Lamborghini.' },
      { slug: 'lamborghini-revuelto', name: 'Revuelto', year: '2023', highlight: 'Primeiro híbrido V12 da nova fase da marca.' },
    ],
  },
  {
    id: 'bugatti',
    name: 'Bugatti',
    country: 'Franca',
    description: 'Hipercarros extremos com foco em velocidade máxima, luxo e engenharia de altíssimo nível.',
    logo: createBrandLogo('Bugatti', '#003087'),
    topModelImage: 'https://images.pexels.com/photos/6311656/pexels-photo-6311656.jpeg?auto=compress&cs=tinysrgb&w=1200',
    founded: 1909,
    topModel: 'Tourbillon',
    maxSpeed: '445 km/h',
    color: '#003087',
    timeline: [
      { year: 1909, title: 'Fundação da Bugatti', description: 'Ettore Bugatti cria uma marca ligada à elegância e à engenharia refinada.' },
      { year: 1998, title: 'Retorno da lenda', description: 'A marca renasce no universo dos supercarros modernos.' },
      { year: 2005, title: 'Veyron quebra paradigmas', description: 'A Bugatti entra para a história com velocidade e luxo extremos.' },
      { year: 2024, title: 'Tourbillon', description: 'A nova era da Bugatti combina design futurista e altíssimo desempenho.' },
    ],
    famousModels: [
      { slug: 'bugatti-veyron', name: 'Veyron', year: '2005', highlight: 'Símbolo da corrida pela velocidade máxima.' },
      { slug: 'bugatti-chiron', name: 'Chiron', year: '2016', highlight: 'Consolidou a Bugatti como referência em hipercarros.' },
      { slug: 'bugatti-tourbillon', name: 'Tourbillon', year: '2024', highlight: 'Nova geração com foco em luxo e tecnologia.' },
    ],
  },
  {
    id: 'mclaren',
    name: 'McLaren',
    country: 'Reino Unido',
    description: 'Marca britânica famosa pela leveza, aerodinâmica e herança direta da Fórmula 1.',
    logo: createBrandLogo('McLaren', '#ff8000'),
    topModelImage: 'https://images.pexels.com/photos/128794/pexels-photo-128794.jpeg?auto=compress&cs=tinysrgb&w=1200',
    founded: 1963,
    topModel: 'McLaren W1',
    maxSpeed: '350 km/h',
    color: '#ff8000',
    timeline: [
      { year: 1963, title: 'Origem nas pistas', description: 'Bruce McLaren funda a empresa com forte DNA de competição.' },
      { year: 1992, title: 'McLaren F1', description: 'Um dos supercarros mais reverenciados de todos os tempos entra em cena.' },
      { year: 2011, title: 'Linha moderna de rua', description: 'A marca amplia a presença fora das pistas com a família de supercarros modernos.' },
      { year: 2024, title: 'W1', description: 'Nova referência da McLaren para a próxima geração de hypercars.' },
    ],
    famousModels: [
      { slug: 'mclaren-f1', name: 'F1', year: '1992', highlight: 'Ícone absoluto entre os supercarros de rua.' },
      { slug: 'mclaren-p1', name: 'P1', year: '2013', highlight: 'Parte da era híbrida das hypercars de elite.' },
      { slug: 'mclaren-w1', name: 'W1', year: '2024', highlight: 'Novo topo da marca, com foco em aerodinâmica e leveza.' },
    ],
  },
  {
    id: 'porsche',
    name: 'Porsche',
    country: 'Alemanha',
    description: 'Combina tradição de pista, engenharia precisa e um portfólio amplo de esportivos icônicos.',
    logo: createBrandLogo('Porsche', '#c8102e'),
    topModelImage: 'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=1200',
    founded: 1931,
    topModel: '911 GT3 RS',
    maxSpeed: '296 km/h',
    color: '#c8102e',
    timeline: [
      { year: 1931, title: 'Fundação da Porsche', description: 'Ferdinand Porsche cria a base para a futura fabricante de esportivos.' },
      { year: 1948, title: 'Primeiro Porsche de rua', description: 'O 356 inaugura a identidade da marca em carros esportivos de produção.' },
      { year: 1963, title: 'Nascimento do 911', description: 'O modelo define a assinatura visual e técnica da Porsche por décadas.' },
      { year: 2020, title: 'Eletrificação esportiva', description: 'A marca expande a performance com tecnologia híbrida e elétrica.' },
    ],
    famousModels: [
      { slug: 'porsche-911', name: '911', year: '1963', highlight: 'O esportivo mais reconhecível da Porsche.' },
      { slug: 'porsche-911-gt3-rs', name: '911 GT3 RS', year: '2023', highlight: 'Foco total em pista e precisão dinâmica.' },
      { slug: 'porsche-taycan', name: 'Taycan', year: '2019', highlight: 'Mostra a evolução elétrica da marca.' },
    ],
  },
  {
    id: 'koenigsegg',
    name: 'Koenigsegg',
    country: 'Suecia',
    description: 'Especialista em hipercarros de produção limitada, recordes e soluções de engenharia ousadas.',
    logo: createBrandLogo('Koenigsegg', '#1a1a1a'),
    topModelImage: 'https://images.pexels.com/photos/1753086/pexels-photo-1753086.jpeg?auto=compress&cs=tinysrgb&w=1200',
    founded: 1994,
    topModel: 'Gemera',
    maxSpeed: '400+ km/h',
    color: '#1a1a1a',
    timeline: [
      { year: 1994, title: 'Fundação em Ängelholm', description: 'Christian von Koenigsegg cria uma das marcas mais inovadoras do setor.' },
      { year: 2002, title: 'Primeiros hypercars', description: 'A marca começa a desafiar nomes muito maiores em desempenho.' },
      { year: 2014, title: 'Regras próprias de engenharia', description: 'A Koenigsegg mostra soluções exclusivas em aerodinâmica e transmissão.' },
      { year: 2024, title: 'Nova geração de recordes', description: 'Modelos recentes reforçam a obsessão por performance e eficiência.' },
    ],
    famousModels: [
      { slug: 'koenigsegg-agera-rs', name: 'Agera RS', year: '2017', highlight: 'Um marco entre os carros de produção mais rápidos.' },
      { slug: 'koenigsegg-jesko', name: 'Jesko', year: '2019', highlight: 'Hipercarro com foco extremo em velocidade e pista.' },
      { slug: 'koenigsegg-gemera', name: 'Gemera', year: '2020', highlight: 'A proposta de 4 lugares da Koenigsegg.' },
    ],
  },
  {
    id: 'pagani',
    name: 'Pagani',
    country: 'Italia',
    description: 'Hipercarros artesanais com acabamento escultural e atenção obsessiva aos detalhes.',
    logo: createBrandLogo('Pagani', '#c0c0c0'),
    topModelImage: 'https://images.pexels.com/photos/2402142/pexels-photo-2402142.jpeg?auto=compress&cs=tinysrgb&w=1200',
    founded: 1992,
    topModel: 'Utopia',
    maxSpeed: '340 km/h',
    color: '#c0c0c0',
    timeline: [
      { year: 1992, title: 'Fundação da Pagani', description: 'Horacio Pagani leva a visão de design artesanal para o mundo dos supercarros.' },
      { year: 1999, title: 'Zonda', description: 'O primeiro grande ícone da marca coloca a Pagani no radar mundial.' },
      { year: 2011, title: 'Huayra', description: 'A Pagani aprofunda o trabalho em aerodinâmica e materiais exóticos.' },
      { year: 2022, title: 'Utopia', description: 'Novo capítulo com foco em leveza, emoção e acabamento artesanal.' },
    ],
    famousModels: [
      { slug: 'pagani-zonda', name: 'Zonda', year: '1999', highlight: 'Modelo que colocou a Pagani entre os grandes nomes.' },
      { slug: 'pagani-huayra', name: 'Huayra', year: '2011', highlight: 'Mistura de arte, velocidade e engenharia.' },
      { slug: 'pagani-utopia', name: 'Utopia', year: '2022', highlight: 'Símbolo atual da filosofia da marca.' },
    ],
  },
  {
    id: 'rimac',
    name: 'Rimac',
    country: 'Croacia',
    description: 'Uma das referências em hiperelétricos, baterias e desempenho instantâneo.',
    logo: createBrandLogo('Rimac', '#0a84ff'),
    topModelImage: 'https://images.pexels.com/photos/1918137/pexels-photo-1918137.jpeg?auto=compress&cs=tinysrgb&w=1200',
    founded: 2009,
    topModel: 'Nevera R',
    maxSpeed: '415 km/h',
    color: '#0a84ff',
    timeline: [
      { year: 2009, title: 'Fundação da Rimac', description: 'A empresa nasce voltada para tecnologia de eletrificação e performance.' },
      { year: 2018, title: 'Nevera ganha forma', description: 'A Rimac apresenta sua visão de hipercarro elétrico de produção.' },
      { year: 2021, title: 'Reconhecimento global', description: 'A marca se consolida como uma das maiores referências em EVs de alta performance.' },
      { year: 2024, title: 'Nevera R', description: 'Evolução extrema do carro que mudou o debate sobre elétricos de alta velocidade.' },
    ],
    famousModels: [
      { slug: 'rimac-concept-one', name: 'Concept One', year: '2011', highlight: 'Primeira grande prova de conceito da marca.' },
      { slug: 'rimac-nevera', name: 'Nevera', year: '2021', highlight: 'Hipercarro elétrico que colocou a Rimac no topo do segmento.' },
      { slug: 'rimac-nevera-r', name: 'Nevera R', year: '2024', highlight: 'Evolução mais agressiva do projeto elétrico.' },
    ],
  },
];

export const modelPages: ModelPage[] = [
  {
    slug: 'ferrari-f40',
    name: 'Ferrari F40',
    brandId: 'ferrari',
    year: '1987',
    category: 'Supercarro clássico',
    image: 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'A Ferrari F40 é um dos modelos mais icônicos da história dos supercarros e um marco da engenharia dos anos 80.',
    keywords: ['ferrari f40', 'f40 ficha tecnica', 'ferrari classica'],
    specs: { power: '478 cv', topSpeed: '324 km/h', acceleration: '3.8 s', drivetrain: 'RWD' },
    highlights: ['Último modelo aprovado por Enzo Ferrari', 'Construção focada em baixo peso', 'Design agressivo e atemporal'],
  },
  {
    slug: 'ferrari-250-gto',
    name: 'Ferrari 250 GTO',
    brandId: 'ferrari',
    year: '1962',
    category: 'Clássico de competição',
    image: 'https://images.pexels.com/photos/7601311/pexels-photo-7601311.jpeg?auto=compress&cs=tinysrgb&w=1200',
    gallery: [
      'https://images.pexels.com/photos/7601311/pexels-photo-7601311.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1015568/pexels-photo-1015568.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'A Ferrari 250 GTO é um dos carros mais cobiçados da história, símbolo absoluto de raridade, corrida e valor cultural.',
    keywords: ['ferrari 250 gto', '250 gto ficha tecnica', 'ferrari classico'],
    specs: { power: '300 cv', topSpeed: '280 km/h', acceleration: '6.1 s', drivetrain: 'RWD' },
    highlights: ['Ícone máximo da era clássica da Ferrari', 'Construção voltada para homologação e competição', 'Um dos automóveis mais valiosos do mundo'],
  },
  {
    slug: 'ferrari-enzo',
    name: 'Ferrari Enzo',
    brandId: 'ferrari',
    year: '2002',
    category: 'Hypercars',
    image: 'https://images.pexels.com/photos/1627877/pexels-photo-1627877.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'A Ferrari Enzo trouxe tecnologias derivadas da Fórmula 1 para um carro de rua em uma edição extremamente limitada.',
    keywords: ['ferrari enzo', 'enzo ferrari carro', 'ferrari enzo especificacoes'],
    specs: { power: '660 cv', topSpeed: '350 km/h', acceleration: '3.6 s', drivetrain: 'RWD' },
    highlights: ['Produção limitada e alta exclusividade', 'DNA de Fórmula 1 no conjunto mecânico', 'Modelo de transição para a era moderna da Ferrari'],
  },
  {
    slug: 'ferrari-458-italia',
    name: 'Ferrari 458 Italia',
    brandId: 'ferrari',
    year: '2009',
    category: 'Supercarro V8',
    image: 'https://images.pexels.com/photos/174854/pexels-photo-174854.jpeg?auto=compress&cs=tinysrgb&w=1200',
    gallery: [
      'https://images.pexels.com/photos/174854/pexels-photo-174854.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'A Ferrari 458 Italia marcou uma geração com resposta imediata, desenho marcante e um dos V8 aspirados mais celebrados da história recente da marca.',
    keywords: ['ferrari 458 italia', '458 italia ficha tecnica', 'ferrari v8 aspirado'],
    specs: { power: '570 cv', topSpeed: '325 km/h', acceleration: '3.4 s', drivetrain: 'RWD' },
    highlights: ['Último grande V8 aspirado da Ferrari antes da virada turbo', 'Desenho assinado para emocionar em qualquer ângulo', 'Equilíbrio entre pista e uso na rua'],
  },
  {
    slug: 'ferrari-laferrari',
    name: 'Ferrari LaFerrari',
    brandId: 'ferrari',
    year: '2013',
    category: 'Hypercars híbridos',
    image: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'A LaFerrari marca a entrada da fabricante italiana no universo híbrido com foco absoluto em performance.',
    keywords: ['laferrari', 'ferrari hibrida', 'laferrari ficha tecnica'],
    specs: { power: '963 cv', topSpeed: '350+ km/h', acceleration: '2.8 s', drivetrain: 'RWD' },
    highlights: ['Sistema híbrido com foco em desempenho', 'Uma das Ferrari mais desejadas da década', 'Combina eletrificação e motor V12 aspirado'],
  },
  {
    slug: 'ferrari-sf90-stradale',
    name: 'Ferrari SF90 Stradale',
    brandId: 'ferrari',
    year: '2019',
    category: 'Supercarro híbrido plug-in',
    image: 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1200',
    gallery: [
      'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'A SF90 Stradale representa a evolução da Ferrari em eficiência, tração integral e aceleração brutal.',
    keywords: ['ferrari sf90', 'sf90 stradale', 'ferrari sf90 performance'],
    specs: { power: '1000 cv', topSpeed: '340 km/h', acceleration: '2.5 s', drivetrain: 'AWD' },
    highlights: ['Primeiro PHEV de produção em série da Ferrari', 'Tração integral em um novo pacote dinâmico', 'Top performance com usabilidade no dia a dia'],
  },
  {
    slug: 'ferrari-296-gtb',
    name: 'Ferrari 296 GTB',
    brandId: 'ferrari',
    year: '2021',
    category: 'Supercarro híbrido V6',
    image: 'https://images.pexels.com/photos/1273986/pexels-photo-1273986.jpeg?auto=compress&cs=tinysrgb&w=1200',
    gallery: [
      'https://images.pexels.com/photos/1273986/pexels-photo-1273986.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'A Ferrari 296 GTB inaugura uma fase importante ao combinar um V6 híbrido com comportamento muito afiado e respostas de supercarro moderno.',
    keywords: ['ferrari 296 gtb', '296 gtb ficha tecnica', 'ferrari v6 hibrido'],
    specs: { power: '830 cv', topSpeed: '330 km/h', acceleration: '2.9 s', drivetrain: 'RWD' },
    highlights: ['Primeiro Ferrari de rua com V6 híbrido moderno', 'Arquitetura voltada para leveza e precisão', 'Nova linguagem da marca para carros de motor central'],
  },
  {
    slug: 'ferrari-purosangue',
    name: 'Ferrari Purosangue',
    brandId: 'ferrari',
    year: '2022',
    category: 'Crossover de alta performance',
    image: 'https://images.pexels.com/photos/6311656/pexels-photo-6311656.jpeg?auto=compress&cs=tinysrgb&w=1200',
    gallery: [
      'https://images.pexels.com/photos/6311656/pexels-photo-6311656.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1607109/pexels-photo-1607109.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'A Ferrari Purosangue expande o portfólio da marca sem abrir mão do foco em performance e comportamento esportivo.',
    keywords: ['ferrari purosangue', 'ferrari suv', 'purosangue especificacoes'],
    specs: { power: '725 cv', topSpeed: '310 km/h', acceleration: '3.3 s', drivetrain: 'AWD' },
    highlights: ['Primeiro modelo de 4 portas da marca', 'Motor V12 naturalmente aspirado', 'Mistura de espaço, luxo e performance'],
  },
];

export const rankings: RankingItem[] = [
  {
    position: 1,
    name: 'Nevera R',
    brand: 'Rimac',
    topSpeed: '415 km/h',
    horsepower: '2.128 CV',
    price: 'R$ 14.500.000',
    image: 'https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg?auto=compress&cs=tinysrgb&w=800',
    acceleration: '1,74 s',
  },
  {
    position: 2,
    name: 'Tourbillon',
    brand: 'Bugatti',
    topSpeed: '445 km/h',
    horsepower: '1.800 CV',
    price: 'R$ 28.000.000',
    image: 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=800',
    acceleration: '2,0 s',
  },
  {
    position: 3,
    name: 'Gemera',
    brand: 'Koenigsegg',
    topSpeed: '400 km/h',
    horsepower: '2.300 CV',
    price: 'R$ 18.200.000',
    image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800',
    acceleration: '1,9 s',
  },
  {
    position: 4,
    name: 'F80',
    brand: 'Ferrari',
    topSpeed: '350 km/h',
    horsepower: '1.200 CV',
    price: 'R$ 12.800.000',
    image: 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=800',
    acceleration: '2,15 s',
  },
  {
    position: 5,
    name: 'W1',
    brand: 'McLaren',
    topSpeed: '350 km/h',
    horsepower: '1.275 CV',
    price: 'R$ 10.500.000',
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800',
    acceleration: '2,7 s',
  },
];

export const categories = [
  'Todos',
  'Lançamentos',
  'Ferrari',
  'Lamborghini',
  'Bugatti',
  'McLaren',
  'Porsche',
  'Koenigsegg',
  'Elétricos',
  'Rankings',
  'Aston Martin',
];
