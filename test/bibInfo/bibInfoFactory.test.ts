import { BibInfoFactory } from "../../src/bibInfo/bibInfoFactory";
import { BibInfo, PublishInfo, AuthorInfo } from "../../src/bibInfo/bibInfo";
import { AmazonScraper } from "../../src/bibInfo/AmazonScraper";

test("When kind is AmazonEbookBibInfo, create AmazonEbookBibInfo", () => {
  // Mock AmazonScraper.
  const scrapeEbookProductTitle = jest
    .spyOn(AmazonScraper.prototype, "scrapeEbookProductTitle")
    .mockReturnValue("mock title");

  const scrapeEbookAsin = jest
    .spyOn(AmazonScraper.prototype, "scrapeEbookAsin")
    .mockReturnValue("mock asin");

  const scrapeEbookImageUrl = jest
    .spyOn(AmazonScraper.prototype, "scrapeEbookImageUrl")
    .mockReturnValue("mock image url");

  const scrapeEbookPublishInfo = jest
    .spyOn(AmazonScraper.prototype, "scrapeEbookPublishInfo")
    .mockReturnValue({
      publisher: "mock publisher",
      publishDate: "mock publish date",
    } as PublishInfo);

  const scrapeDescription = jest
    .spyOn(AmazonScraper.prototype, "scrapeDescription")
    .mockReturnValue("mock description");

  const scrapeAuthorsInfo = jest
    .spyOn(AmazonScraper.prototype, "scrapeAuthorsInfo")
    .mockReturnValue([
      { author: "mock author", contribution: "mock contribution" },
    ] as AuthorInfo[]);

  const factory = new BibInfoFactory();
  const expectedBibInfo: BibInfo = {
    title: "mock title",
    isbn: "mock asin",
    imageUrl: "mock image url",
    sourceUrl: "http://localhost/",
    authorsInfo: [{ author: "mock author", contribution: "mock contribution" }],
    publishInfo: {
      publisher: "mock publisher",
      publishDate: "mock publish date",
    },
    description: "mock description",
  };

  expect(factory.createBibInfo("AmazonEbookBibInfo")).toEqual(expectedBibInfo);
});
