import { PaperBookAmazonBibliograhicInformation } from "./PaperBookAmazonBibliograhicInformation";
import { Scrapbox } from "./Scrapbox";
import { Post, PostTitle } from "./Post";

const scrapboxUserName = "akihisa1210";

const main = (): void => {
  const amazonBibliograhicInformation = new PaperBookAmazonBibliograhicInformation();
  console.log("amazonBibliograhicInformation", amazonBibliograhicInformation);

  const scrapboxPageTitle = new PostTitle(
    window.prompt(
      'Scrap "Amazon" to your scrapbox.',
      `『${amazonBibliograhicInformation.productTitle}』`
    )
  );

  const post = new Post(scrapboxPageTitle);
  console.log("scrapboxPageTitle", scrapboxPageTitle);
  const scrapboxPageContent = post.constructScrapboxPageContent(
    amazonBibliograhicInformation
  );
  console.log("scrapboxPageContent", scrapboxPageContent);

  const scrapbox = new Scrapbox(scrapboxUserName);
  window.open(
    scrapbox.constructScrapboxUrl(scrapboxPageTitle, scrapboxPageContent)
  );
};
main();
