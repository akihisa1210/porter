export class Scrapbox {
  constructor(private userName: string) {}

  constructScrapboxUrl(title, content): string {
    const encodedTitle = encodeURIComponent(title.trim());
    const encodedContent: string = encodeURIComponent(content);
    return `https://scrapbox.io/${this.userName}/${encodedTitle}?body=${encodedContent}`;
  }
}
