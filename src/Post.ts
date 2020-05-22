import {
  AmazonBibliographicInformation,
  AuthorInfo,
} from "./AmazonBibliographicInformation";

export class Post {
  constructScrapboxPageTitle(productTitle: string): string {
    const scrapboxPageTitle = window.prompt(
      'Scrap "Amazon" to your scrapbox.',
      `『${productTitle}』`
    );
    return scrapboxPageTitle;
  }

  constructScrapboxPageContent(
    amazonBibliograhicInformation: AmazonBibliographicInformation
  ): string {
    return `[${amazonBibliograhicInformation.imageUrl} ${
      amazonBibliograhicInformation.currentUrl
    }]
${this.makeAuthorsLink(amazonBibliograhicInformation.authors).join(" ")}
${amazonBibliograhicInformation.publishInfo.publisher} ${
      amazonBibliograhicInformation.publishInfo.publishDate
    }
ISBN/ASIN: ${amazonBibliograhicInformation.asin}
>${amazonBibliograhicInformation.description.replace(/\n/g, "\n>")}
#本
`;
  }

  private makeAuthorsLink = (authors: AuthorInfo[]): string[] => {
    const authorsLink: string[] = [];
    for (const author of authors) {
      authorsLink.push(`[${author.author}]${author.contribution}`);
    }
    return authorsLink;
  };
}
