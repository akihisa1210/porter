import { ScrapboxPoster } from "./poster/scrapboxPoster";
import { AmazonScraper } from "./scraper/amazonScraper";

const main = (): void => {
	const scraper = new AmazonScraper();
	const bibliography = scraper.run();

	window.prompt(
		'Scrap "Amazon" to your scrapbox.',
		`『${bibliography.title}』`,
	);

	const poster = new ScrapboxPoster(bibliography);
	poster.run();
};
main();
