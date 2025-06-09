# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript project that scrapes bibliographic information from Amazon product pages and posts it to Scrapbox. It supports both bookmarklet and Chrome extension formats. The project uses webpack to build a self-contained JavaScript bookmarklet and Chrome extension files.

## Key Commands

- `npm run build` - Build the bookmarklet for production
- `npm run build:extension` - Build Chrome extension files
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

The build process uses webpack with a bookmarklet wrapper plugin to create a single JavaScript file that can be saved as a browser bookmark. For Chrome extension, it builds content script and background script files.

## Chrome Extension

The Chrome extension provides the same functionality as the bookmarklet but with a cleaner UI:

- `manifest.json` - Chrome extension manifest with permissions for Amazon Japan
- `popup.html` and `popup.js` - Extension popup UI for selecting export destinations
- `content.simple.js` - Content script that runs on Amazon pages to scrape data
- `background.js` - Service worker for extension lifecycle management

The extension shows a popup when the toolbar button is clicked on Amazon product pages, allowing users to export bibliographic information to Scrapbox.

## Testing

Unit tests use Vitest and are located in `test/` matching the `src/` structure. E2E tests use Playwright and test against static HTML fixtures in `fixture/static/` that represent different Amazon page layouts.

## Development Workflow

Follow Conventional Commits for commit messages. Use `npx git-cz` for guided commit creation. The project uses shipjs for automated releases via GitHub Actions.