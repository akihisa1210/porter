# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript bookmarklet that scrapes bibliographic information from Amazon product pages and posts it to Scrapbox. The project builds a self-contained JavaScript bookmarklet using webpack.

## Key Commands

- `npm run build` - Build the bookmarklet for production
- `npm run watch` - Build and watch for changes during development  
- `npm run lint` - Run Biome linting
- `npm run lint:fix` - Fix linting issues automatically
- `npm test` - Run unit tests with Vitest
- `npm run e2e` - Run Playwright end-to-end tests
- `npm run build-e2e` - Build and run e2e tests together
- `npm run release` - Create release PR using shipjs

## Architecture

The codebase follows a clean separation of concerns:

- `main.ts` - Entry point that orchestrates scraping and posting
- `scraper/amazonScraper.ts` - Extracts bibliographic data from Amazon DOM
- `poster/scrapboxPoster.ts` - Formats data and generates Scrapbox URLs
- `bibliography/bibliography.ts` - Type definitions for book data

The scraper handles different Amazon page layouts (with/without book type panels) and extracts title, authors, publisher, publication date, ISBN, description, and cover image. The poster generates properly encoded Scrapbox URLs with formatted content including author links and publication date links.

The build process uses webpack with a bookmarklet wrapper plugin to create a single JavaScript file that can be saved as a browser bookmark.

## Testing

Unit tests use Vitest and are located in `test/` matching the `src/` structure. E2E tests use Playwright and test against static HTML fixtures in `fixture/static/` that represent different Amazon page layouts.

## Development Workflow

Follow Conventional Commits for commit messages. Use `npx git-cz` for guided commit creation. The project uses shipjs for automated releases via GitHub Actions.