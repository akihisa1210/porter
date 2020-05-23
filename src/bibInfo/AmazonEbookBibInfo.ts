class AmazonEbookBibInfo {
  private amazonEbookBibInfo: BibInfo;

  private amazonScraper = new AmazonScraper();

  scrapeAmazonBibInfo(): BibInfo {
    this.amazonEbookBibInfo.title = this.amazonScraper.scrapeEbookProductTitle();
    this.amazonEbookBibInfo.isbn = this.amazonScraper.scrapeEbookAsin();
    this.amazonEbookBibInfo.imageUrl = this.amazonScraper.scrapeEbookImageUrl();
    this.amazonEbookBibInfo.sourceUrl = this.amazonScraper.scrapeEbookCurrentUrl();
    this.amazonEbookBibInfo.authorsInfo = this.amazonScraper.scrapeAuthors();
    this.amazonEbookBibInfo.publishInfo = this.amazonScraper.scrapeEbookPublishInfo();
    this.amazonEbookBibInfo.description = this.amazonScraper.scrapeEbookDescription();
    return this.amazonEbookBibInfo;
  }
}
