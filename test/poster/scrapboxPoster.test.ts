import { afterEach, expect, test, vi } from "vitest";
import { Bibliography } from "../../src/bibliography/bibliography";
import { ScrapboxPoster } from "../../src/poster/scrapboxPoster";

const bibliography: Bibliography = {
  title: "testTitle",
  imageUrl: "testImageUrl",
  sourceUrl: "testSourceUrl",
  authors: [
    { name: "testAuthor1", contribution: "著" },
    { name: "testAuthor2", contribution: "翻訳" },
  ],
  publisher: "testPublisher",
  publicationDate: "2020/1/1",
  isbn: "testISBN",
  description: "testDescription1\ntestDescription2",
};

afterEach(() => {
  vi.restoreAllMocks();
});

test("ScrapboxPoster posts bibliography to Scrapbox", () => {
  const mockedWindowOpen = vi.fn();
  vi.spyOn(global, "window", "get").mockImplementation(() => ({
    open: mockedWindowOpen,
  }));

  const poster = new ScrapboxPoster(bibliography);
  poster.run();
  expect(mockedWindowOpen.mock.calls.length).toEqual(1);

  const expectedBody = `[testImageUrl testSourceUrl]
[testAuthor1](著) [testAuthor2](翻訳)
出版社: [testPublisher] ([2020/1]/1)
ISBN/ASIN: testISBN
>testDescription1
>testDescription2
#本
`;
  expect(mockedWindowOpen.mock.calls[0][0]).toEqual(
    `https://scrapbox.io/akihisa1210/${encodeURIComponent(
      "『testTitle』"
    )}?body=${encodeURIComponent(expectedBody)}`
  );
});
