export interface BrandType {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  products: ProductType[];
}

export interface ProductType {
  id: number;
  brand: BrandType;
  name: string;
  imageUrl: string;
  description: string;
  eras: EraType[];
}

export interface EraType {
  id: number;
  product: ProductType;
  manufacturing_start_year: number;
  manufacturing_end_year: number;
  imageUrl: string;
  description: string;
  checkPoints?: CheckPointType[];
}

export interface CheckPointType {
  id: number;
  era: EraType;
  point: string;
  imageUrl: string;
  description: string;
  userId?: string | null;
  createdAt?: string | null;
  isLiked?: boolean;
  likeCount?: number;
}

export interface CheckPointLikeType {
  id: number;
  userId: string;
  checkPointId: number;
  createdAt: string;
}

export interface LikedCheckPointType extends CheckPointType {
  era: EraType;
}

export interface UserProfileType {
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

export interface ApiErrorType {
  message: string;
  code?: string;
  details?: any;
}
