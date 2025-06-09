import type { Bibliography } from "../bibliography/bibliography";

export interface DataSource {
	canScrape(): boolean;
	scrape(): Bibliography;
}
