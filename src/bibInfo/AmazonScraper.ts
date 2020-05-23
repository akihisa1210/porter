class AmazonScraper {
  scrapeEbookProductTitle(): string {
    return "productTitle!";
  }

  scrapeEbookAsin(): string {
    return "asin!";
  }

  scrapeEbookPublishInfo(): PublishInfo {
    return {
      publisher: "publisher!",
      publishDate: "publishDate!",
    } as PublishInfo;
  }

  scrapeEbookDescription(): string {
    return "description!";
  }

  scrapeEbookImageUrl(): string {
    return "imageUrl";
  }

  scrapeEbookCurrentUrl(): string {
    return "currentUrl";
  }

  scrapeAuthors(): AuthorInfo[] {
    return [
      {
        author: "author!",
        contribution: "contribution!",
      },
    ];
  }
}
