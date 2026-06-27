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
