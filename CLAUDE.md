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
/
├── app/                      # Next.js 13+ App Router
│   ├── brand/                # ブランドページ
│   ├── product/              # 商品ページ
│   ├── product-era-check-point/ # 商品時代チェックポイントページ
│   ├── globals.css           # グローバルスタイル
│   ├── layout.tsx            # ルートレイアウト
│   └── page.tsx              # ホームページ
│
├── components/               # Reactコンポーネント
│   ├── auth/                 # 認証関連コンポーネント
│   ├── brand/                # ブランド関連コンポーネント
│   ├── product/              # 商品関連コンポーネント
│   ├── product_era_check_points/ # 商品時代チェックポイント関連コンポーネント
│   ├── theme/                # テーマ関連コンポーネント
│   └── ui/                   # UIコンポーネント
│
├── contexts/                 # Reactコンテキスト
│   └── AuthContext.tsx       # 認証コンテキスト
│
├── hooks/                    # カスタムReactフック
│
└── lib/                      # ユーティリティと型定義
    ├── api.ts                # API関連ユーティリティ
    ├── database.types.ts     # データベース型定義
    ├── sample-data.ts        # サンプルデータ
    ├── supabase.ts           # Supabaseクライアント設定
    ├── types.ts              # 型定義
    └── utils.ts              # 汎用ユーティリティ関数
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
