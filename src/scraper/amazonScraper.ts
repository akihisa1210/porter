import { Author, Bibliography } from "../bibliography/bibliography";

export class AmazonScraper {
  private isEBook: boolean;

  constructor() {
    this.isEBook = ((): boolean => {
      const selectedBookTypePanel = document.getElementsByClassName(
        "swatchElement selected"
      )[0];
      if (selectedBookTypePanel === undefined) {
        // selectedBookTypePanel が存在しない書籍ページ
        return false;
      }
      return selectedBookTypePanel.textContent.includes("電子書籍");
    })();
  }

  private scrapeTitle(): string {
    return document.getElementById("productTitle").textContent.trim();
  }

  private scrapeImageUrl(): string {
    if (this.isEBook) {
      return document
        .getElementById("ebooksImgBlkFront")
        .getAttribute("src")
        .trim();
    }
    return document.getElementById("imgBlkFront").getAttribute("src").trim();
  }

  private scrapeSourceUrl(): string {
    return window.location.href;
  }

  private scrapeAuthors(): Author[] {
    return Array.from(document.getElementsByClassName("author")).map(
      (element) => {
        const name: string = element
          .getElementsByTagName("a")[0]
          .textContent.replace(/のAmazon著者ページを見る/, "")
          .trim();

        const contribution: string = element
          .getElementsByClassName("a-color-secondary")[0]
          .textContent.replace(/\(|\)|,/g, "")
          .trim();

        return { name, contribution };
      }
    );
  }

  private scrapePublisher(): string {
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
    if (this.isEBook) {
      return document
        .getElementsByName("ASIN.0")[0]
        .getAttribute("value")
        .trim();
    }
    return document.getElementById("ASIN").getAttribute("value").trim();
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
