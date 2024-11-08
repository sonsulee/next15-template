# Nextjs15 + eslint9: Boilerplate

A modern boilerplate showcasing ESLint 9 integration with Next.js 15, featuring Prettier, Husky, lint-staged, and Docker support.

## Features

### ESLint Configuration
- Uses ESLint's new flat config system
- Integrates with Next.js recommended rules
- TypeScript support
- Integration with Prettier

### Prettier Configuration
Code formatting is handled automatically through Prettier integration.

### Git Hooks (Husky)
- Pre-commit: Runs lint-staged
- Commit-msg: Validates commit messages

## Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format
```
<type>: <description>

[optional body]

[optional footer(s)]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding/modifying tests
- `chore`: Build process or auxiliary tool changes
- `perf`: Performance improvements

### Rules
- Use lowercase for commit message
- No period at the end
- Keep the subject line concise
- Use imperative mood ("add" instead of "added")

### Examples
```bash
chore: add eslint configuration
feat: implement user authentication
fix: resolve login page redirect issue
```

## Using Docker

1. install Docker on your machine.
2. Build your container: `docker build -t [image-name] .`
3. Run your container: `docker run -p 3000:3000 [image-name]`

### In existing projects

To add support for Docker to an existing project, just copy the Dockerfile into the root of the project and add the following to the next.config.js file:

```javascript
// next.config.js
module.exports = {
    // ... rest of the configuration.
    output: "standalone",
};
```

This will build the project as a standalone app inside the Docker image.

## Running Locally

This project uses pnpm as the default package manager. However, you can use npm or yarn if preferred.

### install package
```bash
# Using pnpm (recommended)
pnpm install

# Using npm
npm install

# Using yarn
yarn install
```

### run development server

```bash
# Using pnpm (recommended)
pnpm dev

# Using npm
npm run dev

# Using yarn
yarn dev
```

Open http://localhost:3000 with your browser to see the result.

## Reference

- https://www.conventionalcommits.org/en/v1.0.0/
- https://github.com/underground0930/nextjs-eslint-2024
- https://eslint.org/docs/latest/use/configure/configuration-files#using-predefined-configurations
- https://nextjs.org/docs/app/building-your-application/configuring/eslint