export interface PublishInfo {
  publisher: string;
  publishDate: string;
}

export interface AuthorInfo {
  author: string;
  contribution: string;
}

export abstract class AmazonBibliographicInformation {
  productTitle: string;
  asin: string;
  publishInfo: PublishInfo;
  description: string;
  imageUrl: string;
  authors: AuthorInfo[];

  abstract scrapeProductTitle(): string;
  abstract scrapeAsin(): string;
  abstract scrapePublishInfo(): PublishInfo;
  abstract scrapeDescription(): string;
  abstract scrapeImageUrl(): string;

  protected scrapeAuthors(): AuthorInfo[] {
    const authorsHTMLCollectionArray = Array.from(
      document.getElementsByClassName("author")
    );
    const authors: AuthorInfo[] = [];
    for (const element of authorsHTMLCollectionArray) {
      const contributionHTMLElement: HTMLElement = element.getElementsByClassName(
        "a-color-secondary"
      )[0] as HTMLElement;
      authors.push({
        author: element.getElementsByTagName("a")[0].innerText,
        contribution: contributionHTMLElement.innerText,
      });
    }
    return authors;
  }
  constructor() {
    this.productTitle = this.scrapeProductTitle();
    this.asin = this.scrapeAsin();
    this.publishInfo = this.scrapePublishInfo();
    this.description = this.scrapeDescription();
    this.imageUrl = this.scrapeImageUrl();
    this.authors = this.scrapeAuthors();
  }
}
