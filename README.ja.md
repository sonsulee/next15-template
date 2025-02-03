# Next.js テンプレート

Next.jsエコシステムの最新のアップデートと改善を取り入れるため、完全に刷新されたモダンなテンプレートプロジェクトです。

## プロジェクト構成

```
next15-template/
├── src/
│   └── app/                 # App Routerディレクトリ
│       ├── layout.tsx       # ルートレイアウト
│       ├── page.tsx         # ホームページ
│       ├── globals.css      # グローバルスタイル
│       └── favicon.ico      # ファビコン
├── public/                  # 静的ファイル
├── .vscode/
│   └── settings.json       # VSCode設定
└── 設定ファイル
    ├── next.config.ts      # Next.js設定
    ├── tailwind.config.ts  # Tailwind CSS設定
    ├── postcss.config.mjs  # PostCSS設定
    ├── eslint.config.mjs   # ESLint設定
    └── prettier.config.mjs # Prettier設定
```

## 特徴
- **フレームワーク**: App Router対応のNext.js
- **言語**: 型安全性のためのTypeScript
- **スタイリング**: ユーティリティファーストのTailwindCSS
- **開発環境**:
  - 高速な開発のためのTurbopack
  - コード品質のためのESLintとPrettier
  - VSCode設定included
- **パッケージ管理**: pnpm

## 始め方
```bash
# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm dev

# プロダクションビルド
pnpm build

# プロダクションサーバーの起動
pnpm start
```

## スクリプト
- `pnpm dev`: 開発サーバーの起動
- `pnpm build`: プロダクションビルド
- `pnpm start`: プロダクションサーバーの起動
- `pnpm lint`: ESLintの実行
- `pnpm lint:fix`: ESLint問題の修正
- `pnpm format`: Prettierによるコードフォーマット
- `pnpm format:check`: コードフォーマットのチェック
- `pnpm check`: フォーマットチェックとリントの実行
- `pnpm fix`: フォーマットとリント修正の実行
