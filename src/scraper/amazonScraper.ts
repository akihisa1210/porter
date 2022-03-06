import { Author, Bibliography } from "../bibliography/bibliography";

export class AmazonScraper {
  private isEbook: boolean;

  constructor() {
    this.isEbook = false;
  }

  private scrapeTitle(): string {
    return document.getElementById("productTitle").textContent.trim();
  }

  private scrapeImageUrl(): string {
    return document.getElementById("imgBlkFront").getAttribute("src");
  }

  private scrapeSourceUrl(): string {
    return window.location.href;
  }

  private scrapeAuthors(): Author[] {
    const authorsHTMLCollectionArray = Array.from(
      document.getElementsByClassName("author")
    );

    const authors: Author[] = [];

    for (const element of authorsHTMLCollectionArray) {
      // Scrape author.
      // Sometimes author is followed by "のAmazon著者ページを見る".
      const authorLink: string = element.getElementsByTagName("a")[0]
        .textContent;

      const authorLinkMatchArray = authorLink.match(
        /(.+)のAmazon著者ページを見る/
      );

      let name;
      if (authorLinkMatchArray) {
        name = authorLinkMatchArray[1];
      } else {
        name = authorLink;
      }

      // Scrape contribution.
      const contribution: string = element
        .getElementsByClassName("a-color-secondary")[0]
        .textContent.replace(/\(|\)|,/g, "");
      authors.push({
        name,
        contribution,
      });
    }
    return authors;
  }

  private scrapePublisher(): string {
    console.log(
      document
        .getElementById("detailBulletsWrapper_feature_div")
        .textContent.replace(/r?\n/g, "")
    );
    return document
      .getElementById("detailBulletsWrapper_feature_div")
      .textContent.replace(/r?\n/g, "")
      .match(/出版社\s*‏\s*:\s*‎\s*(.*?)\(.*?\)/)[1]
      .trim();
  }

  private scrapePublicationDate(): string {
    return document
      .getElementById("detailBulletsWrapper_feature_div")
      .textContent.replace(/r?\n/g, "")
      .match(/出版社\s*‏\s*:\s*‎\s*.*?\((.*?)\)/)[1]
      .trim();
  }

  private scrapeISBN(): string {
    return document.getElementById("ASIN").getAttribute("value");
  }

  private scrapeDescription(): string {
    const descriptionDiv = document.querySelector(
      "#bookDescription_feature_div > div > div.a-expander-content.a-expander-partial-collapse-content"
    );

    if (descriptionDiv === null) {
      return "";
    }

    return descriptionDiv.innerHTML
      .replace(/<\/?b>/g, "")
      .replace(/<br>/g, "\n")
      .trim();
  }

  run(): Bibliography {
    return {
      title: this.scrapeTitle(),
      imageUrl: this.scrapeImageUrl(),
      sourceUrl: this.scrapeSourceUrl(),
      authors: this.scrapeAuthors(),
      publisher: this.scrapePublisher(),
      publicationDate: this.scrapePublicationDate(),
      isbn: this.scrapeISBN(),
      description: this.scrapeDescription(),
    };
  }
}
