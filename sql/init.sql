-- Brands テーブルの作成
CREATE TABLE brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Products テーブルの作成
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    brand_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_brand
        FOREIGN KEY (brand_id)
        REFERENCES brands(id)
        ON DELETE CASCADE
);

-- ProductEras テーブルの作成
CREATE TABLE product_eras (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    manufacturing_start_year INTEGER NOT NULL,
    manufacturing_end_year INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);

-- ProductEraCheckPoints テーブルの作成
CREATE TABLE product_era_check_points (
    id SERIAL PRIMARY KEY,
    product_era_id INTEGER NOT NULL,
    point VARCHAR(255) NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_product_era
        FOREIGN KEY (product_era_id)
        REFERENCES product_eras(id)
        ON DELETE CASCADE
);

-- updated_atを自動更新するためのトリガー関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Productsテーブルのupdated_at自動更新トリガー
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Brandsテーブルのupdated_at自動更新トリガー
CREATE TRIGGER update_brands_updated_at
BEFORE UPDATE ON brands
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ProductErasテーブルのupdated_at自動更新トリガー
CREATE TRIGGER update_product_eras_updated_at
BEFORE UPDATE ON product_eras
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ProductEraCheckPointsテーブルのupdated_at自動更新トリガー
CREATE TRIGGER update_product_era_check_points_updated_at
BEFORE UPDATE ON product_era_check_points
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- サンプルデータの挿入: Brands
INSERT INTO brands (id, name, image_url, description) VALUES
(1, 'Champion', 'https://images.pexels.com/photos/5699101/pexels-photo-5699101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'サンプル説明'),
(2, 'Levise', 'https://images.pexels.com/photos/5699101/pexels-photo-5699101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'サンプル説明');

-- サンプルデータの挿入: Products
INSERT INTO products (id, name, image_url, description, brand_id) VALUES
(1, 'リバースウィーブ', 'https://images.pexels.com/photos/5699101/pexels-photo-5699101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '1970年代後期のリバースウィーブ。グレーの色味が特徴的な一枚。袖のリブが太めで、首元の三角リブ（Vガゼット）が特徴。', 1);

-- サンプルデータの挿入: ProductEras
INSERT INTO product_eras (id, product_id, manufacturing_start_year, manufacturing_end_year, image_url, description) VALUES
(1, 1, 1975, 1979, 'https://images.pexels.com/photos/5699101/pexels-photo-5699101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '1970年代後期のリバースウィーブ。グレーの色味が特徴的な一枚。袖のリブが太めで、首元の三角リブ（Vガゼット）が特徴。'),
(2, 1, 1972, 1976, 'https://images.pexels.com/photos/6423024/pexels-photo-6423024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '70年代中期の希少なリバースウィーブパーカー。フードの形状や紐の素材感が当時のものならでは。'),
(3, 1, 1973, 1978, 'https://images.pexels.com/photos/5699068/pexels-photo-5699068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '70年代のカレッジロゴ入りスウェット。バーガンディカラーの色褪せ感が絶妙。'),
(4, 1, 1974, 1979, 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'UCLAのライセンス品。70年代特有の鮮やかなイエロー。首元のタグが特徴的。'),
(5, 1, 1958, 1962, 'https://images.pexels.com/photos/6311475/pexels-photo-6311475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '50年代の希少なランナータグTシャツ。シンプルなデザインながら、生地の厚みと縫製の丁寧さが特徴。'),
(6, 1, 1960, 1965, 'https://images.pexels.com/photos/5698904/pexels-photo-5698904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '60年代のカレッジスウェット。当時のアメリカの大学生に人気だったデザイン。'),
(7, 1, 1985, 1989, 'https://images.pexels.com/photos/5699195/pexels-photo-5699195.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '80年代のビビッドカラーが特徴的なリバースウィーブパーカー。ブルータグ初期の製品。'),
(8, 1, 1992, 1996, 'https://images.pexels.com/photos/7691338/pexels-photo-7691338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '90年代のストリートファッション全盛期に人気だったナイロンジャケット。刺繍ロゴが特徴。');

-- サンプルデータの挿入: ProductEraCheckPoints
INSERT INTO product_era_check_points (id, product_era_id, point, image_url, description) VALUES
(1, 1, '首元の三角リブ（Vガゼット）', 'https://images.pexels.com/photos/5699101/pexels-photo-5699101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '70年代後期のリバースウィーブに特徴的な首元の三角リブ。この形状は通気性と耐久性を向上させる目的で採用された。'),
(2, 1, '太めの袖リブ', 'https://images.pexels.com/photos/5699101/pexels-photo-5699101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '70年代後期のリバースウィーブは袖のリブが太めに設計されており、現代のものと比較すると明らかな違いがある。'),
(3, 1, 'グレーの色味', 'https://images.pexels.com/photos/5699101/pexels-photo-5699101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '70年代後期のグレーは独特の深みがあり、現代のものとは異なる風合いを持つ。'),
(4, 2, 'フードの形状', 'https://images.pexels.com/photos/6423024/pexels-photo-6423024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '70年代中期のパーカーは丸みを帯びたフード形状が特徴的。現代のものより若干小さめに設計されている。'),
(5, 2, '紐の素材感', 'https://images.pexels.com/photos/6423024/pexels-photo-6423024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '70年代中期のパーカーの紐は太めのコットン素材が使用されており、現代のものより硬めの質感がある。'),
(6, 3, 'カレッジロゴの刺繍', 'https://images.pexels.com/photos/5699068/pexels-photo-5699068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '70年代のカレッジロゴは現代のものと比べて刺繍の密度が低く、やや荒めの仕上がりになっている。'),
(7, 3, 'バーガンディカラーの色褪せ', 'https://images.pexels.com/photos/5699068/pexels-photo-5699068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '70年代のバーガンディカラーは独特の色褪せ方をし、時間の経過とともに深みのある風合いに変化する。'),
(8, 4, 'UCLAライセンスタグ', 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '70年代のUCLAライセンス品には特徴的なタグが付いており、その形状とフォントで年代を特定できる。'),
(9, 4, '鮮やかなイエロー', 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '70年代特有の鮮やかなイエローは、現代のものより若干オレンジがかった色味を持つ。'),
(10, 5, 'ランナータグ', 'https://images.pexels.com/photos/6311475/pexels-photo-6311475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '50年代のTシャツに付けられたランナータグは、その形状とフォントで年代を特定できる貴重な要素。'),
(11, 5, '生地の厚み', 'https://images.pexels.com/photos/6311475/pexels-photo-6311475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '50年代のTシャツは現代のものと比較して生地が厚く、耐久性に優れている。'),
(12, 6, 'カレッジデザイン', 'https://images.pexels.com/photos/5698904/pexels-photo-5698904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '60年代のカレッジスウェットは、シンプルながらも力強いフォントデザインが特徴的。'),
(13, 6, '裾と袖のリブ', 'https://images.pexels.com/photos/5698904/pexels-photo-5698904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '60年代のスウェットは裾と袖のリブが細めに設計されており、70年代以降のものとは異なる。'),
(14, 7, 'ビビッドカラー', 'https://images.pexels.com/photos/5699195/pexels-photo-5699195.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '80年代のリバースウィーブは鮮やかな原色が多用され、ポップカルチャーの影響を強く受けている。'),
(15, 7, 'ブルータグ', 'https://images.pexels.com/photos/5699195/pexels-photo-5699195.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '80年代初期に導入されたブルータグは、その形状とフォントで製造年代を特定できる重要な要素。'),
(16, 8, '刺繍ロゴ', 'https://images.pexels.com/photos/7691338/pexels-photo-7691338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '90年代のナイロンジャケットには大きめの刺繍ロゴが特徴的で、ストリートファッションの象徴となった。'),
(17, 8, 'ナイロン素材', 'https://images.pexels.com/photos/7691338/pexels-photo-7691338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '90年代のナイロンジャケットは光沢のある素材感が特徴的で、当時の最新技術を反映している。'),
(18, 8, 'ジッパーデザイン', 'https://images.pexels.com/photos/7691338/pexels-photo-7691338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '90年代のナイロンジャケットのジッパーは大きめで頑丈な作りになっており、ブランドロゴが刻印されていることが多い。');
