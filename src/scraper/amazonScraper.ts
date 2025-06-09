import type { Author, Bibliography } from "../bibliography/bibliography";
import type { DataSource } from "../core/dataSource";

export class AmazonScraper implements DataSource {
	private isEBook: boolean;

	constructor() {
		this.isEBook = ((): boolean => {
			const selectedBookTypePanel = document.getElementsByClassName(
				"swatchElement selected",
			)[0];
			if (selectedBookTypePanel === undefined) {
				// selectedBookTypePanel が存在しない書籍ページ
				return false;
			}
			return selectedBookTypePanel.textContent.includes("電子書籍");
		})();
	}

	private scrapeTitle(): string {
		return document.getElementById("productTitle").textContent.trim();
	}

	private scrapeImageUrl(): string {
		return document.getElementById("landingImage").getAttribute("src").trim();
	}

	private scrapeSourceUrl(): string {
		return window.location.href;
	}

	private scrapeAuthors(): Author[] {
		return Array.from(document.getElementsByClassName("author")).map(
			(element) => {
				const name: string = element
					.getElementsByTagName("a")[0]
					.textContent.replace(/のAmazon著者ページを見る/, "")
					.trim();

				const contribution: string = element
					.getElementsByClassName("a-color-secondary")[0]
					.textContent.replace(/\(|\)|,/g, "")
					.trim();

				return { name, contribution };
			},
		);
	}

	private scrapePublisher(): string {
		return document
			.getElementById("detailBulletsWrapper_feature_div")
			.textContent.replace(/r?\n/g, "")
			.match(/出版社\s*‏\s*:\s*‎\s*(.*?)\(.*?\)/)[1]
			.trim();
	}

	private scrapePublicationDate(): string {
		return document
			.getElementById("detailBulletsWrapper_feature_div")
			.textContent.replace(/r?\n/g, "")
			.match(/出版社\s*‏\s*:\s*‎\s*.*?\((.*?)\)/)[1]
			.trim();
	}

	private scrapeISBN(): string {
		return document.getElementById("ASIN").getAttribute("value").trim();
	}

	private scrapeDescription(): string {
		const descriptionDiv = document.querySelector(
			"#bookDescription_feature_div > div > div.a-expander-content.a-expander-partial-collapse-content",
		);

		if (descriptionDiv === null) {
			return "";
		}

		return descriptionDiv.innerHTML
			.replace(/<\/?b>/g, "")
			.replace(/<br>/g, "\n")
			.trim();
	}

	canScrape(): boolean {
		return (
			window.location.hostname.includes("amazon.co.jp") &&
			document.getElementById("productTitle") !== null
		);
	}

	scrape(): Bibliography {
		return this.run();
	}

	run(): Bibliography {
		return {
			title: this.scrapeTitle(),
			imageURL: this.scrapeImageUrl(),
			sourceURL: this.scrapeSourceUrl(),
			authors: this.scrapeAuthors(),
			publisher: this.scrapePublisher(),
			publicationDate: this.scrapePublicationDate(),
			ISBN: this.scrapeISBN(),
			description: this.scrapeDescription(),
		};
	}
}
