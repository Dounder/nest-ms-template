<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Nest REST template

A starter template for building scalable and maintainable server-side applications using NestJS, PostgreSQL, and Docker. This template includes essential configurations, best practices, and tools to kickstart your development process.

## Installation

1. Clone the repository
2. Copy the `.env.example` file to `.env` and fill in the required environment variables
3. Run `pnpm install` to install dependencies (this also installs Git hooks automatically)
4. Run `docker compose -f compose.yml up -d` to start PostgreSQL and pgAdmin
   - This will start a PostgreSQL instance and a pgAdmin instance for database management
   - To stop the instances, run `docker compose -f compose.yml down`
5. Run `pnpm run start:dev` to start the development server

## Git Hooks Setup

This project uses Lefthook for code quality. Hooks are installed automatically with `pnpm install`.

### What happens automatically:

**On commit:**

- ESLint fixes code issues
- Prettier formats your code
- TypeScript checks for errors

**On push:**

- Runs all tests
- Checks code quality

### Commit message format:

```bash
git commit -m "feat: description"
git commit -m "fix: description"
```

### Manual commands:

```bash
pnpm run lint              # Fix code issues
pnpm run test              # Run tests
pnpm run hooks:install     # Reinstall hooks if needed
```
