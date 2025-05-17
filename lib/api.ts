import { supabase } from "./supabase";
import {
  BrandType,
  ProductType,
  EraType,
  CheckPointType,
  UserProfileType,
  LikedCheckPointType,
} from "./types";
import { User } from "@supabase/supabase-js";
import { getAvatarUrl } from "@/lib/config/siteConfig";

// データ変換用のヘルパー関数
const mapBrand = (brand: any): BrandType => ({
  id: brand.id,
  name: brand.name,
  imageUrl: brand.image_url,
  description: brand.description || "",
  products: [],
});

const mapProduct = (product: any): ProductType => ({
  id: product.id,
  brand: product.brand,
  name: product.name,
  imageUrl: product.image_url,
  description: product.description || "",
  eras: [],
});

const mapEra = (era: any): EraType => ({
  id: era.id,
  product: era.product,
  manufacturing_start_year: era.manufacturing_start_year,
  manufacturing_end_year: era.manufacturing_end_year,
  imageUrl: era.image_url,
  description: era.description || "",
  checkPoints: era.product_era_check_points
    ? era.product_era_check_points.map((checkpoint: any) => {
      // 製品時代のチェックポイントにブランドと製品の情報を追加
      const checkpointWithRefs = {
        ...checkpoint,
        eras: {
          products: era.products || { brands: {} },
        },
      };
      return mapCheckPoint(checkpointWithRefs);
    })
    : [],
});

const mapCheckPoint = (checkpoint: any): CheckPointType => {
  return {
    id: checkpoint.id,
    era: checkpoint.era,
    point: checkpoint.point,
    imageUrl: checkpoint.image_url,
    description: checkpoint.description || "",
    userId: checkpoint.user_id,
    createdAt: checkpoint.created_at,
  };
};

const mapUserProfile = (profile: any): UserProfileType => ({
  id: profile.id,
  name: profile.full_name || profile.username || "ユーザー",
  email: profile.email,
  avatarUrl: profile.avatar_url || getAvatarUrl(profile.id),
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

  static async getCheckPoint(id: number): Promise<CheckPointType | null> {
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
      .eq("id", id)
      .is("deleted_at", null)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null; // PGRST116 は "結果が見つからない" エラー
      throw error;
    }

    if (!data) return null;

    const era = data.product_eras;
    const product = era.products;
    const brand = product.brands;

    // ブランドとプロダクトのマッピング
    const brandObj = mapBrand(brand);
    const productObj = {
      ...mapProduct(product),
      brand: brandObj,
    };

    // 時代のマッピング
    const eraObj = {
      ...mapEra(era),
      product: productObj,
    };

    return {
      id: data.id,
      era: eraObj,
      point: data.point,
      imageUrl: data.image_url,
      description: data.description || "",
      userId: data.user_id,
      createdAt: data.created_at,
    };
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

  static async getLikedCheckPoints(
    userId: string,
  ): Promise<LikedCheckPointType[]> {
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
      const era = checkPoint.product_eras;
      const product = era.products;
      const brand = product.brands;

      // ブランドとプロダクトのマッピング
      const brandObj = mapBrand(brand);
      const productObj = {
        ...mapProduct(product),
        brand: brandObj,
      };

      // 時代のマッピング
      const eraObj = {
        ...mapEra(era),
        product: productObj,
      };

      return {
        id: checkPoint.id,
        era: eraObj,
        point: checkPoint.point,
        imageUrl: checkPoint.image_url,
        description: checkPoint.description || "",
        userId: checkPoint.user_id,
        createdAt: checkPoint.created_at,
        isLiked: true,
      };
    });
  }

  // ユーザーが投稿したチェックポイントを取得
  static async getUserCheckPoints(userId: string): Promise<CheckPointType[]> {
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
      const era = checkPoint.product_eras;
      const product = era.products;
      const brand = product.brands;

      // ブランドとプロダクトのマッピング
      const brandObj = mapBrand(brand);
      const productObj = {
        ...mapProduct(product),
        brand: brandObj,
      };

      // 時代のマッピング
      const eraObj = {
        ...mapEra(era),
        product: productObj,
      };

      return {
        id: checkPoint.id,
        era: eraObj,
        point: checkPoint.point,
        imageUrl: checkPoint.image_url,
        description: checkPoint.description || "",
        userId: checkPoint.user_id,
        createdAt: checkPoint.created_at,
      };
    });
  }

  // ブランド関連
  static async getBrands(): Promise<BrandType[]> {
    const { data, error } = await supabase
      .from("brands")
      .select("*")
      .is("deleted_at", null);

    if (error) throw error;
    return (data || []).map(mapBrand);
  }

  static async getBrand(id: number): Promise<BrandType | null> {
    const { data, error } = await supabase
      .from("brands")
      .select(
        `
        *,
        products!brand_id(
          *,
          product_eras(*)
        )
      `,
      )
      .eq("id", id)
      .is("deleted_at", null)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null; // PGRST116 は "結果が見つからない" エラー
      throw error;
    }

    if (!data) return null;

    // ブランドオブジェクトを作成し、関連する製品も含める
    const brandObj = mapBrand(data);

    // 関連する製品をマッピング
    if (data.products && Array.isArray(data.products)) {
      brandObj.products = data.products.map((product: any) => {
        const productObj = mapProduct(product);
        productObj.brand = brandObj; // 製品にブランド参照を設定

        // 製品の時代情報をマッピング
        if (product.product_eras && Array.isArray(product.product_eras)) {
          productObj.eras = product.product_eras.map((era: any) => {
            const eraObj = mapEra(era);
            eraObj.product = productObj; // 時代に製品参照を設定
            return eraObj;
          });
        }

        return productObj;
      });
    }

    return brandObj;
  }

  // 製品関連
  static async getProducts(): Promise<ProductType[]> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .is("deleted_at", null);

    if (error) throw error;
    return (data || []).map((product) => {
      const productObj = mapProduct(product);
      return productObj;
    });
  }

  static async getProduct(id: number): Promise<ProductType | null> {
    const { data, error } = await supabase
      .from("products")
      .select(
        `
        *,
        brands!fk_brand(*),
        product_eras(
          *,
          product_era_check_points(*)
        )
      `,
      )
      .eq("id", id)
      .is("deleted_at", null)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null; // PGRST116 は "結果が見つからない" エラー
      throw error;
    }

    if (!data) return null;

    const productObj = mapProduct(data);

    // ブランド情報をセット
    if (data.brands) {
      productObj.brand = mapBrand(data.brands);
    }

    // 時代情報をセット
    if (data.product_eras && Array.isArray(data.product_eras)) {
      productObj.eras = data.product_eras.map((era: any) => {
        const eraObj = mapEra(era);
        eraObj.product = productObj; // 時代に製品参照を設定

        // チェックポイント情報をセット
        if (
          era.product_era_check_points &&
          Array.isArray(era.product_era_check_points)
        ) {
          eraObj.checkPoints = era.product_era_check_points.map(
            (checkpoint: any) => {
              const checkpointObj = mapCheckPoint(checkpoint);
              checkpointObj.era = eraObj; // チェックポイントに時代参照を設定
              return checkpointObj;
            },
          );
        }

        return eraObj;
      });
    }

    return productObj;
  }

  // 製品時代関連
  // static async getEras(): Promise<Era[]> {}

  // 製品時代チェックポイント関連
  static async getCheckPoints(): Promise<CheckPointType[]> {
    const { data, error } = await supabase
      .from("product_era_check_points")
      .select("*")
      .is("deleted_at", null);

    if (error) throw error;
    return (data || []).map((cp) => {
      const checkPoint = mapCheckPoint(cp);
      return checkPoint;
    });
  }

  static async addCheckPoint(
    eraId: number,
    point: string,
    imageUrl: string,
    description: string | null,
    userId: string,
  ): Promise<CheckPointType> {
    const { data, error } = await supabase
      .from("product_era_check_points")
      .insert({
        product_era_id: eraId,
        point: point,
        image_url: imageUrl,
        description: description || null,
        user_id: userId,
      })
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
      .single();

    if (error) throw error;

    const productEra = data.product_eras;
    const product = productEra.products;
    const brand = product.brands;

    // ブランドとプロダクトのマッピング
    const brandObj = mapBrand(brand);
    const productObj = {
      ...mapProduct(product),
      brand: brandObj,
    };

    // 時代のマッピング
    const eraObj = {
      ...mapEra(productEra),
      product: productObj,
    };

    return {
      id: data.id,
      era: eraObj,
      point: data.point,
      imageUrl: data.image_url,
      description: data.description || "",
      userId: data.user_id,
      createdAt: data.created_at,
    };
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
    const { error } = await supabase.storage
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

  static async getUserProfile(userId: string): Promise<UserProfileType | null> {
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
