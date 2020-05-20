import {
  AmazonBibliographicInformation,
  PublishInfo,
} from "./AmazonBibliographicInformation";

export class PaperBookAmazonBibliograhicInformation extends AmazonBibliographicInformation {
  scrapeProductTitle(): string {
    return document.getElementById("productTitle").innerText;
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
    return bookDescIframe.contentDocument.getElementById("iframeContent")
      .innerText;
  }
  scrapePublishInfo(): PublishInfo {
    const RawPublishInfo = document
      .getElementById("detail_bullets_id")
      .innerText.match(/(出版社:.+)(\(.+\))/) || ["", "", ""];
    // [0]出版社:シーアンドアール研究所 (2018/7/27),[1]出版社:シーアンドアール研究所,[2](2018/7/27)
    let publisher = RawPublishInfo[1];
    publisher = publisher.replace(/:/, ":["); // 出版社名をリンクにしないならこの2行は削除する
    publisher = publisher.match(/;/)
      ? publisher.replace(/;/, "];")
      : publisher + "]";
    const publishDate =
      RawPublishInfo[2].replace(/\((\d+\/\d+)\//, "([$1]/") + " "; // 年月をリンクに
    const publishInfo: PublishInfo = {
      publisher: publisher,
      publishDate: publishDate,
    };
    return publishInfo;
  }
}
