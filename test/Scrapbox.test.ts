import { test, expect } from "vitest";
import { Scrapbox } from "../src/Scrapbox";
import { PostTitle, PostContent } from "../src/Post";

test("constructScrapboxUrl() constructs valid scrapbox url", () => {
  const scrapbox = new Scrapbox("testUserName");

  const title = new PostTitle("testTitle");
  const content = new PostContent("testContent");

  expect(scrapbox.constructScrapboxUrl(title, content)).toBe(
    "https://scrapbox.io/testUserName/testTitle?body=testContent"
  );
});
