import { expect, test } from "vitest";
import { AmazonScraper } from "../../src/scraper/amazonScraper";
import { Bibliography } from "../../src/bibliography/bibliography";
import { JSDOM } from "jsdom";
import path from "path";

const paperBookHTMLPath = path.join(
  __dirname,
  "../../fixture/static/paperbook.html"
);
const eBookHTMLPath = path.join(__dirname, "../../fixture/static/ebook.html");

const paperBookBibliography: Bibliography = {
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
const eBookBibliography: Bibliography = {
  title: "testTitle",
  imageUrl: "testEBookImageUrl",
  sourceUrl: "http://localhost:3000/",
  authors: [
    { name: "testAuthor1", contribution: "testContribution1" },
    { name: "testAuthor2", contribution: "testContribution2" },
  ],
  publisher: "testEBookPublisher",
  publicationDate: "2020/1/1",
  isbn: "testEBookAsin",
  description: "sampleDescription1\nsampleDescription2\nsampleDescription3",
};

test.each([
  ["paper book", paperBookHTMLPath, paperBookBibliography],
  ["e-book", eBookHTMLPath, eBookBibliography],
])(
  "AmazonScraper scrapes bibliography of %s",
  async (_, HTMLPath, expectedBibliography) => {
    const jsdom = await JSDOM.fromFile(HTMLPath);
    Object.defineProperty(window, "document", {
      writable: true,
      value: jsdom.window.document,
    });

    const scraper = new AmazonScraper();
    const result = scraper.run();
    expect(result).toEqual(expectedBibliography);
  }
);
