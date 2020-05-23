export interface PublishInfo {
  publisher: string;
  publishDate: string;
}

export interface AuthorInfo {
  author: string;
  contribution: string;
}

export interface BibInfo {
  title: string;
  isbn: string;
  imageUrl: string;
  sourceUrl: string;
  authorsInfo: AuthorInfo[];
  publishInfo: PublishInfo;
  description: string;
}
