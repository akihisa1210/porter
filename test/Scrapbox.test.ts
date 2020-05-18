import { Scrapbox } from "../src/Scrapbox";

test("constructScrapboxUrl() constructs valid scrapbox url", () => {
  const scrapbox = new Scrapbox("testUserName");

  expect(scrapbox.constructScrapboxUrl("testTitle", "testContent")).toBe(
    "https://scrapbox.io/testUserName/testTitle?body=testContent"
  );
});
