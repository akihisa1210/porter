interface PublishInfo {
  publisher: string;
  publishDate: string;
}

interface AuthorInfo {
  author: string;
  contribution: string;
}

interface BibInfo {
  title: string;
  isbn: string;
  imageUrl: string;
  sourceUrl: string;
  authorsInfo: AuthorInfo[];
  publishInfo: PublishInfo;
  description: string;
}

interface BibInfoFactory {
  create(): BibInfo;
  createProduct(): BibInfo;
  registerProduct(): void;
}
