import { supabase } from "./supabase";
import { Brand, Product, ProductEra, ProductEraCheckPoint } from "./types";

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
});

const mapProductEraCheckPoint = (checkpoint: any): ProductEraCheckPoint => ({
  id: checkpoint.id,
  productEraId: checkpoint.product_era_id,
  point: checkpoint.point,
  imageUrl: checkpoint.image_url,
  description: checkpoint.description || "",
});

// APIクラス
export class API {
  // ブランド関連
  static async getBrands(): Promise<Brand[]> {
    const { data, error } = await supabase
      .from("brands")
      .select("*")
      .is("deleted_at", null);

    if (error) throw error;
    return (data || []).map(mapBrand);
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

  // 製品時代関連
  static async getProductEras(): Promise<ProductEra[]> {
    const { data, error } = await supabase
      .from("product_eras")
      .select("*")
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
}
