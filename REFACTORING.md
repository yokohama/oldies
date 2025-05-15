# 前提
- CLAUDE.mdを読みこのプロジェクト構成を理解すること。
- 混乱を避けるために指示のスコープをあえて狭めています。スコープを超えた改修提案や余計な機能実装提案などは一切おこなわないこと。
- もし以下の説明を読んで、私の指示におかしな点があれば、必ず先に確認をすること。

# 現状の課題
- 今までアプリを特に何も考えずに、use clientによるクライアントサイドの実装をしている
- また、それに合わせてビジネスロジックは、hooksの下にuse〇〇といった形で分離している
- 今後はSEOを考えてサーバーサイドでの実装に移行していく。

# 最ーバーサイドへの移行の実装サンプル
bransのビジネスロジックをサーバーサイドに移行した例があるので、こちらを模範とする。また、サーバーサイドに移行できないクライアント側でのビジネスロジックは、今までどおりに、hooksの下におく。
- app/brands/page.tsx // ルーティングに対応したpage。このドメインで使用するデータをserverから取得。MetaDataの作成。
- components/bransd/*.tsx // page.tsxに使用されるコンポーネント。必要なデータはpage.tsxから渡される。
- lib/server/brandsService.tsx // brandsに提供するサーバーサイドのビジネスロジック。

# このタスクでやりたいこと
## STEP1
移行の際は、page.tsxにSEO対策でメタデータ(lib/metadata.ts)を実装する。
- [完了] 上記の例に習って、app/brands/[brandId]/products/page.tsxも適切に移行する。
- [完了] 上記の例に習って、app/brands/[brandId]/products/[productId]/eras/page.tsxも適切に移行する。
- [完了] 上記の例に習って、app/profile/[id]/page.tsxも適切に移行する。このページは今までの改修と同様に、SEO対策をおこなう。
- [完了] app/profile/editもサーバーサイドに移行したほうがメリットがあるなら行うが、SEO対策の対象ではない。
- [完了] components/brans/BrandsPage.tsxの中身を、app/brans/page.tsxに移行。
- [完了] components/products/ProductsPage.tsxの中身を、app/products/page.tsxに移行。
- [完了] components/profile/ProfilePage.tsxの中身を、app/profile/[id]/page.tsxに移行。サーバーサイドの処理が必要な場合は、lib/server/profileServer.tsを使用する。
- [完了] components/ears/ErasPage.tsxの中身を、app/brans/[brandId]/products/[productId]/eras/page.tsxに移行。サーバーサイドの処理が必要な場合は、lib/server/erasServer.tsを使用する。
- [完了] 上記の修正によって、hooksの中に使われなくなったファイルやメソッドの一覧を作成
- [完了] hooks/eras/useErasCarousel.tsの中で上記の作業により、return中でリターンが不要になったものはあるか？

# リファクタリングのディレクトリ構成
