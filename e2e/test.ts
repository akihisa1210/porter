import { test, expect } from "@playwright/test";
import path from "path";
import url from "url";

const bookmarkletPath = path.join(__dirname, "../dist/main.js");
const paperBookPagePath = path.join(
  __dirname,
  "../fixture/static/paperbook.html"
);
const eBookPagePath = path.join(__dirname, "../fixture/static/ebook.html");

const paperBookExpectedPost =
  "body=" +
  encodeURIComponent(`[testPaperBookImageUrl file://${paperBookPagePath}]
[testAuthor1](testContribution1) [testAuthor2](testContribution2)
出版社: [testPaperBookPublisher] ([2020/1]/1)
ISBN/ASIN: testPaperBookAsin
>sampleDescription1
>sampleDescription2
>sampleDescription3
#本
`);
const eBookExpectedPost =
  "body=" +
  encodeURIComponent(`[testEBookImageUrl file://${eBookPagePath}]
[testAuthor1](testContribution1) [testAuthor2](testContribution2)
出版社: [testEBookPublisher] ([2020/1]/1)
ISBN/ASIN: testEBookAsin
>sampleDescription1
>sampleDescription2
>sampleDescription3
#本
`);

const testCases = [
  [
    "Scrape paper book page and post its bibliography",
    paperBookPagePath,
    paperBookExpectedPost,
  ],
  [
    "Scrape e-book page and post its bibliography",
    eBookPagePath,
    eBookExpectedPost,
  ],
];

test.beforeEach(async ({ context }) => {
  await context.route(/scrapbox.io/, (route) => {
    route.fulfill({ body: "<h1>Mocked Scrapbox</h1>" });
  });
});

for (const [testCaseName, pagePath, expectedPost] of testCases) {
  test(testCaseName, async ({ page, context }) => {
    await page.goto(`file:${pagePath}`);

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toEqual('Scrap "Amazon" to your scrapbox.');
      await dialog.accept(dialog.defaultValue());
    });

    await page.addScriptTag({
      path: bookmarkletPath,
    });

    const scrapboxPage = await context.waitForEvent("page");
    const scrapboxUrl = url.parse(await scrapboxPage.url());
    expect(scrapboxUrl.host).toEqual("scrapbox.io");
    expect(scrapboxUrl.pathname).toEqual(
      `/akihisa1210/${encodeURIComponent("『testTitle』")}`
    );
    expect(scrapboxUrl.query).toEqual(expectedPost);
  });
}
