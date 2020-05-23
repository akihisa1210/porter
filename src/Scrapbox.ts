import { PostTitle, PostContent } from "./Post";

export class Scrapbox {
  constructor(private userName: string) {}

  constructScrapboxUrl(title: PostTitle, content: PostContent): string {
    const encodedTitle = encodeURIComponent(title.title.trim());
    const encodedContent: string = encodeURIComponent(content.content);
    return `https://scrapbox.io/${this.userName}/${encodedTitle}?body=${encodedContent}`;
  }
}
