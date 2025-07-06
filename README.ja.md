# Next.js テンプレート

Next.jsエコシステムの最新のアップデートと改善を取り入れるため、完全に刷新されたモダンなテンプレートプロジェクトです。

## プロジェクト構成

```shell
next15-template/
├── src/
│   ├── app/                 # App Routerディレクトリ
│   │   ├── layout.tsx       # StyleXプロバイダー付きルートレイアウト
│   │   ├── page.tsx         # ホームページ
│   │   ├── page.styles.ts   # StyleXスタイル
│   │   ├── globals.css      # グローバルスタイル
│   │   └── favicon.ico      # ファビコン
│   ├── components/          # 再利用可能なコンポーネント
│   │   └── Button/          # StyleX使用例のコンポーネント
│   │       ├── Button.tsx
│   │       ├── Button.styles.ts
│   │       └── index.ts
│   └── tokens/              # StyleXデザイントークン
│       └── index.stylex.ts  # カラー、スペーシング、タイポグラフィトークン
├── public/                  # 静的ファイル
├── .vscode/
│   └── settings.json       # VSCode設定
└── 設定ファイル
    ├── next.config.ts      # Next.js + StyleX設定
    ├── postcss.config.mjs  # PostCSS設定
    ├── eslint.config.mjs   # ESLint + StyleXプラグイン設定
    └── prettier.config.mjs # Prettier設定
```

## 特徴

- **フレームワーク**: App Router対応のNext.js 15.3.5
- **言語**: 型安全性のためのTypeScript 5.8.3
- **スタイリング**: コンパイル時最適化を備えたStyleX CSS-in-JS
- **開発環境**:
  - ~~高速な開発のためのTurbopack~~ (StyleX SWCバージョン使用のために必要な@next/eslint-plugin-nextがwebpackでラップされているためturbopack使用不可)
  - コード品質のためのESLint v9フラット設定とPrettier
  - スタイル検証のためのStyleX ESLintプラグイン
  - インポート順序の強制と絶対パスインポート
  - VSCode設定included
- **パッケージ管理**: pnpm 10.11.0

## StyleX統合

このテンプレートでは、コンパイル時最適化を備えた**StyleX** CSS-in-JSスタイリングを使用しています。StyleXは以下を提供します：

- **型安全なスタイリング**: オートコンプリート機能付きの完全なTypeScriptサポート
- **コンパイル時最適化**: ビルド時にスタイルが抽出・最適化される
- **アトミックCSS生成**: アトミックCSSクラスを自動生成
- **デザイントークン**: `tokens/index.stylex.ts`による一元的なテーマ管理
- **共存配置**: スタイル定義をコンポーネントと一緒に配置可能

### このテンプレートの主要なStyleX機能

1. **デザイントークン**: カラー、スペーシング、タイポグラフィの一元的な定義
2. **コンポーネントスタイル**: 各コンポーネントに独自の`.styles.ts`ファイル
3. **SWCコンパイラー**: `@stylexswc/nextjs-plugin`による高速コンパイル
4. **ESLint統合**: `@stylexjs/eslint-plugin`によるスタイル検証

### 使用例

```typescript
// tokens/index.stylex.ts
import * as stylex from '@stylexjs/stylex';

export const colors = stylex.defineVars({
  primary: '#007bff',
  secondary: '#6c757d',
});

// components/Button/Button.styles.ts
import * as stylex from '@stylexjs/stylex';
import { colors } from '@/tokens/index.stylex';

export const styles = stylex.create({
  button: {
    backgroundColor: colors.primary,
    color: 'white',
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
  },
});

// components/Button/Button.tsx
import * as stylex from '@stylexjs/stylex';
import { styles } from './Button.styles';

export function Button({ children, ...props }) {
  return (
    <button {...stylex.props(styles.button)} {...props}>
      {children}
    </button>
  );
}
```

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

5. **StyleX統合**
   - スタイル検証のためのStyleX ESLintプラグイン（`@stylexjs/eslint-plugin`）
   - StyleXのベストプラクティスの強制と一般的なミスの防止
   - デザイントークンの使用とスタイル定義の検証

6. **Prettier統合**
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
- スタイリング固有のプラグインは不要（StyleXが独自のフォーマットを処理）

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
