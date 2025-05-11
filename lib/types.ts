export interface Brand {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
}

export interface Product {
  id: number;
  brandId: number;
  name: string;
  imageUrl: string;
  description: string;
}

export interface ProductEra {
  id: number;
  productId: number;
  manufacturing_start_year: number;
  manufacturing_end_year: number;
  imageUrl: string;
  description: string;
  checkPoints?: ProductEraCheckPoint[];
}

export interface ProductEraCheckPoint {
  id: number;
  productEraId: number;
  point: string;
  imageUrl: string;
  description: string;
  userId?: string | null;
  createdAt?: string;
}

export interface UserProfile {
  id: string;
  name: string | null;
  email: string | null;
  avatarUrl: string | null;
  websiteUrl?: string | null;
  twitterUrl?: string | null;
  instagramUrl?: string | null;
  facebookUrl?: string | null;
  youtubeUrl?: string | null;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}
