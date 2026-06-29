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
