# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript Chrome extension that scrapes bibliographic information from Amazon product pages and exports it to various destinations like Scrapbox. The project uses webpack to build Chrome extension files.

## Key Commands

- `npm run build` - Build Chrome extension files
- `npm run lint` - Run Biome linting
- `npm run lint:fix` - Fix linting issues automatically
- `npm test` - Run unit tests with Vitest
- `npm run e2e` - Run Playwright end-to-end tests
- `npm run build-e2e` - Build and run e2e tests together
- `npm run release` - Create release PR using shipjs

## Architecture

The codebase follows a clean separation of concerns:

- `src/core/dataSource.ts` - Interface for data source implementations
- `src/core/destination.ts` - Interface for export destination implementations  
- `src/core/porter.ts` - Core orchestration class supporting multiple sources/destinations
- `src/scraper/amazonScraper.ts` - Extracts bibliographic data from Amazon DOM
- `src/poster/scrapboxPoster.ts` - Formats data and generates Scrapbox URLs
- `src/bibliography/bibliography.ts` - Type definitions for book data

The scraper handles different Amazon page layouts (with/without book type panels) and extracts title, authors, publisher, publication date, ISBN, description, and cover image. The poster generates properly encoded Scrapbox URLs with formatted content including author links and publication date links.

The build process uses webpack to build content script and background script files for the Chrome extension.

## Chrome Extension

The Chrome extension provides a clean UI for exporting bibliographic information:

- `manifest.json` - Chrome extension manifest with permissions for Amazon Japan
- `popup.html` and `popup.js` - Extension popup UI for selecting export destinations
- `content.simple.js` - Content script that runs on Amazon pages to scrape data
- `background.js` - Service worker for extension lifecycle management

The extension shows a popup when the toolbar button is clicked on Amazon product pages, allowing users to export bibliographic information to Scrapbox.

## Testing

Unit tests use Vitest and are located in `test/` matching the `src/` structure. E2E tests use Playwright and test against static HTML fixtures in `fixture/static/` that represent different Amazon page layouts.

## Development Workflow

Follow Conventional Commits for commit messages. Use `npx git-cz` for guided commit creation. The project uses shipjs for automated releases via GitHub Actions.

## Code Change Guidelines

- コードの変更が完了したら、npm run lintとnpm run testを通すこと。