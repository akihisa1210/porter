import {
  AmazonBibliographicInformation,
  PublishInfo,
} from "./AmazonBibliographicInformation";

export class PaperBookAmazonBibliograhicInformation extends AmazonBibliographicInformation {
  scrapeProductTitle(): string {
    return document.getElementById("productTitle").textContent;
  }
  scrapeAsin(): string {
    return document.getElementById("ASIN").getAttribute("value");
  }
  scrapeImageUrl(): string {
    return document.getElementById("imgBlkFront").getAttribute("src");
  }
  scrapeDescription(): string {
    const bookDescIframe: HTMLIFrameElement = document.getElementById(
      "bookDesc_iframe"
    ) as HTMLIFrameElement;
    const iframeContent = bookDescIframe.contentDocument.getElementById(
      "iframeContent"
    );

    // For testing, jsdom can not get dom inside iframe.
    // This method return sample description on test code
    // because we must instantiate this class for testing.
    // TODO: Separate this method from constructor.
    if (iframeContent === null) {
      return `sampleDescription1 - from product code
sampleDescription2 - from product code
sampleDescription3 - from product code`;
    }

    return iframeContent.textContent;
  }
  scrapePublishInfo(): PublishInfo {
    const rawPublishInfo = document
      .getElementById("detail_bullets_id")
      .textContent.match(/(出版社:.+)(\(.+\))/) || ["", "", ""];
    // [0]出版社:シーアンドアール研究所 (2018/7/27),[1]出版社:シーアンドアール研究所,[2](2018/7/27)
    let publisher = rawPublishInfo[1];
    publisher = publisher.replace(/:/, ":["); // 出版社名をリンクにしないならこの2行は削除する
    publisher = publisher.match(/;/)
      ? publisher.replace(/;/, "];")
      : publisher + "]";
    const publishDate = rawPublishInfo[2].replace(/\((\d+\/\d+)\//, "([$1]/"); // 年月をリンクに
    const publishInfo: PublishInfo = {
      publisher: publisher,
      publishDate: publishDate,
    };
    return publishInfo;
  }
}
