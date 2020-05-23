import {
  PostTitle,
  PostContent,
  ScrapboxBibliographicInformation,
} from "../src/Post";
import { PaperBookAmazonBibliograhicInformation } from "../src/PaperBookAmazonBibliograhicInformation";
import { AuthorInfo } from "../src/bibInfo/bibInfo";
jest.mock("../src/PaperBookAmazonBibliograhicInformation");

// Mock of PaperBookAmazonBibliograhicInformation
const sampleBibliographicInformation = new PaperBookAmazonBibliograhicInformation();
sampleBibliographicInformation.title = "sampleProductTitel";
sampleBibliographicInformation.isbn = "sampleAsin";
sampleBibliographicInformation.publishInfo = {
  publisher: "samplePublisher",
  publishDate: "samplePublishDate",
};
sampleBibliographicInformation.description = `sampleDescription1
sampleDescription2
sampleDescription3`;
sampleBibliographicInformation.imageUrl = "sampleImageUrl";
sampleBibliographicInformation.authorsInfo = [
  {
    author: "author1",
    contribution: "(contribution1)",
  },
  {
    author: "author2",
    contribution: "(contribution2)",
  } as AuthorInfo,
];
sampleBibliographicInformation.sourceUrl = "sampleCurrentUrl";

test("Valid post title is created", () => {
  const title = new PostTitle("sample");
  const expectedTitle: PostTitle = {
    title: "sample",
  };
  expect(title).toEqual(expectedTitle);
});

test("Empty title must not be created", () => {
  expect(() => new PostTitle("")).toThrow(
    Error("Scrapbox page title must not be empty.")
  );
});

test("Valid post content is created from bibliographic information", () => {
  const sampleScrapboxInfo = new ScrapboxBibliographicInformation(
    sampleBibliographicInformation
  );
  const samplePostContent = new PostContent(sampleScrapboxInfo.scrapboxInfo);

  const expectedContent = `[sampleImageUrl sampleCurrentUrl]
[author1](contribution1) [author2](contribution2)
samplePublisher samplePublishDate
ISBN/ASIN: sampleAsin
>sampleDescription1
>sampleDescription2
>sampleDescription3
#本
`;

  expect(samplePostContent.content).toBe(expectedContent);
});
