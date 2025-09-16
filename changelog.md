# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Version 1.0.0 [2025-09-16]

> **Included Commits**: `git log --oneline 46e5640..3bd5527`
> **Tag**: `v1.0.0`
> **Branch**: `main`
> **Commit**: `3bd5527`

### Added

- Health module (Commits: `3bd5527`, `46e5640`):
  - GraphQL health check endpoint
  - REST health check endpoint
  - Test error endpoints for validation testing
  - Health DTOs with GraphQL decorators
- Global exception filter (Commit: `3bd5527`):
  - Comprehensive error handling for HTTP exceptions
  - Validation error formatting
  - Structured error responses with timestamps
  - Logging for debugging

### Changed

- Application module (Commit: `3bd5527`):
  - Integrated health module into main app module
- Main application bootstrap (Commit: `3bd5527`):
  - Added global exception filter registration

### Removed

- Legacy helper files (Commit: `3bd5527`):
  - Removed `disabled.exception.ts`
  - Removed `exception-handler.helper.ts`
  - Updated helpers index exports
