import { PaperBookAmazonBibliograhicInformation } from "./PaperBookAmazonBibliograhicInformation";
import { Scrapbox } from "./Scrapbox";
import { Post } from "./Post";

const scrapboxUserName = "akihisa1210";

const main = (): void => {
  const amazonBibliograhicInformation = new PaperBookAmazonBibliograhicInformation();
  console.log("amazonBibliograhicInformation", amazonBibliograhicInformation);

  const post = new Post();
  const scrapboxPageTitle = post.constructScrapboxPageTitle(
    amazonBibliograhicInformation.productTitle
  );
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
