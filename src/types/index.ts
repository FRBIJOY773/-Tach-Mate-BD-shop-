export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number | null;
  discountPercent?: number | null;
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  inStock: boolean;
  stockCount: number;
  isFeatured: boolean;
  isHotDeal: boolean;
  shortDescription?: string | null;

  // Specifications
  Specification: string | null;
  
  // Rich content
  details?: string | null;
  qna?: QnAItem[] | null;
  reviews?: ReviewItem[] | null;

  createdAt: string;
  updatedAt: string;
}

export interface QnAItem {
  question: string;
  answer: string;
}

export interface ReviewItem {
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ApiError {
  error: string;
  message?: string;
}

// For admin forms
export type ProductFormData = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;

export const CATEGORIES = [
  { value: 'laptop', label: 'Laptop' },
  { value: 'gaming-laptop', label: 'Gaming Laptop' },
  { value: 'ultrabook', label: 'Ultrabook' },
  { value: 'business-laptop', label: 'Business Laptop' },
  { value: 'tablet', label: 'Tablet' },
  { value: 'graphics-card', label: 'Graphics Card' },
  { value: 'monitor', label: 'Monitor' },
  { value: 'peripheral', label: 'Peripheral' },
  { value: 'component', label: 'Component' },
  { value: 'mobile', label: 'Mobile Phone' },
] as const;
