// workaround for TS2339
// TODO: remove them
interface HTMLElement {
  value: any;
  contentDocument: any;
}
interface Element {
  innerText: string;
}

interface PublishInfo {
  publisher: string;
  publishDate: string;
}

interface AuthorInfo {
  author: string;
  contribution: string;
}

const scrapboxUserName = "akihisa1210";

abstract class AmazonBibliograhicInformation {
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

  scrapeAuthors(): AuthorInfo[] {
    const authorsHTMLCollectionArray = Array.from(
      document.getElementsByClassName("author")
    );
    const authors: AuthorInfo[] = [];
    for (const element of authorsHTMLCollectionArray) {
      authors.push({
        author: element.getElementsByTagName("a")[0].innerText,
        contribution: element.getElementsByClassName("a-color-secondary")[0]
          .innerText,
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

class PaperBookAmazonBibliograhicInformation extends AmazonBibliograhicInformation {
  scrapeProductTitle(): string {
    return document.getElementById("productTitle").innerText;
  }

  scrapeAsin(): string {
    return document.getElementById("ASIN").getAttribute("value");
  }

  scrapeImageUrl(): string {
    return document.getElementById("imgBlkFront").getAttribute("src");
  }

  scrapeDescription(): string {
    return document
      .getElementById("bookDesc_iframe")
      .contentDocument.getElementById("iframeContent").innerText;
  }

  scrapePublishInfo(): PublishInfo {
    const RawPublishInfo = document
      .getElementById("detail_bullets_id")
      .innerText.match(/(出版社:.+)(\(.+\))/) || ["", "", ""];
    // [0]出版社:シーアンドアール研究所 (2018/7/27),[1]出版社:シーアンドアール研究所,[2](2018/7/27)

    let publisher = RawPublishInfo[1];
    publisher = publisher.replace(/:/, ":["); // 出版社名をリンクにしないならこの2行は削除する
    publisher = publisher.match(/;/)
      ? publisher.replace(/;/, "];")
      : publisher + "]";
    const publishDate =
      RawPublishInfo[2].replace(/\((\d+\/\d+)\//, "([$1]/") + " "; // 年月をリンクに

    const publishInfo: PublishInfo = {
      publisher: publisher,
      publishDate: publishDate,
    };

    return publishInfo;
  }
}

const getScrapboxPageTitle = (productTitle: string): string => {
  const scrapboxPageTitle = window.prompt(
    'Scrap "Amazon" to your scrapbox.',
    `『${productTitle}』`
  );
  return scrapboxPageTitle;
};

const constructScrapboxPageContent = (
  amazonBibliograhicInformation: AmazonBibliograhicInformation
): string => {
  const makeAuthorsLink = (authors: AuthorInfo[]): string[] => {
    const authorsLink: string[] = [];
    for (const author of authors) {
      authorsLink.push(`[ ${author.author} ]${author.contribution}`);
    }
    return authorsLink;
  };

  return `[${amazonBibliograhicInformation.imageUrl} ${window.location.href}]
${makeAuthorsLink(amazonBibliograhicInformation.authors).join(" ")}
${amazonBibliograhicInformation.publishInfo.publisher} ${
    amazonBibliograhicInformation.publishInfo.publishDate
  }
ISBN/ASIN: ${amazonBibliograhicInformation.asin}
> ${amazonBibliograhicInformation.description.replace(/\n/g, "\n>")}
#本`;
};

const openScrapboxWithEncodedTitleAndContent = (title, content): void => {
  const encodedTitle = encodeURIComponent(title.trim());
  const encodedContent: string = encodeURIComponent(content);
  window.open(
    `https://scrapbox.io/${scrapboxUserName}/${encodedTitle}?body=${encodedContent}`
  );
};

const main = (): void => {
  const amazonBibliograhicInformation = new PaperBookAmazonBibliograhicInformation();
  console.log("amazonBibliograhicInformation", amazonBibliograhicInformation);

  const scrapboxPageTitle = getScrapboxPageTitle(
    amazonBibliograhicInformation.productTitle
  );
  console.log("scrapboxPageTitle", scrapboxPageTitle);

  const scrapboxPageContent = constructScrapboxPageContent(
    amazonBibliograhicInformation
  );
  console.log("scrapboxPageContent", scrapboxPageContent);

  openScrapboxWithEncodedTitleAndContent(
    scrapboxPageTitle,
    scrapboxPageContent
  );
};
main();
