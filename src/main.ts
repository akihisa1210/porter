import { PostTitle } from "./Post";
import { Amazon } from "./site/amazon";
import { BibInfoFactory } from "./bibInfo/bibInfoFactory";
import { Bibliography } from "./bibliography/bibliography";
import { ScrapboxPoster } from "./poster/scrapboxPoster";

const main = (): void => {
  const amazon = new Amazon();
  let bibInfo;
  const factory = new BibInfoFactory();
  if (amazon.isEbook()) {
    console.log("This is ebook.");
    bibInfo = factory.createBibInfo("AmazonEbookBibInfo");
    console.log("AmazonEbookBibInfo", bibInfo);
  } else {
    console.log("This is paper book.");
    bibInfo = factory.createBibInfo("AmazonPaperBookBibInfo");
    console.log("PaperBookAmazonBibliograhicInformation", bibInfo);
  }

  new PostTitle(
    window.prompt('Scrap "Amazon" to your scrapbox.', `『${bibInfo.title}』`)
  );

  // TODO: remove BibInfo
  const authors = bibInfo.authorsInfo.map((authorInfo) => {
    return {
      name: authorInfo.author,
      contribution: authorInfo.contribution.replace(/\(|\)|,/g, ""),
    };
  });
  const bibliography: Bibliography = {
    title: bibInfo.title,
    imageUrl: bibInfo.imageUrl,
    sourceUrl: bibInfo.sourceUrl,
    authors: authors,
    publisher: bibInfo.publishInfo.publisher,
    publicationDate: bibInfo.publishInfo.publishDate,
    isbn: bibInfo.isbn,
    description: bibInfo.description,
  };

  const poster = new ScrapboxPoster(bibliography);
  poster.run();
};
main();
