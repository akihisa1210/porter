import { BibInfo } from "./bibInfo";
import { AmazonScraper } from "./amazonScraper";

export class BibInfoFactory {
  createBibInfo(kind: BibInfoKind): BibInfo | void {
    if (kind === "AmazonEbookBibInfo") {
      const bibInfo = new BibInfo();
      const amazonScraper = new AmazonScraper();

      bibInfo.title = amazonScraper.scrapeProductTitle();
      bibInfo.isbn = amazonScraper.scrapeEbookAsin();
      bibInfo.imageUrl = amazonScraper.scrapeEbookImageUrl();
      bibInfo.sourceUrl = amazonScraper.scrapeCurrentUrl();
      bibInfo.authorsInfo = amazonScraper.scrapeAuthorsInfo();
      bibInfo.publishInfo = amazonScraper.scrapeEbookPublishInfo();
      bibInfo.description = amazonScraper.scrapeDescription();

      return bibInfo;
    }
    if (kind === "AmazonPaperBookBibInfo") {
      const bibInfo = new BibInfo();
      const amazonScraper = new AmazonScraper();

      bibInfo.title = amazonScraper.scrapeProductTitle();
      bibInfo.isbn = amazonScraper.scrapePaperBookAsin();
      bibInfo.imageUrl = amazonScraper.scrapePaperBookImageUrl();
      bibInfo.sourceUrl = amazonScraper.scrapeCurrentUrl();
      bibInfo.authorsInfo = amazonScraper.scrapeAuthorsInfo();
      bibInfo.publishInfo = amazonScraper.scrapePaperBookPublishInfo();
      bibInfo.description = amazonScraper.scrapeDescription();

      return bibInfo;
    }
    throw new Error("Type is invalid.");
  }
}

type BibInfoKind = "AmazonEbookBibInfo" | "AmazonPaperBookBibInfo";
