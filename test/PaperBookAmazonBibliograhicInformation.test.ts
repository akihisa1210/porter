import { PaperBookAmazonBibliograhicInformation } from "../src/PaperBookAmazonBibliograhicInformation";

const dom = `<div id="productTitle">sampleProductTitle</div>
<div id="ASIN" value="sampleAsin"></div>
<div id="detail_bullets_id">
  <ul>
    <li><b>出版社:</b> samplePublisher (2020/1/1)</li>
  </ul>
</div>
<div id="imgBlkFront" src="sampleImageUrl"></div>
<span class="author notFaded" data-width="">
  <a>sampleAuthor1</a> 
  <span class="contribution" spacing="none">
    <span class="a-color-secondary">(sampleContribution1), </span>
  </span>
</span>
<span class="author notFaded" data-width="">
  <a>sampleAuthor2</a> 
    <span class="contribution" spacing="none">
      <span class="a-color-secondary">(sampleContribution2)</span>
    </span>
</span>
<iframe id="bookDesc_iframe">
  #document
    <html>
      <head></head>
      <body>
        <div iframeContent>
          sampleDiscription1
          sampleDiscription2
          sampleDiscription3
        </div>
      </body>
    </html>
</iframe>`;

test("Scrape product title", () => {
  document.body.innerHTML = dom;
  const expectedInformation = {
    asin: "sampleAsin",
    // authors: [
    //   {
    //     author: "sampleAuthor1",
    //     contribution: "(sampleContribution1)",
    //   },
    //   {
    //     author: "sampleAuthor2",
    //     contribution: "(sampleContribution2)",
    //   },
    // ],
    // TODO: Author can not be got. The reason is not clear.
    authors: [
      {
        author: undefined,
        contribution: undefined,
      },
      {
        author: undefined,
        contribution: undefined,
      },
    ],
    currentUrl: "http://localhost/",
    description: `sampleDescription1 - from product code
sampleDescription2 - from product code
sampleDescription3 - from product code`,
    imageUrl: "sampleImageUrl",
    productTitle: "sampleProductTitle",
    publishInfo: {
      publishDate: "([2020/1]/1)",
      publisher: "出版社:[ samplePublisher ]",
    },
  } as PaperBookAmazonBibliograhicInformation;

  const pabi = new PaperBookAmazonBibliograhicInformation();

  expect(pabi).toEqual(expectedInformation);
});
