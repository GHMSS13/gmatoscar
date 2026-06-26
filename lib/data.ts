export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
  featured?: boolean;
  hot?: boolean;
}

export interface Brand {
  id: string;
  name: string;
  country: string;
  logo: string;
  founded: number;
  topModel: string;
  maxSpeed: string;
  color: string;
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

export const news: NewsItem[] = [
  {
    id: '1',
    title: 'Bugatti Tourbillon: O Hipercarro que Redefine Limites com 1.800 CV',
    excerpt:
      'A Bugatti apresentou o Tourbillon, seu mais recente hipercarro com motor V16 híbrido capaz de atingir 445 km/h. Descubra todos os detalhes deste monstro sobre rodas.',
    category: 'Lançamentos',
    date: '25 Jun 2026',
    readTime: '4 min',
    image:
      'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'bugatti-tourbillon-1800cv',
    featured: true,
    hot: true,
  },
  {
    id: '2',
    title: 'Ferrari F80: O Sucessor do LaFerrari Chega com 1.200 CV',
    excerpt:
      'A Ferrari revelou oficialmente o F80, hipercarro híbrido que sucede o lendário LaFerrari. Apenas 799 unidades serão produzidas e já estão todas vendidas.',
    category: 'Ferrari',
    date: '22 Jun 2026',
    readTime: '3 min',
    image:
      'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'ferrari-f80-1200cv',
    featured: true,
    hot: true,
  },
  {
    id: '3',
    title: 'Lamborghini Temerario: O Urus das Pistas chega para destronar o Huracán',
    excerpt:
      'A Lamborghini apresentou o Temerario, novo supercarro que substitui o Huracán com motor V8 biturbo híbrido e 920 CV de potência total.',
    category: 'Lamborghini',
    date: '20 Jun 2026',
    readTime: '3 min',
    image:
      'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'lamborghini-temerario',
    featured: false,
    hot: true,
  },
  {
    id: '4',
    title: 'Porsche 911 GT3 RS 2026: Mais Extremo e Mais Rápido que Nunca',
    excerpt:
      'A Porsche atualizou o 911 GT3 RS para 2026 com 525 CV e aerodinâmica refinada. O carro circundou Nürburgring em tempo recorde para um carro de série.',
    category: 'Porsche',
    date: '18 Jun 2026',
    readTime: '4 min',
    image:
      'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'porsche-911-gt3-rs-2026',
    featured: false,
  },
  {
    id: '5',
    title: 'McLaren W1: O Mais Rápido da Marca Britânica é uma Obra de Arte',
    excerpt:
      'O W1 substitui o P1 com motor V8 híbrido de 1.275 CV e carroceria em carbono. McLaren promete 0-100 km/h em menos de 2,7 segundos.',
    category: 'McLaren',
    date: '15 Jun 2026',
    readTime: '5 min',
    image:
      'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'mclaren-w1',
    featured: false,
  },
  {
    id: '6',
    title: 'Rimac Nevera R: Elétrico mais Poderoso do Mundo com 2.128 CV',
    excerpt:
      'A Rimac apresentou o Nevera R, versão atualizada do hipercarro elétrico croata com 2.128 CV. Aceleração de 0-100 km/h em apenas 1,74 segundos.',
    category: 'Elétricos',
    date: '12 Jun 2026',
    readTime: '3 min',
    image:
      'https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'rimac-nevera-r',
    featured: false,
    hot: true,
  },
  {
    id: '7',
    title: 'Koenigsegg Gemera: O Megacarro de Família com 2.300 CV',
    excerpt:
      'Quatro lugares, bagageiro e 2.300 CV. O Koenigsegg Gemera é o hipercarro mais peculiar já criado. Saiba como a marca sueca fez isso possível.',
    category: 'Koenigsegg',
    date: '10 Jun 2026',
    readTime: '4 min',
    image:
      'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'koenigsegg-gemera',
    featured: false,
  },
  {
    id: '8',
    title: 'Aston Martin Valiant: O V12 de 705 CV que Homenageia a Marca',
    excerpt:
      'O Aston Martin Valiant é um tributo puro ao V12 atmosférico, desenvolvido com a Red Bull Advanced Technologies para 5.000 unidades mundiais.',
    category: 'Aston Martin',
    date: '08 Jun 2026',
    readTime: '3 min',
    image:
      'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'aston-martin-valiant',
    featured: false,
  },
  {
    id: '9',
    title: 'Top 5: Os Supercarros Mais Bonitos de 2026 Segundo os Fãs',
    excerpt:
      'Realizamos uma pesquisa com mais de 50 mil seguidores e chegamos ao ranking definitivo dos carros mais bonitos do ano. O resultado vai te surpreender.',
    category: 'Rankings',
    date: '05 Jun 2026',
    readTime: '6 min',
    image:
      'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'top-5-supercarros-mais-bonitos-2026',
    featured: false,
  },
];

export const brands: Brand[] = [
  {
    id: 'ferrari',
    name: 'Ferrari',
    country: 'Italia',
    logo: 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=600',
    founded: 1939,
    topModel: 'Ferrari F80',
    maxSpeed: '350+ km/h',
    color: '#ff2800',
  },
  {
    id: 'lamborghini',
    name: 'Lamborghini',
    country: 'Italia',
    logo: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=600',
    founded: 1963,
    topModel: 'Revuelto',
    maxSpeed: '350 km/h',
    color: '#ffd700',
  },
  {
    id: 'bugatti',
    name: 'Bugatti',
    country: 'Franca',
    logo: 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=600',
    founded: 1909,
    topModel: 'Tourbillon',
    maxSpeed: '445 km/h',
    color: '#003087',
  },
  {
    id: 'mclaren',
    name: 'McLaren',
    country: 'Reino Unido',
    logo: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=600',
    founded: 1963,
    topModel: 'McLaren W1',
    maxSpeed: '350 km/h',
    color: '#ff8000',
  },
  {
    id: 'porsche',
    name: 'Porsche',
    country: 'Alemanha',
    logo: 'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=600',
    founded: 1931,
    topModel: '911 GT3 RS',
    maxSpeed: '296 km/h',
    color: '#c8102e',
  },
  {
    id: 'koenigsegg',
    name: 'Koenigsegg',
    country: 'Suecia',
    logo: 'https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg?auto=compress&cs=tinysrgb&w=600',
    founded: 1994,
    topModel: 'Gemera',
    maxSpeed: '400+ km/h',
    color: '#1a1a1a',
  },
  {
    id: 'pagani',
    name: 'Pagani',
    country: 'Italia',
    logo: 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=600',
    founded: 1992,
    topModel: 'Utopia',
    maxSpeed: '340 km/h',
    color: '#c0c0c0',
  },
  {
    id: 'rimac',
    name: 'Rimac',
    country: 'Croacia',
    logo: 'https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg?auto=compress&cs=tinysrgb&w=600',
    founded: 2009,
    topModel: 'Nevera R',
    maxSpeed: '415 km/h',
    color: '#0a84ff',
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
