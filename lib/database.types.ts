export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      brands: {
        Row: {
          id: number;
          name: string;
          image_url: string;
          description: string | null;
          created_at: string | null;
          updated_at: string | null;
          deleted_at: string | null;
        };
        Insert: {
          id?: number;
          name: string;
          image_url: string;
          description?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          deleted_at?: string | null;
        };
        Update: {
          id?: number;
          name?: string;
          image_url?: string;
          description?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          deleted_at?: string | null;
        };
        Relationships: [];
      };
      products: {
        Row: {
          id: number;
          brand_id: number;
          name: string;
          image_url: string;
          description: string | null;
          created_at: string | null;
          updated_at: string | null;
          deleted_at: string | null;
        };
        Insert: {
          id?: number;
          brand_id: number;
          name: string;
          image_url: string;
          description?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          deleted_at?: string | null;
        };
        Update: {
          id?: number;
          brand_id?: number;
          name?: string;
          image_url?: string;
          description?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          deleted_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_brand";
            columns: ["brand_id"];
            referencedRelation: "brands";
            referencedColumns: ["id"];
          },
        ];
      };
      product_eras: {
        Row: {
          id: number;
          product_id: number;
          manufacturing_start_year: number;
          manufacturing_end_year: number;
          image_url: string;
          description: string | null;
          created_at: string | null;
          updated_at: string | null;
          deleted_at: string | null;
        };
        Insert: {
          id?: number;
          product_id: number;
          manufacturing_start_year: number;
          manufacturing_end_year: number;
          image_url: string;
          description?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          deleted_at?: string | null;
        };
        Update: {
          id?: number;
          product_id?: number;
          manufacturing_start_year?: number;
          manufacturing_end_year?: number;
          image_url?: string;
          description?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          deleted_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_product";
            columns: ["product_id"];
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      product_era_check_points: {
        Row: {
          id: number;
          product_era_id: number;
          point: string;
          image_url: string;
          description: string | null;
          created_at: string | null;
          updated_at: string | null;
          deleted_at: string | null;
          user_id: string | null;
        };
        Insert: {
          id?: number;
          product_era_id: number;
          point: string;
          image_url: string;
          description?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          deleted_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          id?: number;
          product_era_id?: number;
          point?: string;
          image_url?: string;
          description?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          deleted_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_product_era";
            columns: ["product_era_id"];
            referencedRelation: "product_eras";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_user";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          id: string;
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
          email: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id: string;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          email?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          email?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
