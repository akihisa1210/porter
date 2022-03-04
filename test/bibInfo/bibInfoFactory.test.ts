// @vitest-environment jsdom
import { test, expect, vi } from "vitest";
import { BibInfoFactory } from "../../src/bibInfo/bibInfoFactory";
import { BibInfo, PublishInfo, AuthorInfo } from "../../src/bibInfo/bibInfo";
import { AmazonScraper } from "../../src/bibInfo/amazonScraper";

// Mock AmazonScraper.
const scrapeProductTitle = vi
  .spyOn(AmazonScraper.prototype, "scrapeProductTitle")
  .mockReturnValue("mock title");

const scrapeEbookAsin = vi
  .spyOn(AmazonScraper.prototype, "scrapeEbookAsin")
  .mockReturnValue("mock asin");

const scrapePaperBookAsin = vi
  .spyOn(AmazonScraper.prototype, "scrapePaperBookAsin")
  .mockReturnValue("mock paper book asin");

const scrapeEbookImageUrl = vi
  .spyOn(AmazonScraper.prototype, "scrapeEbookImageUrl")
  .mockReturnValue("mock image url");

const scrapePaperBookImageUrl = vi
  .spyOn(AmazonScraper.prototype, "scrapePaperBookImageUrl")
  .mockReturnValue("mock paper book image url");

const scrapeEbookPublishInfo = vi
  .spyOn(AmazonScraper.prototype, "scrapeEbookPublishInfo")
  .mockReturnValue({
    publisher: "mock publisher",
    publishDate: "mock publish date",
  } as PublishInfo);

const scrapePaperBookPublishInfo = vi
  .spyOn(AmazonScraper.prototype, "scrapePaperBookPublishInfo")
  .mockReturnValue({
    publisher: "mock paper book publisher",
    publishDate: "mock paper book publish date",
  } as PublishInfo);

const scrapeDescription = vi
  .spyOn(AmazonScraper.prototype, "scrapeDescription")
  .mockReturnValue("mock description");

const scrapeAuthorsInfo = vi
  .spyOn(AmazonScraper.prototype, "scrapeAuthorsInfo")
  .mockReturnValue([
    { author: "mock author", contribution: "mock contribution" },
  ] as AuthorInfo[]);

test("When kind is AmazonEbookBibInfo, create AmazonEbookBibInfo", () => {
  const factory = new BibInfoFactory();
  const expectedBibInfo: BibInfo = {
    title: "mock title",
    isbn: "mock asin",
    imageUrl: "mock image url",
    sourceUrl: "http://localhost:3000/",
    authorsInfo: [{ author: "mock author", contribution: "mock contribution" }],
    publishInfo: {
      publisher: "mock publisher",
      publishDate: "mock publish date",
    },
    description: "mock description",
  };

  expect(factory.createBibInfo("AmazonEbookBibInfo")).toEqual(expectedBibInfo);
});

test("When kind is AmazonPaperBookBibInfo, create AmazonPaperBookBibInfo", () => {
  const factory = new BibInfoFactory();
  const expectedBibInfo: BibInfo = {
    title: "mock title",
    isbn: "mock paper book asin",
    imageUrl: "mock paper book image url",
    sourceUrl: "http://localhost:3000/",
    authorsInfo: [{ author: "mock author", contribution: "mock contribution" }],
    publishInfo: {
      publisher: "mock paper book publisher",
      publishDate: "mock paper book publish date",
    },
    description: "mock description",
  };

  expect(factory.createBibInfo("AmazonPaperBookBibInfo")).toEqual(
    expectedBibInfo
  );
});
