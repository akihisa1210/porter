import { BibInfo } from "./bibInfo";
import { AmazonScraper } from "./AmazonScraper";

export class AmazonEbookBibInfoFactory {
  private bibInfo = new BibInfo();

  private amazonScraper = new AmazonScraper();

  scrapeAmazonBibInfo(): BibInfo {
    this.bibInfo.title = this.amazonScraper.scrapeEbookProductTitle();
    this.bibInfo.isbn = this.amazonScraper.scrapeEbookAsin();
    this.bibInfo.imageUrl = this.amazonScraper.scrapeEbookImageUrl();
    this.bibInfo.sourceUrl = this.amazonScraper.scrapeEbookCurrentUrl();
    this.bibInfo.authorsInfo = this.amazonScraper.scrapeAuthorsInfo();
    this.bibInfo.publishInfo = this.amazonScraper.scrapeEbookPublishInfo();
    this.bibInfo.description = this.amazonScraper.scrapeDescription();
    return this.bibInfo;
  }
}
