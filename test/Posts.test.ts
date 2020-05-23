import { Post, PostTitle } from "../src/Post";
import { PaperBookAmazonBibliograhicInformation } from "../src/PaperBookAmazonBibliograhicInformation";
jest.mock("../src/PaperBookAmazonBibliograhicInformation");

test("constructScrapboxPageContent() constructs valid bibliographic information", () => {
  const samplePostTitle = new PostTitle("samplePosttitle");
  const post = new Post(samplePostTitle);
  const sampleBibliographicInformation = new PaperBookAmazonBibliograhicInformation();
  sampleBibliographicInformation.productTitle = "sampleProductTitel";
  sampleBibliographicInformation.asin = "sampleAsin";
  sampleBibliographicInformation.publishInfo = {
    publisher: "samplePublisher",
    publishDate: "samplePublishDate",
  };
  sampleBibliographicInformation.description = `sampleDescription1
sampleDescription2
sampleDescription3`;
  sampleBibliographicInformation.imageUrl = "sampleImageUrl";
  sampleBibliographicInformation.authors = [
    {
      author: "author1",
      contribution: "(contribution1)",
    },
    {
      author: "author2",
      contribution: "(contribution2)",
    },
  ];
  sampleBibliographicInformation.currentUrl = "sampleCurrentUrl";

  expect(post.constructScrapboxPageContent(sampleBibliographicInformation))
    .toBe(`[sampleImageUrl sampleCurrentUrl]
[author1](contribution1) [author2](contribution2)
samplePublisher samplePublishDate
ISBN/ASIN: sampleAsin
>sampleDescription1
>sampleDescription2
>sampleDescription3
#本
`);
});
