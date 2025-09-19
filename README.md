# Next.js Personal Template

My personal Next.js template with TypeScript, Tailwind CSS, and opinionated best practices for rapid development.

## Tech Stack

- **Framework**: [Next.js 15.5.3](https://nextjs.org/) with App Router & Turbopack
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [TanStack Query](https://tanstack.com/query) (for complex server state)
- **Form Management**: [React Hook Form](https://react-hook-form.com/) (for complex forms)
- **Code Quality**: [Biome 2.2.0](https://biomejs.dev/) (linter & formatter)
- **Testing**: [Vitest](https://vitest.dev/) + [Playwright](https://playwright.dev/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## Features

- ⚡️ **Fast Development** - Turbopack for blazing fast HMR
- 🎨 **Modern UI** - Tailwind CSS 4 with modern design patterns
- 🔒 **Type Safety** - Full TypeScript support with strict mode
- 🏗️ **Scalable Architecture** - Feature-based modular structure
- 📝 **Form Handling** - Server Actions for simple forms, React Hook Form for complex ones
- 🧪 **Testing Ready** - Unit, integration, and E2E testing setup
- 🎯 **Best Practices** - ESLint, Prettier alternative (Biome), and conventional commits
- 🚀 **Production Ready** - Optimized build with automatic optimizations

## Project Structure

```text
.
├── app/                 # Next.js App Router
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── error.tsx       # Error boundary
├── features/           # Feature-based modules
│   └── [feature]/
│       ├── components/ # Feature-specific UI components
│       ├── hooks/      # Feature-specific hooks
│       ├── services/   # Feature-specific API services
│       ├── types/      # Feature-specific types
│       └── index.ts    # Public API exports
├── components/         # Shared components
│   ├── ui/            # Pure UI components
│   └── layouts/       # Layout components
├── lib/               # Shared utilities and helpers
├── types/             # Global type definitions
├── docs/              # Project documentation
│   ├── react-hook-form-guide.md
│   └── tanstack-query-guide.md
└── public/            # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm (recommended) or npm

### Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/next-template.git
cd next-template
```

Install dependencies:

```bash
pnpm install
# or
npm install
```

Run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

```bash
# Development
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run Biome linter
pnpm format       # Format code with Biome
pnpm typecheck    # Run TypeScript type checking

# Testing
pnpm test         # Run unit tests with Vitest
pnpm test:ui      # Run tests with UI
pnpm test:e2e     # Run E2E tests with Playwright
```

## Development Guidelines

### Component Development

- **Server Components by default** - Use Client Components only when necessary
- **Composition over inheritance** - Build complex components from simple ones
- **Single Responsibility** - Each component should do one thing well

### State Management

1. **Server State**: Use Server Components for initial data
2. **Simple Client State**: Use React hooks (useState, useReducer)
3. **Complex Server State**: Use TanStack Query for caching and synchronization

### Form Handling

- **Simple Forms** (< 5 fields): Use Server Actions
- **Complex Forms**: Use React Hook Form with Zod validation

### Error Handling

- Route-level errors: Use `error.tsx` files
- Component-level errors: Use Error Boundaries strategically
- Global errors: Use `global-error.tsx`

## Testing

### Unit Tests

```bash
pnpm test
```

### E2E Tests

```bash
pnpm test:e2e
```

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/next-template)

### Docker

```bash
docker build -t next-template .
docker run -p 3000:3000 next-template
```

### Other Platforms

This template can be deployed to any platform that supports Node.js:

- AWS (EC2, ECS, Lambda)
- Google Cloud Platform
- Azure
- Netlify
- Railway

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Database (if needed)
DATABASE_URL=your_database_url

# Authentication (if needed)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
```

## Performance

- **Automatic Image Optimization** - Next.js Image component
- **Font Optimization** - Automatic font optimization
- **Code Splitting** - Automatic per-route code splitting
- **Prefetching** - Automatic link prefetching in production

## Note

This is a personal template repository containing my preferred setup and configurations for Next.js projects. Feel free to use it as a starting point for your own projects, but note that the choices made here reflect personal preferences and may not suit every use case.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Vercel](https://vercel.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TanStack](https://tanstack.com/)

---

Built with ❤️ using Next.js and TypeScript
