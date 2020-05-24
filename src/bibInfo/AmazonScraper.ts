import { PublishInfo, AuthorInfo } from "./bibInfo";

export class AmazonScraper {
  scrapeEbookProductTitle(): string {
    return document.getElementById("productTitle").textContent.trim();
  }

  scrapeEbookAsin(): string {
    return document.getElementsByName("ASIN.0")[0].getAttribute("value");
  }

  scrapeEbookPublishInfo(): PublishInfo {
    const rawPublishInfo = document
      .getElementById("productDetailsTable")
      .textContent.match(/(出版社:.+)(\(.+\))/);

    let publisher = rawPublishInfo[1];

    // TODO: Move linking function to other place.
    publisher = publisher.replace(/:/, ":[");
    publisher = publisher.match(/;/)
      ? publisher.replace(/;/, "];")
      : publisher + "]";
    const publishDate = rawPublishInfo[2].replace(/\((\d+\/\d+)\//, "([$1]/");

    const publishInfo: PublishInfo = {
      publisher: publisher,
      publishDate: publishDate,
    };
    return publishInfo;
  }

  scrapeDescription(): string {
    const bookDescIframe: HTMLIFrameElement = document.getElementById(
      "bookDesc_iframe"
    ) as HTMLIFrameElement;
    const iframeContent = bookDescIframe.contentDocument.getElementById(
      "iframeContent"
    );

    // For testing, jsdom can not get dom inside iframe.
    // This method return sample description on test code
    // because we must instantiate this class for testing.
    // TODO: Separate this method from constructor.
    //     if (iframeContent === null) {
    //       return `sampleDescription1 - from product code
    // sampleDescription2 - from product code
    // sampleDescription3 - from product code`;
    //     }

    return iframeContent.textContent;
  }

  scrapeEbookImageUrl(): string {
    return document.getElementById("ebooksImgBlkFront").getAttribute("src");
  }

  scrapeCurrentUrl(): string {
    return window.location.href;
  }

  scrapeAuthorsInfo(): AuthorInfo[] {
    const authorsHTMLCollectionArray = Array.from(
      document.getElementsByClassName("author")
    );
    const authorsInfo: AuthorInfo[] = [];
    for (const element of authorsHTMLCollectionArray) {
      // Scrape author.
      // Sometimes author is followed by "のAmazon著者ページを見る".
      const authorLink: string = element.getElementsByTagName("a")[0]
        .textContent;

      const authorLinkMatchArray = authorLink.match(
        /(.+)のAmazon著者ページを見る/
      );

      let author;
      if (authorLinkMatchArray) {
        author = authorLinkMatchArray[1];
      } else {
        author = authorLink;
      }

      // Scrape contribution.
      const contribution: string = element.getElementsByClassName(
        "a-color-secondary"
      )[0].textContent;
      authorsInfo.push({
        author: author,
        contribution: contribution,
      });
    }
    return authorsInfo;
  }
}
