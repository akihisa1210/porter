import { expect, test } from "vitest";
import { AmazonScraper } from "../../src/scraper/amazonScraper";
import { Bibliography } from "../../src/bibliography/bibliography";
import { JSDOM } from "jsdom";
import path from "path";

const bibliography: Bibliography = {
  title: "testTitle",
  imageUrl: "testPaperBookImageUrl",
  sourceUrl: "http://localhost:3000/",
  authors: [
    { name: "testAuthor1", contribution: "testContribution1" },
    { name: "testAuthor2", contribution: "testContribution2" },
  ],
  publisher: "testPaperBookPublisher",
  publicationDate: "2020/1/1",
  isbn: "testPaperBookAsin",
  description: "sampleDescription1\nsampleDescription2\nsampleDescription3",
};

test("AmazonScraper scrapes bibliography of paper book", async () => {
  const jsdom = await JSDOM.fromFile(
    path.join(__dirname, "../../e2e/static/paperbook.html")
  );
  Object.defineProperty(window, "document", {
    writable: true,
    value: jsdom.window.document,
  });

  const scraper = new AmazonScraper();
  const result = scraper.run();
  expect(result).toEqual(bibliography);
});
