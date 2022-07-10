import { expect, test } from "vitest";
import { AmazonScraper } from "../../src/scraper/amazonScraper";
import { Bibliography } from "../../src/bibliography/bibliography";
import { JSDOM } from "jsdom";

const paperBookBibliography: Bibliography = {
  title: "testTitle",
  imageURL: "testPaperBookImageUrl",
  sourceURL: "http://localhost:3000/",
  authors: [
    { name: "testAuthor1", contribution: "testContribution1" },
    { name: "testAuthor2", contribution: "testContribution2" },
  ],
  publisher: "testPaperBookPublisher",
  publicationDate: "2020/1/1",
  ISBN: "testPaperBookAsin",
  description: "sampleDescription1\nsampleDescription2\nsampleDescription3",
};

const eBookBibliography: Bibliography = {
  title: "testTitle",
  imageURL: "testEBookImageUrl",
  sourceURL: "http://localhost:3000/",
  authors: [
    { name: "testAuthor1", contribution: "testContribution1" },
    { name: "testAuthor2", contribution: "testContribution2" },
  ],
  publisher: "testEBookPublisher",
  publicationDate: "2020/1/1",
  ISBN: "testEBookAsin",
  description: "sampleDescription1\nsampleDescription2\nsampleDescription3",
};

test.each([
  ["paper book", "fixture/static/paperbook.html", paperBookBibliography],
  ["e-book", "fixture/static/ebook.html", eBookBibliography],
  [
    "paper book without book type select panel",
    "fixture/static/paperbook-without-book-type-select-panel.html",
    paperBookBibliography,
  ],
  [
    "paper book without description",
    "fixture/static/paperbook-without-description.html",
    { ...paperBookBibliography, description: "" },
  ],
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
