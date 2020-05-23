import { PaperBookAmazonBibliograhicInformation } from "./PaperBookAmazonBibliograhicInformation";
import { Scrapbox } from "./Scrapbox";
import {
  PostTitle,
  PostContent,
  ScrapboxBibliographicInformation,
} from "./Post";

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

  const scrapboxInfo = new ScrapboxBibliographicInformation(
    amazonBibliograhicInformation
  );

  const scrapboxPageContent = new PostContent(scrapboxInfo.scrapboxInfo);

  const scrapbox = new Scrapbox(scrapboxUserName);
  window.open(
    scrapbox.constructScrapboxUrl(scrapboxPageTitle, scrapboxPageContent)
  );
};
main();
