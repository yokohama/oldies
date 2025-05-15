# CLAUDE.md

このファイルはClaude Code (claude.ai/code)がこのリポジトリのコードを扱う際のガイダンスを提供します。

## プロジェクト概要

このプロジェクトは、50年代から90年代の異なる時代のChampionリバースウィーブウェアを展示するためのヴィンテージアパレルストア向けのNext.jsアプリケーションです。
React、TypeScript、Tailwind CSS、shadcn/uiコンポーネントを使用しています。

## 開発コマンド

```bash
# 開発サーバーの起動
npm run dev

# 本番用ビルド
npm run build

# 本番サーバーの起動
npm run start

# リント実行
npm run lint
```

## アーキテクチャ

このアプリケーションは標準的なNext.jsプロジェクト構造に従っています：

### コアコンポーネント

1. **HomePageコンポーネント** (`components/home/HomePage.tsx`) - メインコンポーネント：
   - 選択された時代の状態を管理
   - 選択された時代に基づいて商品をフィルタリング
   - EraSelector、EraDescription、ProductCarouselコンポーネントをレンダリング

2. **EraSelectorコンポーネント** (`components/home/EraSelector.tsx`) - 範囲スライダーで異なる時代（50年代〜90年代）を選択するためのUI

3. **ProductCarouselコンポーネント** (`components/home/ProductCarousel.tsx`) - フィルタリングされた商品をカルーセルで表示：
   - 商品画像
   - 時代インジケーター
   - 商品情報
   - 追加の商品詳細用のトースト通知

### データ

- 商品データは`lib/sample-data.ts`に保存され、TypeScriptインターフェースは`lib/types.ts`で定義
- 各商品はid、name、era、price、size、condition、imageUrlなどのプロパティを持つ

### UIコンポーネント

- shadcn/uiコンポーネントライブラリ（Radix UIプリミティブベース）を使用
- カスタムUIコンポーネントは`components/ui/`に保存
- スタイリングにTailwind CSSを使用

### テーマ

- ライト/ダークモードをサポートするテーマプロバイダー（`components/theme/theme-provider.tsx`）を含む
- InterとPlayfair DisplayのGoogleフォントを使用

## 主要な設計パターン

1. **コンポーネントコンポジション** - 構成可能で再利用可能なコンポーネントからUIを構築
2. **クライアントコンポーネント** - 'use client'ディレクティブを使用したReactのクライアントコンポーネントを使用
3. **状態管理** - ローカル状態管理にReactのuseStateを使用
4. **レスポンシブデザイン** - レスポンシブレイアウトにTailwind CSSを使用

## プロジェクト構成

### ディレクトリ構造

```
./
├── CLAUDE.md                        # Claude用の作業指示書
├── app                              # ルーティングに関連するページ
│   ├── auth                         # 認証コールバック
│   ├── brands
│   │   ├── [brandId]
│   │   │   ├── layout.tsx
│   │   │   └── products
│   │   │       ├── [productId]
│   │   │       │   └── eras
│   │   │       │       └── page.tsx
│   │   │       └── page.tsx
│   │   └── layout.tsx
│   ├── favorites
│   ├── globals.css                   # tailwindをグループ化
│   ├── layout.tsx
│   ├── login
│   ├── page.tsx
│   └── profile
├── components                        # 見分易いようにappのしたと同名フォルダ
│   ├── (省略)
│   ├── theme
│   │   └── theme-provider.tsx
│   └── ui                            # UI共通コンポーネント
│       └── (省略)
├── components.json
├── contexts
│   └── AuthContext.tsx
├── hooks                             # クライアントサイドビジネスロジック
│   ├── checkPoint
│   │   └── (省略)
│   ├── common
│   │   └── (省略)
│   ├── eras
│   │   └── (省略)
│   ├── index.ts
│   └── profile
│       └── (省略)
├── lib
│   ├── api.ts                        # supbaseへのアクセス
│   ├── database.types.ts             # テーブル型定義
│   ├── metadata.ts                   # SEO用メタデータ
│   ├── server                        # サーバーサイドビジネスロジック
│   │   └── (省略)
│   ├── supabase.ts
│   ├── types.ts
│   └── utils.ts
├── (省略)
├── tailwind.config.ts
└── tsconfig.json
```

### 主要なデータモデル

```typescript
// lib/types.ts から抜粋
export interface Brand { /* ... */ }
export interface Product { /* ... */ }
export interface ProductEra { /* ... */ }
export interface ProductEraCheckPoint { /* ... */ }
export interface UserProfile { /* ... */ }
```

### 認証システム

このプロジェクトはSupabaseを使用して認証を実装しています。`AuthContext.tsx`はGoogle認証を含む認証状態を管理します。

```typescript
// contexts/AuthContext.tsx から抜粋
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // ...
  const signInWithGoogle = async () => {
    // Googleを使用したOAuth認証
  };

  const signOut = async () => {
    // ログアウト処理
  };
  // ...
};

export const useAuth = () => {
  // AuthContextへのアクセスを提供するカスタムフック
};
```

### UI/UXの特徴

- モバイルレスポンシブデザイン
- ダーク/ライトモードのサポート
- カルーセルによる商品表示
- スライダーによる時代選択
- モーダルダイアログによるチェックポイント追加
- トースト通知によるフィードバック

# 開発指示
## 指示に忠実に従うプロンプト

1. 私が明示的に依頼した変更のみを行ってください。
2. 依頼していない追加機能や拡張は提案しないでください。
3. 問題を修正する際は、最小限の変更で対応してください。
4. 変更前に、変更内容と理由を簡潔に説明してください。
5. 不明点がある場合は、追加の情報を求めてください。
6. 依頼の範囲を超える提案をしたい場合は、まず許可を求めてください。
この指示に従わない場合、時間の無駄になり、効率的な作業ができません。

## Next.js画像最適化指示
Next.jsの`Image`コンポーネントを使用する際は、以下のルールを必ず守ってください：

1. ファーストビュー（フォールド上）に表示される重要な画像には必ず`priority`属性を追加すること
2. 特に`fill`プロパティを使用している画像には注意し、LCP（Largest Contentful Paint）要素となる可能性が高い画像には必ず`priority`を設定すること
3. カルーセルやヒーローセクションの主要画像には`priority`属性を設定すること
4. すべての画像に`priority`を設定するのではなく、ページごとに1〜2枚の重要な画像にのみ設定すること
5. `unoptimized`属性と`priority`属性を併用する場合は特に注意すること

## appとcomponentsとhoooks
- appの下にはルーティングに関連する部分のみを実装する。
- ページに必要なコンポーネントはcomponentsに実装する。
- コンポーネント中のビジネスロジックは、hooksに実装する。

## supabaseへのアクセス
- supabaseへのアクセスは、すべて`lib/api.ts`で実装する。
- データ構成は、`lib/database.types.ts`を参照

## デザイン
- iconはLucideアイコンでできる限り統一。
- 新たなページを作成する場合は、brandのレイアウトにわせること。

# SEO改善のための提案リスト

## 1. メタデータの最適化
- **動的メタデータの実装**: 各ページに固有のタイトル、説明、OGタグを設定する
- **metadataBaseのURL修正**: 現在は仮のURL（`https://your-domain.com`）が設定されている
- **言語設定の一貫性**: `html lang="ja"`は設定されているが、descriptionは英語になっている

## 2. 構造化データ（JSON-LD）の実装
- **商品ページ用のProductスキーマ**: 価格、在庫状況、レビューなどの情報を検索エンジンに提供
- **ブランドページ用のOrganizationスキーマ**: ブランド情報を構造化データとして提供
- **パンくずリスト用のBreadcrumbListスキーマ**: サイト内のナビゲーション構造を明確に

## 3. 画像の最適化
- **alt属性の改善**: 多くの画像に基本的なalt属性はあるが、より詳細で検索エンジン向けの説明が必要
- **画像のLazy Loading**: 既にNext.jsのImageコンポーネントを使用しているが、優先度の設定が必要
- **WebP形式の活用**: 画像の読み込み速度向上のため、最新の圧縮形式を活用

## 4. パフォーマンス最適化
- **Core Web Vitalsの改善**: LCP、FID、CLSなどのメトリクスを最適化
- **コード分割の活用**: 大きなJavaScriptバンドルを分割して初期読み込み時間を短縮
- **フォントの最適化**: Google Fontsは使用しているが、font-displayプロパティの設定が必要

## 5. URLとルーティングの最適化
- **SEOフレンドリーなURL構造**: 現在のURLパターンを見直し、検索エンジンとユーザーにとって理解しやすい構造に
- **正規化（Canonicalization）**: 重複コンテンツを避けるためのcanonicalタグの実装
- **動的ルートのメタデータ**: 動的ルートに対するメタデータの生成方法の改善

## 6. コンテンツの最適化
- **意味のあるHTML構造**: 適切な見出し階層（h1, h2, h3など）の使用
- **内部リンク構造の改善**: 関連商品やブランド間のリンクを強化
- **テキストコンテンツの充実**: 商品説明やブランドストーリーなどのテキストコンテンツを充実させる

## 7. モバイル対応の強化
- **レスポンシブデザインの検証**: 様々な画面サイズでのレイアウト確認
- **タッチターゲットのサイズ最適化**: モバイルユーザーのためのUI要素の適切なサイズ設定
- **モバイルファーストインデックス対応**: Googleのモバイルファーストインデックスに対応した設計

## 8. インターナショナルSEO対策
- **hreflangタグの実装**: 多言語対応のための言語・地域指定
- **地域特化コンテンツ**: 地域によって異なる商品やプロモーションの提供
- **国際的なターゲティング**: 異なる国や地域向けのSEO戦略

## 9. 技術的SEO改善
- **XMLサイトマップの実装**: 検索エンジンのクロールを助けるサイトマップの作成
- **robots.txtの最適化**: クロールの制御とインデックス登録の管理
- **HTTPステータスコードの適切な使用**: 404、301、302などの適切な使用

## 10. アナリティクスと測定
- **Google Search Consoleの設定**: サイトのインデックス状況やパフォーマンスの監視
- **Google Analyticsの実装**: ユーザー行動の分析とSEO効果の測定
- **コンバージョントラッキング**: 目標達成率の測定と改善

## 11. ソーシャルメディア最適化
- **OGタグの実装**: Facebook、Twitter、LINEなどのソーシャルメディア向けのメタタグ
- **Twitter Cardsの設定**: Twitterでのリンク共有時の表示最適化
- **ソーシャルシェアボタン**: コンテンツの共有を促進するUI要素

## 12. ローカルSEO（実店舗がある場合）
- **Google My Businessの最適化**: 店舗情報の正確な登録と管理
- **ローカルキーワードの活用**: 地域名を含むキーワードの戦略的使用
- **店舗情報の構造化データ**: LocalBusinessスキーマの実装

これらの改善を段階的に実装することで、検索エンジンでの可視性を高め、オーガニックトラフィックを増加させることができるでしょう。特に、Next.jsの機能を活用したメタデータの最適化と、構造化データの実装は比較的短期間で効果を発揮する可能性があります。

**Generation complete!** Please review the code suggestions above.

