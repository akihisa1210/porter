export type Author = {
  name: string;
  contribution: string;
};

export type Bibliography = {
  title: string;
  imageURL: string;
  sourceURL: string;
  authors: Author[];
  publisher: string;
  publicationDate: string;
  ISBN: string;
  description: string;
};
