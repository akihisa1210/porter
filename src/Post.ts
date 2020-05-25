import { BibInfo, AuthorInfo } from "./bibInfo/bibInfo";

export class PostTitle {
  title: string;

  constructor(title: string) {
    if (title === "") {
      throw new Error("Scrapbox page title must not be empty.");
    }
    this.title = title;
  }
}

export class PostContent {
  content: string;

  constructor(content: string) {
    this.content = content;
  }
}

export class ScrapboxBibliographicInformation {
  scrapboxInfo: string;

  private makeAuthorsLink(authors: AuthorInfo[]): string[] {
    const authorsLink: string[] = [];
    for (const author of authors) {
      authorsLink.push(`[${author.author}]${author.contribution}`);
    }
    return authorsLink;
  }

  constructor(info: BibInfo) {
    this.scrapboxInfo = `[${info.imageUrl} ${info.sourceUrl}]
${this.makeAuthorsLink(info.authorsInfo).join(" ")}
${info.publishInfo.publisher} ${info.publishInfo.publishDate}
ISBN/ASIN: ${info.isbn}
>${info.description.replace(/\n/g, "\n>")}
#本
`;
  }
}
