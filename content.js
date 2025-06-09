// Content script for Porter Chrome Extension
// This script runs on Amazon Japan pages and handles data scraping

// Note: For now we'll use a simpler approach without ES6 imports
// since Chrome extensions have specific requirements for module loading

// Initialize Porter with available data sources and destinations
const porter = new Porter();
porter.registerDataSource(new AmazonScraper());
porter.registerDestination('scrapbox', new ScrapboxPoster({ 
  title: '', imageURL: '', sourceURL: '', authors: [], 
  publisher: '', publicationDate: '', ISBN: '', description: '' 
}));

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    if (request.action === 'checkCanScrape') {
      const availableSources = porter.getAvailableDataSources();
      sendResponse({ canScrape: availableSources.length > 0 });
      return true;
    }

    if (request.action === 'exportTo') {
      try {
        const bibliography = porter.scrapeData();
        if (!bibliography) {
          sendResponse({ success: false, error: 'Could not scrape data from this page' });
          return true;
        }

        // Show the same prompt as the original bookmarklet
        window.prompt(
          'Scrap "Amazon" to your scrapbox.',
          `『${bibliography.title}』`
        );

        porter.exportTo(request.destination, bibliography);
        sendResponse({ success: true });
      } catch (error) {
        console.error('Export error:', error);
        sendResponse({ success: false, error: error.message });
      }
      return true;
    }
  } catch (error) {
    console.error('Content script error:', error);
    sendResponse({ success: false, error: error.message });
  }
  
  return true; // Keep message channel open for async response
});