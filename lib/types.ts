export interface Brand {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  products: Product[];
}

export interface Product {
  id: number;
  brand: Brand;
  name: string;
  imageUrl: string;
  description: string;
  eras: Era[];
}

export interface Era {
  id: number;
  product: Product;
  manufacturing_start_year: number;
  manufacturing_end_year: number;
  imageUrl: string;
  description: string;
  checkPoints?: CheckPoint[];
}

export interface CheckPoint {
  id: number;
  era: Era;
  point: string;
  imageUrl: string;
  description: string;
  userId?: string | null;
  createdAt?: string | null;
  isLiked?: boolean;
  likeCount?: number;
}

export interface CheckPointLike {
  id: number;
  userId: string;
  checkPointId: number;
  createdAt: string;
}

export interface LikedCheckPoint extends CheckPoint {
  era: Era;
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
