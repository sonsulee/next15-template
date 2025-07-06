# Next.js Template

A modern Next.js template project that has been completely revamped to incorporate the latest updates and improvements in the Next.js ecosystem.

## Project Structure

```shell
next15-template/
├── src/
│   ├── app/                 # App Router directory
│   │   ├── layout.tsx       # Root layout with StyleX provider
│   │   ├── page.tsx         # Home page
│   │   ├── page.styles.ts   # StyleX styles
│   │   ├── globals.css      # Global styles
│   │   └── favicon.ico      # Favicon
│   ├── components/          # Reusable components
│   │   └── Button/          # Example component with StyleX
│   │       ├── Button.tsx
│   │       ├── Button.styles.ts
│   │       └── index.ts
│   └── tokens/              # StyleX design tokens
│       └── index.stylex.ts  # Color, spacing, typography tokens
├── public/                  # Static files
├── .vscode/
│   └── settings.json       # VSCode settings
└── config files
    ├── next.config.ts      # Next.js + StyleX configuration
    ├── postcss.config.mjs  # PostCSS configuration
    ├── eslint.config.mjs   # ESLint + StyleX plugin configuration
    └── prettier.config.mjs # Prettier configuration
```

## Features

- **Framework**: Next.js 15.3.5 with App Router
- **Language**: TypeScript 5.8.3 for type safety
- **Styling**: StyleX for CSS-in-JS with compile-time optimizations
- **Development**:
  - ~~Turbopack for faster development~~ (Cannot use Turbopack because @next/eslint-plugin-next required for StyleX SWC version is wrapped with webpack)
  - ESLint v9 flat config & Prettier for code quality
  - StyleX ESLint plugin for style validation
  - Enforced import ordering and absolute imports
  - VSCode configuration included
- **Package Management**: pnpm 10.11.0

## StyleX Integration

This template uses **StyleX** for CSS-in-JS styling with compile-time optimizations. StyleX provides:

- **Type-safe styling**: Full TypeScript support with autocompletion
- **Compile-time optimization**: Styles are extracted and optimized at build time
- **Atomic CSS generation**: Automatically generates atomic CSS classes
- **Design tokens**: Centralized theme management with `tokens/index.stylex.ts`
- **Co-location**: Style definitions can be placed alongside components

### Key StyleX Features in This Template

1. **Design Tokens**: Centralized color, spacing, and typography definitions
2. **Component Styles**: Each component has its own `.styles.ts` file
3. **SWC Compiler**: Fast compilation with `@stylexswc/nextjs-plugin`
4. **ESLint Integration**: Style validation with `@stylexjs/eslint-plugin`

### Example Usage

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

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Scripts

- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm start`: Start production server
- `pnpm lint`: Run ESLint
- `pnpm lint:fix`: Fix ESLint issues
- `pnpm format`: Format code with Prettier
- `pnpm format:check`: Check code formatting
- `pnpm check`: Run format check and lint
- `pnpm fix`: Run format and lint fix

## Code Quality

This template uses ESLint v9 with flat config and Prettier for code quality.

### ESLint Configuration

#### Key Features

1. **TypeScript Rules**
   - Prevents use of `any` type (`@typescript-eslint/no-explicit-any`)
   - Enforces using `import type` for type-only imports (`@typescript-eslint/consistent-type-imports`)
   - Warns about unused variables with `_` prefix exceptions (`@typescript-eslint/no-unused-vars`)

2. **React Rules**
   - Ensures all components in arrays have keys (`react/jsx-key`)
   - Enforces React Hooks rules (`react-hooks/rules-of-hooks`)
   - Warns about missing dependencies in hooks (`react-hooks/exhaustive-deps`)

3. **Import Organization**
   - Organizes imports by groups with alphabetical sorting (`import/order`)
   - Groups: builtin → external → internal → parent → sibling → index → type
   - Requires blank lines between import groups

4. **General Rules**
   - Disables native `no-unused-vars` (TypeScript handles this)
   - Enforces `const` for variables that are never reassigned (`prefer-const`)
   - Warns on console usage except `warn` and `error` (`no-console`)
   - Prevents TypeScript enum usage, recommends const assertions or union types (`no-restricted-syntax`)

5. **StyleX Integration**
   - StyleX ESLint plugin for style validation (`@stylexjs/eslint-plugin`)
   - Enforces StyleX best practices and prevents common mistakes
   - Validates design token usage and style definitions

6. **Prettier Integration**
   - Prevents conflicts between ESLint and Prettier
   - Uses Prettier config for code formatting

#### Configuration Structure

The ESLint configuration uses the new flat config format and includes:

1. **ignoresConfig**: Defines file patterns to exclude from ESLint checks
   - Excludes: `dist`, `node_modules`, `build`, `.next`, `coverage`, `*.min.js`, `*.d.ts`, `.history`, `**/.git/**`

2. **Base Configuration**:
   - ESLint recommended rules (`js.configs.recommended`)
   - Next.js built-in rules (`next/core-web-vitals`, `next/typescript`)

3. **customRulesConfig**: All project-specific rules including:
   - TypeScript rules
   - React and React Hooks rules
   - Import organization rules
   - General JavaScript rules
   - Prettier integration

4. **Prettier Configuration**:
   - ESLint Config Prettier to disable conflicting rules
   - Prettier plugin for formatting

#### Key Rules

##### Import Order Rule

```javascript
'import/order': [
  'error',
  {
    groups: [
      'builtin',     // Node.js built-in modules
      'external',    // External packages
      'internal',    // Internal modules
      'parent',      // Parent directory imports
      'sibling',     // Same directory imports
      'index',       // Index imports
      'type',        // Type imports
    ],
    'newlines-between': 'always',  // Blank lines between groups
    alphabetize: {                 // Alphabetical sorting
      order: 'asc',
      caseInsensitive: true
    },
  }
]
```

##### TypeScript Rules

```javascript
// Prevent use of 'any' type
'@typescript-eslint/no-explicit-any': 'error',

// Enforce type imports for type-only imports
'@typescript-eslint/consistent-type-imports': [
  'error',
  {
    prefer: 'type-imports',
    fixStyle: 'inline-type-imports',
  },
],

// Warn about unused variables (with exceptions)
'@typescript-eslint/no-unused-vars': [
  'error',
  {
    argsIgnorePattern: '^_',           // Ignore '_' prefixed args
    varsIgnorePattern: '^_',           // Ignore '_' prefixed vars
    caughtErrorsIgnorePattern: '^_',  // Ignore '_' prefixed caught errors
  },
],
```

##### React Rules

```javascript
// Ensure all array components have keys
'react/jsx-key': ['error', { checkFragmentShorthand: true }],

// Enforce React Hooks rules
'react-hooks/rules-of-hooks': 'error',
'react-hooks/exhaustive-deps': 'warn',
```

##### General Rules

```javascript
// Disable base rule (TypeScript rule handles this)
'no-unused-vars': 'off',

// Enforce const for unchanged variables
'prefer-const': 'error',

// Restrict console usage
'no-console': ['warn', { allow: ['warn', 'error'] }],

// Prevent TypeScript enum usage
'no-restricted-syntax': [
  'error',
  {
    selector: 'TSEnumDeclaration',
    message: 'Use const assertions or union types instead of enums.',
  },
],
```

### Prettier Configuration

The Prettier configuration applies the following styling:

- Uses semicolons (`semi: true`)
- Uses single quotes (`singleQuote: true`)
- Uses 2 spaces for tabs (`tabWidth: 2`)
- Uses trailing commas in all places (`trailingComma: 'all'`)
- Sets max line length to 100 characters (`printWidth: 100`)
- Always uses parentheses in arrow functions (`arrowParens: 'always'`)
- Uses LF line endings (`endOfLine: 'lf'`)
- No styling-specific plugins needed (StyleX handles its own formatting)

### IDE Integration

The project includes VSCode settings that automatically run ESLint and Prettier when saving files. These settings are defined in `.vscode/settings.json`.

#### What Happens On Save

When you save a file in VSCode with the project settings:

1. **Auto-formatting**: First, Prettier formats the file based on the configuration in `prettier.config.mjs`.
2. **ESLint fixes**: Then, ESLint fixes any fixable linting issues (like import sorting).
3. **Organized imports**: Finally, imports are organized according to the configured rules.

#### Required VSCode Extensions

For the auto-formatting to work correctly, you need these VSCode extensions:

1. **ESLint** (by Microsoft): `dbaeumer.vscode-eslint`
2. **Prettier - Code formatter** (by Prettier): `esbenp.prettier-vscode`
3. **Prettier ESLint**(Rebecca Shen): `rvest.vs-code-prettier-eslint`

#### Using Cursor

Cursor has similar settings to VSCode. If auto-formatting isn't working:

1. Check Cursor preferences and ensure "Format on Save" is enabled
2. Restart Cursor after installing the project and required extensions
3. If needed, try the "Developer: Reload Window" command

#### Other IDEs Setup

#### WebStorm/IntelliJ IDEA

1. Go to Preferences > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint
2. Enable "Automatic ESLint configuration"
3. Check "Run eslint --fix on save"
4. Go to Preferences > Languages & Frameworks > JavaScript > Prettier
5. Enable "Prettier package" and select your Prettier installation
6. Check "Run on save"

### Troubleshooting

#### Common Issues

1. **Plugin Conflicts**
   - If you see "Cannot redefine plugin X", a plugin is being imported multiple times
   - Solution: Remove duplicate plugin imports or use the compatibility layer

2. **Import Order Errors**
   - When seeing many import ordering errors
   - Solution: Run `pnpm run lint` to see all errors, then run `pnpm run fix` to fix automatically

3. **Auto-formatting Not Working**
   - Ensure you have required extensions installed
   - Check that workspace settings aren't overriding project settings
   - Run "Developer: Reload Window" and check the "Output" panel (ESLint)

4. **Path Alias Configuration**
   - For absolute imports to work correctly, ensure your `tsconfig.json` has proper path aliases:

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
