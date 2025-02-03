# Next.js Template

A modern Next.js template project that has been completely revamped to incorporate the latest updates and improvements in the Next.js ecosystem.

## Project Structure

```
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
  - ESLint & Prettier for code quality
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
