import type { Author, Bibliography } from "../bibliography/bibliography";
import type { Destination } from "../core/destination";

// Introduce branded types to avoid creating URL without URI encoding
type Brand<K, T> = K & { __brand: T };
type EncodedURIComponent = Brand<string, "EncodedURIComponent">;

export class ScrapboxPoster implements Destination {
	name = "Scrapbox";
	description = "Export to your Scrapbox project";
	private bibliography: Bibliography;

	readonly baseURL: string = "https://scrapbox.io";
	readonly projectName: string = "akihisa1210";

	constructor(bibliography: Bibliography) {
		this.bibliography = bibliography;
	}

	private makeAuthorsLink(authors: Author[]): string[] {
		return authors.map((author) => {
			return `[${author.name}](${author.contribution})`;
		});
	}

	private makePublicationYearAndMonthLink(publicationDate: string): string {
		const publishDate = new Date(publicationDate);
		// e.g. [2020/1]/1
		return `[${publishDate.getFullYear()}/${
			publishDate.getMonth() + 1
		}]/${publishDate.getDate()}`;
	}

	private encodeURIComponentWithType(string): EncodedURIComponent {
		return encodeURIComponent(string) as EncodedURIComponent;
	}

	private encodeProjectName(): EncodedURIComponent {
		return this.encodeURIComponentWithType(this.projectName);
	}

	private compileAndURIEncodeTitle(): EncodedURIComponent {
		const compiledTitle = `『${this.bibliography.title.trim()}』`;
		return this.encodeURIComponentWithType(compiledTitle);
	}

	private compileAndURIEncodeBody(): EncodedURIComponent {
		const compiledBody = `[${this.bibliography.imageURL} ${
			this.bibliography.sourceURL
		}]
${this.makeAuthorsLink(this.bibliography.authors).join(" ")}
出版社: [${
			this.bibliography.publisher
		}] (${this.makePublicationYearAndMonthLink(
			this.bibliography.publicationDate,
		)})
ISBN/ASIN: ${this.bibliography.ISBN}
>${this.bibliography.description.replace(/\n/g, "\n>")}
#本
`;
		return this.encodeURIComponentWithType(compiledBody);
	}

	private makeURL(
		projectName: EncodedURIComponent,
		title: EncodedURIComponent,
		body: EncodedURIComponent,
	): string {
		const path = `${projectName}/${title}`;
		const url = new URL(path, this.baseURL);

		return `${url}?body=${body}`;
	}

	export(bibliography: Bibliography): void {
		const oldBibliography = this.bibliography;
		this.bibliography = bibliography;
		this.run();
		this.bibliography = oldBibliography;
	}

	run(): void {
		const url = this.makeURL(
			this.encodeProjectName(),
			this.compileAndURIEncodeTitle(),
			this.compileAndURIEncodeBody(),
		);

		window.open(url);
	}
}
