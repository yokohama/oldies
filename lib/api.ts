import { supabase } from "./supabase";
import {
  Brand,
  Product,
  ProductEra,
  ProductEraCheckPoint,
  UserProfile,
  LikedCheckPoint,
} from "./types";
import { User } from "@supabase/supabase-js";

// データ変換用のヘルパー関数
const mapBrand = (brand: any): Brand => ({
  id: brand.id,
  name: brand.name,
  imageUrl: brand.image_url,
  description: brand.description || "",
});

const mapProduct = (product: any): Product => ({
  id: product.id,
  brandId: product.brand_id,
  name: product.name,
  imageUrl: product.image_url,
  description: product.description || "",
});

const mapProductEra = (era: any): ProductEra => ({
  id: era.id,
  productId: era.product_id,
  manufacturing_start_year: era.manufacturing_start_year,
  manufacturing_end_year: era.manufacturing_end_year,
  imageUrl: era.image_url,
  description: era.description || "",
  checkPoints: era.product_era_check_points
    ? era.product_era_check_points.map(mapProductEraCheckPoint)
    : [],
});

const mapProductEraCheckPoint = (checkpoint: any): ProductEraCheckPoint => ({
  id: checkpoint.id,
  productEraId: checkpoint.product_era_id,
  point: checkpoint.point,
  imageUrl: checkpoint.image_url,
  description: checkpoint.description || "",
  userId: checkpoint.user_id,
});

const mapUserProfile = (profile: any): UserProfile => ({
  id: profile.id,
  name: profile.full_name || profile.username || "ユーザー",
  email: profile.email,
  avatarUrl:
    profile.avatar_url ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${profile.id}`,
  websiteUrl: profile.website_url,
  twitterUrl: profile.twitter_url,
  instagramUrl: profile.instagram_url,
  facebookUrl: profile.facebook_url,
  youtubeUrl: profile.youtube_url,
});

// APIクラス
export class API {
  // いいね関連
  static async isCheckPointLiked(
    userId: string,
    checkPointId: number,
  ): Promise<boolean> {
    const { data, error } = await supabase
      .from("check_point_likes")
      .select("*")
      .eq("user_id", userId)
      .eq("check_point_id", checkPointId)
      .maybeSingle();

    if (error) {
      console.error("いいね状態の取得エラー:", error);
      return false;
    }

    return !!data;
  }

  static async getCheckPointLikesCount(checkPointId: number): Promise<number> {
    const { count, error } = await supabase
      .from("check_point_likes")
      .select("*", { count: "exact", head: true })
      .eq("check_point_id", checkPointId);

    if (error) {
      console.error("いいね数の取得エラー:", error);
      return 0;
    }

    return count || 0;
  }

  static async likeCheckPoint(
    userId: string,
    checkPointId: number,
  ): Promise<void> {
    const { error } = await supabase.from("check_point_likes").insert({
      user_id: userId,
      check_point_id: checkPointId,
    });

    if (error) throw error;
  }

  static async unlikeCheckPoint(
    userId: string,
    checkPointId: number,
  ): Promise<void> {
    const { error } = await supabase
      .from("check_point_likes")
      .delete()
      .eq("user_id", userId)
      .eq("check_point_id", checkPointId);

    if (error) throw error;
  }

  static async getLikedCheckPoints(userId: string): Promise<LikedCheckPoint[]> {
    const { data, error } = await supabase
      .from("check_point_likes")
      .select(
        `
        *,
        product_era_check_points!check_point_likes_check_point_id_fkey(
          *,
          product_eras!fk_product_era(
            *,
            products!fk_product(
              *,
              brands!fk_brand(*)
            )
          )
        )
      `,
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return (data || []).map((like) => {
      const checkPoint = like.product_era_check_points;
      const productEra = checkPoint.product_eras;
      const product = productEra.products;
      const brand = product.brands;

      return {
        id: checkPoint.id,
        productEraId: checkPoint.product_era_id,
        point: checkPoint.point,
        imageUrl: checkPoint.image_url,
        description: checkPoint.description || "",
        userId: checkPoint.user_id,
        createdAt: checkPoint.created_at,
        isLiked: true,
        productEra: {
          id: productEra.id,
          productId: productEra.product_id,
          manufacturing_start_year: productEra.manufacturing_start_year,
          manufacturing_end_year: productEra.manufacturing_end_year,
          imageUrl: productEra.image_url,
          description: productEra.description || "",
          product: {
            id: product.id,
            brandId: product.brand_id,
            name: product.name,
            imageUrl: product.image_url,
            description: product.description || "",
            brand: {
              id: brand.id,
              name: brand.name,
              imageUrl: brand.image_url,
              description: brand.description || "",
            },
          },
        },
      };
    });
  }

  // ユーザーが投稿したチェックポイントを取得
  static async getUserCheckPoints(
    userId: string,
  ): Promise<ProductEraCheckPoint[]> {
    const { data, error } = await supabase
      .from("product_era_check_points")
      .select(
        `
        *,
        product_eras!fk_product_era(
          *,
          products!fk_product(
            *,
            brands!fk_brand(*)
          )
        )
      `,
      )
      .eq("user_id", userId)
      .is("deleted_at", null)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return (data || []).map((checkPoint) => {
      return {
        id: checkPoint.id,
        productEraId: checkPoint.product_era_id,
        point: checkPoint.point,
        imageUrl: checkPoint.image_url,
        description: checkPoint.description || "",
        userId: checkPoint.user_id,
        createdAt: checkPoint.created_at,
      };
    });
  }

  // ブランド関連
  static async getBrands(): Promise<Brand[]> {
    const { data, error } = await supabase
      .from("brands")
      .select("*")
      .is("deleted_at", null);

    if (error) throw error;
    return (data || []).map(mapBrand);
  }

  static async getBrand(id: number): Promise<Brand | null> {
    const { data, error } = await supabase
      .from("brands")
      .select("*")
      .eq("id", id)
      .is("deleted_at", null)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null; // PGRST116 は "結果が見つからない" エラー
      throw error;
    }
    return data ? mapBrand(data) : null;
  }

  // 製品関連
  static async getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .is("deleted_at", null);

    if (error) throw error;
    return (data || []).map(mapProduct);
  }

  static async getProductsByBrandId(brandId: number): Promise<Product[]> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("brand_id", brandId)
      .is("deleted_at", null);

    if (error) throw error;
    return (data || []).map(mapProduct);
  }

  static async getProduct(id: number): Promise<Product | null> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .is("deleted_at", null)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null; // PGRST116 は "結果が見つからない" エラー
      throw error;
    }
    return data ? mapProduct(data) : null;
  }

  // 製品時代関連
  static async getProductEras(): Promise<ProductEra[]> {
    const { data, error } = await supabase
      .from("product_eras")
      .select("*")
      .is("deleted_at", null);

    if (error) throw error;
    return (data || []).map(mapProductEra);
  }

  static async getProductErasByProductId(
    productId: number,
  ): Promise<ProductEra[]> {
    const { data, error } = await supabase
      .from("product_eras")
      .select(
        `
        *,
        product_era_check_points(*)
      `,
      )
      .eq("product_id", productId)
      .is("deleted_at", null);

    if (error) throw error;
    return (data || []).map(mapProductEra);
  }

  // 製品時代チェックポイント関連
  static async getProductEraCheckPoints(): Promise<ProductEraCheckPoint[]> {
    const { data, error } = await supabase
      .from("product_era_check_points")
      .select("*")
      .is("deleted_at", null);

    if (error) throw error;
    return (data || []).map(mapProductEraCheckPoint);
  }

  static async addCheckPoint(
    productEraId: number,
    point: string,
    imageUrl: string,
    description: string | null,
    userId: string,
  ): Promise<ProductEraCheckPoint> {
    const { data, error } = await supabase
      .from("product_era_check_points")
      .insert({
        product_era_id: productEraId,
        point: point,
        image_url: imageUrl,
        description: description || null,
        user_id: userId,
      })
      .select()
      .single();

    if (error) throw error;
    return mapProductEraCheckPoint(data);
  }

  static async deleteCheckPoint(checkPointId: number): Promise<void> {
    const { error } = await supabase
      .from("product_era_check_points")
      .delete()
      .eq("id", checkPointId);

    if (error) throw error;
  }

  // ストレージ関連
  static async uploadImage(
    file: File,
    userId: string,
    folder: string = "product_era_check_points",
  ): Promise<string> {
    // ファイル名の一意性を確保するためにタイムスタンプとランダム文字列を追加
    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}_${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    // Supabaseにアップロード
    const { data, error } = await supabase.storage
      .from("images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw error;

    // 公開URLを取得
    const {
      data: { publicUrl },
    } = supabase.storage.from("images").getPublicUrl(filePath);
    return publicUrl;
  }

  // 認証関連
  static async getCurrentUser(): Promise<User | null> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  }

  static async getUserProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw error;
    }

    return data ? mapUserProfile(data) : null;
  }
}
