import { PaperBookAmazonBibliograhicInformation } from "./PaperBookAmazonBibliograhicInformation";
import { Scrapbox } from "./Scrapbox";
import {
  PostTitle,
  PostContent,
  ScrapboxBibliographicInformation,
} from "./Post";

const scrapboxUserName = "akihisa1210";

const main = (): void => {
  const bibInfo = new PaperBookAmazonBibliograhicInformation();
  console.log("amazonBibliograhicInformation", bibInfo);

  const scrapboxPageTitle = new PostTitle(
    window.prompt('Scrap "Amazon" to your scrapbox.', `『${bibInfo.title}』`)
  );

  const scrapboxInfo = new ScrapboxBibliographicInformation(bibInfo);

  const scrapboxPageContent = new PostContent(scrapboxInfo.scrapboxInfo);

  const scrapbox = new Scrapbox(scrapboxUserName);
  window.open(
    scrapbox.constructScrapboxUrl(scrapboxPageTitle, scrapboxPageContent)
  );
};
main();
