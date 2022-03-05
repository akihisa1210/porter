export type Author = {
  name: string;
  contribution: string;
};

export type Bibliography = {
  title: string;
  imageUrl: string;
  sourceUrl: string;
  authors: Author[];
  publisher: string;
  publicationDate: string;
  isbn: string;
  description: string;
};
