// Simplified content script for Porter Chrome Extension
// This script runs on Amazon Japan pages and handles data scraping

// Simple Amazon scraper function
function canScrapeAmazon() {
  return window.location.hostname.includes("amazon.co.jp") && 
         document.getElementById("productTitle") !== null;
}

function scrapeAmazonData() {
  if (!canScrapeAmazon()) {
    throw new Error("Cannot scrape data from this page");
  }

  const title = document.getElementById("productTitle").textContent.trim();
  const imageURL = document.getElementById("landingImage").getAttribute("src").trim();
  const sourceURL = window.location.href;

  const authors = Array.from(document.getElementsByClassName("author")).map(
    (element) => {
      const name = element
        .getElementsByTagName("a")[0]
        .textContent.replace(/のAmazon著者ページを見る/, "")
        .trim();

      const contribution = element
        .getElementsByClassName("a-color-secondary")[0]
        .textContent.replace(/\(|\)|,/g, "")
        .trim();

      return { name, contribution };
    }
  );

  const detailText = document
    .getElementById("detailBulletsWrapper_feature_div")
    .textContent.replace(/r?\n/g, "");

  const publisher = detailText
    .match(/出版社\s*‏\s*:\s*‎\s*(.*?)\(.*?\)/)[1]
    .trim();

  const publicationDate = detailText
    .match(/出版社\s*‏\s*:\s*‎\s*.*?\((.*?)\)/)[1]
    .trim();

  const ISBN = document.getElementById("ASIN").getAttribute("value").trim();

  const descriptionDiv = document.querySelector(
    "#bookDescription_feature_div > div > div.a-expander-content.a-expander-partial-collapse-content"
  );

  const description = descriptionDiv ? 
    descriptionDiv.innerHTML
      .replace(/<\/?b>/g, "")
      .replace(/<br>/g, "\n")
      .trim() : "";

  return {
    title,
    imageURL,
    sourceURL,
    authors,
    publisher,
    publicationDate,
    ISBN,
    description
  };
}

function exportToScrapbox(bibliography) {
  const baseURL = "https://scrapbox.io";
  const projectName = "akihisa1210";

  function makeAuthorsLink(authors) {
    return authors.map((author) => {
      return `[${author.name}](${author.contribution})`;
    });
  }

  function makePublicationYearAndMonthLink(publicationDate) {
    const publishDate = new Date(publicationDate);
    return `[${publishDate.getFullYear()}/${
      publishDate.getMonth() + 1
    }]/${publishDate.getDate()}`;
  }

  const compiledTitle = `『${bibliography.title.trim()}』`;
  const compiledBody = `[${bibliography.imageURL} ${bibliography.sourceURL}]
${makeAuthorsLink(bibliography.authors).join(" ")}
出版社: [${bibliography.publisher}] (${makePublicationYearAndMonthLink(bibliography.publicationDate)})
ISBN/ASIN: ${bibliography.ISBN}
>${bibliography.description.replace(/\n/g, "\n>")}
#本
`;

  const encodedProjectName = encodeURIComponent(projectName);
  const encodedTitle = encodeURIComponent(compiledTitle);
  const encodedBody = encodeURIComponent(compiledBody);

  const path = `${encodedProjectName}/${encodedTitle}`;
  const url = new URL(path, baseURL);
  const finalUrl = `${url}?body=${encodedBody}`;

  window.open(finalUrl);
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    if (request.action === 'checkCanScrape') {
      sendResponse({ canScrape: canScrapeAmazon() });
      return true;
    }

    if (request.action === 'exportTo') {
      try {
        const bibliography = scrapeAmazonData();
        
        // Show the same prompt as the original bookmarklet
        window.prompt(
          'Scrap "Amazon" to your scrapbox.',
          `『${bibliography.title}』`
        );

        if (request.destination === 'scrapbox') {
          exportToScrapbox(bibliography);
        }
        
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
  
  return true;
});