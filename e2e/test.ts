import { test, expect } from "@playwright/test";
import path from "path";
import url from "url";

const htmlPath = path.join(__dirname, "/static/paperbook.html");

test("Scrape Paperbook page and post its Bibliography", async ({
  page,
  context,
}) => {
  await page.goto(`file:${htmlPath}`);

  page.on("dialog", async (dialog) => {
    expect(dialog.message()).toEqual('Scrap "Amazon" to your scrapbox.');
    await dialog.accept(dialog.defaultValue());
  });

  await page.addScriptTag({
    path: `${path.join(__dirname, "../dist/main.js")}`,
  });

  const scrapboxPage = await context.waitForEvent("page");
  const scrapboxUrl = url.parse(await scrapboxPage.url());
  expect(scrapboxUrl.host).toEqual("scrapbox.io");
  expect(scrapboxUrl.pathname).toEqual(
    `/akihisa1210/${encodeURIComponent("『testTitle』")}`
  );
  expect(scrapboxUrl.query).toEqual(
    "body=" +
      encodeURIComponent(`[testPaperBookImageUrl file://${htmlPath}]
[testAuthor1](testContribution1) [testAuthor2](testContribution2)
出版社: [testPaperBookPublisher] ([2020/1]/1)
ISBN/ASIN: testPaperBookAsin
>sampleDescription1
>sampleDescription2
>sampleDescription3
#本
`)
  );
});
