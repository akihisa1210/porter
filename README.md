# Porter Chrome Extension

Chrome extension to export bibliographic information from Amazon to various destinations like Scrapbox.

## Features

- Export bibliographic information from Amazon Japan product pages
- Clean popup UI for selecting export destinations
- Support for Scrapbox export with formatted content
- Extensible architecture for future data sources and destinations

## Installation

1. Build the extension:
   ```sh
   npm install
   npm run build
   ```

2. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist` folder

## Usage

1. Navigate to an Amazon Japan product page
2. Click the Porter extension icon in the toolbar
3. Select "Scrapbox" from the popup menu
4. The bibliographic information will be exported to your Scrapbox project

## Development

### Setup

```sh
npm install
npm run build
```

### Build Commands

- `npm run build` - Build Chrome extension for production
- `npm run lint` - Run linting checks
- `npm run test` - Run unit tests
- `npm run e2e` - Run end-to-end tests

### Commit

Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). [git-cz](https://github.com/streamich/git-cz) is useful.

```sh
npx git-cz
```

## Release

1. Run `npm run release` on main branch.

```sh
git switch main
npm run release
```

2. Release Pull Request is created by the above command. Review and merge the PR into main branch.

3. GitHub Actions releases the main branch.

## Architecture

The extension follows a clean separation of concerns:

- **Content Script** (`content.simple.js`) - Runs on Amazon pages to scrape data
- **Popup** (`popup.html`, `popup.js`) - User interface for selecting destinations  
- **Background Script** (`background.js`) - Extension lifecycle management
- **Core Architecture** (`src/core/`) - Extensible interfaces for data sources and destinations

## Future Extensibility

The architecture supports easy addition of:
- Additional data sources (other e-commerce sites)
- Additional export destinations (Notion, Obsidian, etc.)
- User configuration options