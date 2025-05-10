# Next.js テンプレート

Next.jsエコシステムの最新のアップデートと改善を取り入れるため、完全に刷新されたモダンなテンプレートプロジェクトです。

## プロジェクト構成

```shell
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
  - コード品質のためのESLint v9フラット設定とPrettier
  - インポート順序の強制と絶対パスインポート
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

## コード品質

このテンプレートではコード品質のためにESLint v9フラット構成とPrettierを使用しています。

### ESLint設定

#### 主な機能

1. **基本的なJavaScriptとTypeScriptのルール**

   - ESLint推奨ルールを適用
   - Next.js組み込みルール（`next/core-web-vitals`、`next/typescript`）を適用

2. **インポート順序と絶対パスの強制**

   - すべてのインポートが定義された順序で並べ替え
   - モジュールタイプによるグループ化とアルファベット順でのソート
   - 相対パス（`../`）ではなく絶対パス（`@/`）の使用を強制

3. **強化されたTypeScriptルール**

   - 未使用変数についての警告（`@typescript-eslint/no-unused-vars`）
   - `any`型の使用についての警告（`@typescript-eslint/no-explicit-any`）
   - 一貫した型インポートの強制（`@typescript-eslint/consistent-type-imports`）

4. **Prettierとの統合**

   - ESLintとPrettierの間の競合を防止
   - スタイリングにPrettier設定を使用

5. **その他のカスタムルール**
   - コンソール使用の制限（`no-console` - warnとerrorのみ許可）

#### 設定構造

ESLint設定は以下のようにモジュール化されています：

1. **ignoresConfig**: ESLintチェックから除外するファイルパターンを定義

   - node_modules、.next、dist、CSS/SCSSファイルなどを除外

2. **nextConfig**: Next.js組み込みのESLint設定をフラット構成形式に変換

3. **importRulesConfig**: インポート関連のルールを定義

   - インポート順序、グループ化、絶対パス使用などを強制

4. **customRulesConfig**: プロジェクト固有のルールを定義

   - TypeScript関連のルールなどのカスタムルール

5. **prettierConfig**: PrettierをESLintと統合
   - ESLintにPrettierルールを適用
   - 競合を防止する設定を含む

#### 主要なルール

##### インポート順序ルール

```javascript
'import/order': [
  'error',
  {
    groups: [
      'builtin',     // Node.js組み込みモジュール
      'external',    // 外部パッケージ
      'internal',    // 絶対パスインポート
      'parent',      // 親ディレクトリインポート
      'sibling',     // 同じディレクトリインポート
      'index',       // インデックスインポート
      'object',      // オブジェクトインポート
      'type',        // 型インポート
    ],
    'newlines-between': 'always',  // グループ間に空行を要求
    alphabetize: {                 // アルファベット順ソート
      order: 'asc',
      caseInsensitive: true
    },
    pathGroups: [
      {
        pattern: '@/**',           // '@/'で始まるすべてのインポート
        group: 'internal',
        position: 'before'
      }
    ],
    pathGroupsExcludedImportTypes: ['builtin']
  }
]
```

##### 絶対パス強制ルール

```javascript
'no-restricted-imports': [
  'error',
  {
    patterns: [
      {
        group: ['../*'],           // '../'インポートを禁止
        message: '相対インポートではなく絶対インポートを使用してください'
      }
    ]
  }
]
```

##### TypeScriptルール

```javascript
'@typescript-eslint/no-unused-vars': [
  'warn',
  {
    argsIgnorePattern: '^_',       // '_'で始まる引数は無視
    varsIgnorePattern: '^_',       // '_'で始まる変数は無視
  },
],
'@typescript-eslint/no-explicit-any': 'warn',        // 'any'型使用時に警告
'@typescript-eslint/consistent-type-imports': 'error', // 'import type'の使用を強制
```

### Prettier設定

Prettier設定は以下のスタイリングを適用します：

- セミコロンを使用（`semi: true`）
- シングルクォートを使用（`singleQuote: true`）
- タブに2スペースを使用（`tabWidth: 2`）
- すべての場所でトレイリングカンマを使用（`trailingComma: 'all'`）
- 最大行長を100文字に設定（`printWidth: 100`）
- アロー関数では常に括弧を使用（`arrowParens: 'always'`）
- LF改行を使用（`endOfLine: 'lf'`）
- Tailwind CSSプラグインを使用（`plugins: ['prettier-plugin-tailwindcss']`）

### IDE統合

このプロジェクトには、ファイル保存時に自動的にESLintとPrettierを実行するVSCode設定が含まれています。これらの設定は`.vscode/settings.json`で定義されています。

#### 保存時の動作

プロジェクト設定でVSCodeでファイルを保存すると：

1. **自動フォーマット**: まず、Prettierが`prettier.config.mjs`の設定に基づいてファイル全体をフォーマットします。
2. **ESLint修正**: 次に、ESLintがインポートの並べ替えなどの修正可能なリント問題を修正します。
3. **インポート整理**: 最後に、構成されたルールに従ってインポートが整理されます。

#### 必要なVSCode拡張機能

自動フォーマットが正しく機能するには、以下のVSCode拡張機能が必要です：

1. **ESLint**（Microsoft製）: `dbaeumer.vscode-eslint`
2. **Prettier - Code formatter**（Prettier製）: `esbenp.prettier-vscode`

#### Cursorの使用

CursorはVSCodeと類似の設定を持っています。自動フォーマットが機能しない場合：

1. Cursorの設定で「Format on Save」が有効になっていることを確認
2. プロジェクトと必要な拡張機能をインストールした後、Cursorを再起動
3. 必要に応じて「Developer: Reload Window」コマンドを試す

#### その他のIDE設定

#### WebStorm/IntelliJ IDEA

1. Preferences > Languages & Frameworks > JavaScript > Code Quality Tools > ESLintに移動
2. 「Automatic ESLint configuration」を有効にする
3. 「Run eslint --fix on save」をチェック
4. Preferences > Languages & Frameworks > JavaScript > Prettier に移動
5. 「Prettier package」を有効にし、Prettierインストールを選択
6. 「Run on save」をチェック

### トラブルシューティング

#### 一般的な問題

1. **プラグインの競合**

   - 「Cannot redefine plugin X」のエラーが表示される場合、プラグインが複数回インポートされています
   - 解決策：重複するプラグインインポートを削除するか、互換性レイヤーを使用する

2. **インポート順序エラー**

   - インポート順序に関する多くのエラーが表示される場合
   - 解決策：`pnpm run lint`を実行してすべてのエラーを確認し、`pnpm run fix`を実行して自動修正する

3. **自動フォーマットが機能しない**

   - 必要な拡張機能がインストールされていることを確認
   - ワークスペース設定がプロジェクト設定を上書きしていないか確認
   - 「Developer: Reload Window」を実行し、「Output」パネル（ESLint）を確認

4. **パスエイリアス設定**

   - 絶対インポートが正しく動作するには、`tsconfig.json`に適切なパスエイリアスがあることを確認：

   ```json
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": {
         "@/*": ["src/*"]
       }
     }
   }
   ```
