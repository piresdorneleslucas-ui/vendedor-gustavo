export interface Motorcycle {
  id: string;
  name: string;
  brand: string;
  year: number;
  price: number;
  category: 'Carenadas' | 'Naked' | 'Adventure' | 'Custom';
  image: string;
  km: number;
  engine: string;
  power: string;
  description: string;
  accentColor: string;
}

export interface Recommendation {
  id: string;
  name: string;
  city: string;
  text: string;
  rating: number;
  avatar: string;
  motorcycle: string;
}

export interface PartnerBrand {
  name: string;
  logoUrl?: string;
}
