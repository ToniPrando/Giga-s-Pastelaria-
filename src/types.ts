export type MenuCategory = 
  | 'todos' 
  | 'mais-pedidos' 
  | 'tradicionais' 
  | 'giga-especiais' 
  | 'doces' 
  | 'bebidas' 
  | 'porcoes';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  description: string;
  ingredients: string[];
  image: string;
  popular?: boolean;
  isGiga?: boolean;
  isSweet?: boolean;
  isVegetarian?: boolean;
  sizeLabel?: string;
  badge?: string;
  available?: boolean;
  orderIndex?: number;
}

export interface CartExtra {
  name: string;
  price: number;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  extras: CartExtra[];
  notes?: string;
  totalPrice: number;
}

export interface Testimonial {
  id: string;
  name: string;
  neighborhood: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
