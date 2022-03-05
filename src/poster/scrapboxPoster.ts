import { Author, Bibliography } from "../bibliography/bibliography";

export class ScrapboxPoster {
  readonly bibliography: Bibliography;
  readonly projectName: string = "akihisa1210";

  constructor(bibliography: Bibliography) {
    this.bibliography = bibliography;
  }

  private makeAuthorsLink(authors: Author[]): string[] {
    return authors.map((author) => {
      return `[${author.name}](${author.contribution})`;
    });
  }

  private makePublicationYearAndMonthLink(publicationDate: string): string {
    const publishDate = new Date(publicationDate);
    // e.g. [2020/1]/1
    return `[${publishDate.getFullYear()}/${
      publishDate.getMonth() + 1
    }]/${publishDate.getDate()}`;
  }

  private compileTitle(): string {
    return `『${this.bibliography.title.trim()}』`;
  }

  private compileBody(): string {
    return `[${this.bibliography.imageUrl} ${this.bibliography.sourceUrl}]
${this.makeAuthorsLink(this.bibliography.authors).join(" ")}
出版社: [${
      this.bibliography.publisher
    }] (${this.makePublicationYearAndMonthLink(
      this.bibliography.publicationDate
    )})
ISBN/ASIN: ${this.bibliography.isbn}
>${this.bibliography.description.replace(/\n/g, "\n>")}
#本
`;
  }

  run(): void {
    console.log(
      `https://scrapbox.io/${this.projectName}/${encodeURIComponent(
        this.compileTitle()
      )}?body=${encodeURIComponent(this.compileBody())}`
    );
    window.open(
      `https://scrapbox.io/${this.projectName}/${encodeURIComponent(
        this.compileTitle()
      )}?body=${encodeURIComponent(this.compileBody())}`
    );
  }
}
