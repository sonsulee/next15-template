# Next.js Template

A modern Next.js template project that has been completely revamped to incorporate the latest updates and improvements in the Next.js ecosystem.

## Project Structure

```shell
next15-template/
├── src/
│   └── app/                 # App Router directory
│       ├── layout.tsx       # Root layout
│       ├── page.tsx         # Home page
│       ├── globals.css      # Global styles
│       └── favicon.ico      # Favicon
├── public/                  # Static files
├── .vscode/
│   └── settings.json       # VSCode settings
└── config files
    ├── next.config.ts      # Next.js configuration
    ├── tailwind.config.ts  # Tailwind CSS configuration
    ├── postcss.config.mjs  # PostCSS configuration
    ├── eslint.config.mjs   # ESLint configuration
    └── prettier.config.mjs # Prettier configuration
```

## Features

- **Framework**: Next.js with App Router
- **Language**: TypeScript for type safety
- **Styling**: TailwindCSS utility-first framework
- **Development**:
  - Turbopack for faster development
  - ESLint v9 flat config & Prettier for code quality
  - Enforced import ordering and absolute imports
  - VSCode configuration included
- **Package Management**: pnpm

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

1. **Basic JavaScript and TypeScript Rules**

   - Applies ESLint recommended rules
   - Applies Next.js built-in rules (`next/core-web-vitals`, `next/typescript`)

2. **Import Order and Absolute Path Enforcement**

   - All imports are sorted in a predefined order
   - Grouping by module type and alphabetical sorting
   - Forces the use of absolute paths (`@/`) instead of relative paths (`../`)

3. **Enhanced TypeScript Rules**

   - Warns about unused variables (`@typescript-eslint/no-unused-vars`)
   - Warns about using the `any` type (`@typescript-eslint/no-explicit-any`)
   - Enforces consistent type imports (`@typescript-eslint/consistent-type-imports`)

4. **Prettier Integration**

   - Prevents conflicts between ESLint and Prettier
   - Uses Prettier config for styling

5. **Other Custom Rules**
   - Restricts console usage (`no-console` - only allows warn/error)

#### Configuration Structure

The ESLint configuration is modularized as follows:

1. **ignoresConfig**: Defines file patterns to exclude from ESLint checks

   - Excludes node_modules, .next, dist, CSS/SCSS files, etc.

2. **nextConfig**: Converts Next.js built-in ESLint settings to flat config format

3. **importRulesConfig**: Defines import-related rules

   - Enforces import order, grouping, absolute path usage, etc.

4. **customRulesConfig**: Defines project-specific rules

   - TypeScript-related rules and other custom rules

5. **prettierConfig**: Integrates Prettier with ESLint
   - Applies Prettier rules to ESLint
   - Includes settings to prevent conflicts

#### Key Rules

##### Import Order Rules

```javascript
'import/order': [
  'error',
  {
    groups: [
      'builtin',     // Node.js built-in modules
      'external',    // External packages
      'internal',    // Absolute path imports
      'parent',      // Parent directory imports
      'sibling',     // Same directory imports
      'index',       // Index imports
      'object',      // Object imports
      'type',        // Type imports
    ],
    'newlines-between': 'always',  // Blank lines between groups
    alphabetize: {                 // Alphabetical sorting
      order: 'asc',
      caseInsensitive: true
    },
    pathGroups: [
      {
        pattern: '@/**',           // All imports with '@/'
        group: 'internal',
        position: 'before'
      }
    ],
    pathGroupsExcludedImportTypes: ['builtin']
  }
]
```

##### Absolute Path Enforcement Rule

```javascript
'no-restricted-imports': [
  'error',
  {
    patterns: [
      {
        group: ['../*'],           // Prohibit '../' imports
        message: 'Use absolute imports instead of relative imports'
      }
    ]
  }
]
```

##### TypeScript Rules

```javascript
'@typescript-eslint/no-unused-vars': [
  'warn',
  {
    argsIgnorePattern: '^_',       // Ignore '_' prefixed args
    varsIgnorePattern: '^_',       // Ignore '_' prefixed vars
  },
],
'@typescript-eslint/no-explicit-any': 'warn',
'@typescript-eslint/consistent-type-imports': 'error',
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
- Uses Tailwind CSS plugin (`plugins: ['prettier-plugin-tailwindcss']`)

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
