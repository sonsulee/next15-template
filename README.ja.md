# Next.js テンプレート

Next.jsエコシステムの最新のアップデートと改善を取り入れるため、完全に刷新されたモダンなテンプレートプロジェクトです。

## プロジェクト構成

```shell
next15-template/
├── src/
│   └── app/                 # App Routerディレクトリ
│       ├── layout.tsx       # ルートレイアウト
│       ├── page.tsx         # ホームページ
│       ├── globals.css.ts   # グローバルスタイル（Vanilla Extract）
│       └── favicon.ico      # ファビコン
├── public/                  # 静的ファイル
├── .vscode/
│   └── settings.json       # VSCode設定
└── 設定ファイル
    ├── next.config.js      # Next.js設定（Vanilla Extractプラグイン付き）
    ├── eslint.config.mjs   # ESLint設定
    └── prettier.config.mjs # Prettier設定
```

## 特徴

- **フレームワーク**: App Router対応のNext.js
- **言語**: 型安全性のためのTypeScript
- **スタイリング**: ゼロランタイムCSS-in-JSのためのVanilla Extract
- **開発環境**:
  - コード品質のためのESLint v9フラット設定とPrettier
  - インポート順序の強制と絶対パスインポート
  - VSCode設定included
  - **注意**: Vanilla Extractとの互換性問題により、Turbopackは無効化されています
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

## Vanilla Extractによるスタイリング

このテンプレートは[Vanilla Extract](https://vanilla-extract.style/)を使用してスタイリングを行い、完全なTypeScriptサポートを備えたゼロランタイムCSS-in-JSを提供します。

### Vanilla Extractを選ぶ理由

- **ゼロランタイム**: すべてのスタイルがビルド時に抽出され、ランタイムオーバーヘッドがゼロ
- **型安全性**: CSSプロパティのオートコンプリート機能を備えた完全なTypeScriptサポート
- **CSS変数**: CSS カスタムプロパティとテーマ機能の組み込みサポート
- **フレームワーク非依存**: あらゆるフレームワークやライブラリで動作
- **馴染みのある構文**: camelCaseの標準的なCSSプロパティ名を使用

### 基本的な使用方法

`.css.ts`ファイルでスタイルを作成：

```typescript
// styles.css.ts
import { style } from '@vanilla-extract/css';

export const container = style({
  padding: '1rem',
  backgroundColor: '#f0f0f0',
  borderRadius: '8px',
});
```

コンポーネントで使用：

```typescript
// component.tsx
import { container } from './styles.css.ts';

export function MyComponent() {
  return <div className={container}>コンテンツ</div>;
}
```

### グローバルスタイル

グローバルスタイルは`src/app/globals.css.ts`で定義：

```typescript
import { globalStyle } from '@vanilla-extract/css';

globalStyle('body', {
  margin: 0,
  fontFamily: 'Arial, sans-serif',
});
```

### 重要な注意事項

- **Turbopack互換性**: Vanilla ExtractはNext.js 15のTurbopackと現在互換性問題があります。このテンプレートは適切な動作を保証するため、開発時にTurbopackを無効化しています。
- **ファイル命名**: スタイルファイルはVanilla Extractで処理されるため、`.css.ts`で終わる必要があります。
- **ビルド時処理**: スタイルはビルド時に生成され、最適なランタイムパフォーマンスを保証します。

## コード品質

このテンプレートではコード品質のためにESLint v9フラット構成とPrettierを使用しています。

### ESLint設定

#### 主な機能

1. **TypeScriptルール**
   - `any`型の使用を防止（`@typescript-eslint/no-explicit-any`）
   - 型のみのインポートには`import type`の使用を強制（`@typescript-eslint/consistent-type-imports`）
   - 未使用変数について警告、ただし`_`プレフィックス付きは除外（`@typescript-eslint/no-unused-vars`）

2. **Reactルール**
   - 配列内のすべてのコンポーネントにキーを要求（`react/jsx-key`）
   - React Hooksルールを強制（`react-hooks/rules-of-hooks`）
   - フック内の依存関係の不足について警告（`react-hooks/exhaustive-deps`）

3. **インポート整理**
   - グループ別にインポートを整理し、アルファベット順に並べ替え（`import/order`）
   - グループ順序：builtin → external → internal → parent → sibling → index → type
   - インポートグループ間に空行を要求

4. **一般的なルール**
   - ネイティブの`no-unused-vars`を無効化（TypeScriptが処理）
   - 再代入されない変数には`const`を強制（`prefer-const`）
   - `warn`と`error`以外のconsole使用について警告（`no-console`）
   - TypeScript enumの使用を防止、const assertionsまたはunion型の使用を推奨（`no-restricted-syntax`）

5. **Prettier統合**
   - ESLintとPrettierの間の競合を防止
   - コードフォーマットにPrettier設定を使用

#### 設定構造

ESLint設定は新しいフラット構成形式を使用し、以下を含みます：

1. **ignoresConfig**: ESLintチェックから除外するファイルパターンを定義
   - 除外対象：`dist`、`node_modules`、`build`、`.next`、`coverage`、`*.min.js`、`*.d.ts`、`.history`、`**/.git/**`

2. **基本設定**：
   - ESLint推奨ルール（`js.configs.recommended`）
   - Next.js組み込みルール（`next/core-web-vitals`、`next/typescript`）

3. **customRulesConfig**: すべてのプロジェクト固有のルールを含む：
   - TypeScriptルール
   - ReactおよびReact Hooksルール
   - インポート整理ルール
   - 一般的なJavaScriptルール
   - Prettier統合

4. **Prettier設定**：
   - 競合するルールを無効化するESLint Config Prettier
   - フォーマット用のPrettierプラグイン

#### 主要なルール

##### インポート順序ルール

```javascript
'import/order': [
  'error',
  {
    groups: [
      'builtin',     // Node.js組み込みモジュール
      'external',    // 外部パッケージ
      'internal',    // 内部モジュール
      'parent',      // 親ディレクトリインポート
      'sibling',     // 同じディレクトリインポート
      'index',       // インデックスインポート
      'type',        // 型インポート
    ],
    'newlines-between': 'always',  // グループ間に空行を要求
    alphabetize: {                 // アルファベット順ソート
      order: 'asc',
      caseInsensitive: true
    },
  }
]
```

##### TypeScriptルール

```javascript
// 'any'型の使用を防止
'@typescript-eslint/no-explicit-any': 'error',

// 型のみのインポートには型インポートを強制
'@typescript-eslint/consistent-type-imports': [
  'error',
  {
    prefer: 'type-imports',
    fixStyle: 'inline-type-imports',
  },
],

// 未使用変数について警告（例外付き）
'@typescript-eslint/no-unused-vars': [
  'error',
  {
    argsIgnorePattern: '^_',           // '_'で始まる引数は無視
    varsIgnorePattern: '^_',           // '_'で始まる変数は無視
    caughtErrorsIgnorePattern: '^_',  // '_'で始まるキャッチエラーは無視
  },
],
```

##### Reactルール

```javascript
// 配列のすべてのコンポーネントにキーを要求
'react/jsx-key': ['error', { checkFragmentShorthand: true }],

// React Hooksルールを強制
'react-hooks/rules-of-hooks': 'error',
'react-hooks/exhaustive-deps': 'warn',
```

##### 一般的なルール

```javascript
// ベースルールを無効化（TypeScriptルールが処理）
'no-unused-vars': 'off',

// 変更されない変数にはconstを強制
'prefer-const': 'error',

// console使用を制限
'no-console': ['warn', { allow: ['warn', 'error'] }],

// TypeScript enumの使用を防止
'no-restricted-syntax': [
  'error',
  {
    selector: 'TSEnumDeclaration',
    message: 'Use const assertions or union types instead of enums.',
  },
],
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
- 必要に応じて追加のフォーマットプラグインをサポート

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
3. **Prettier ESLint**(Rebecca Shen): `rvest.vs-code-prettier-eslint`

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
