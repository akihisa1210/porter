// workaround for TS2339
interface HTMLElement {
  value: any;
}

const main = function () {
  const productTitle =
    document.getElementById("productTitle") ||
    document.getElementById("ebooksProductTitle");

  const pageTitle = window.prompt(
    'Scrap "Amazon" to your scrapbox.',
    `『${productTitle.innerHTML}』`
  );

  if (!pageTitle) {
    return;
  }

  /**
   * Get ISBN/ASIN.
   * For paper books, Amazon uses 'ASIN' element and it has ISBN.
   * For ebooks, Amazon uses 'ASIN.0' element and it has ASIN.
   */
  const asin =
    document.getElementById("ASIN") || document.getElementsByName("ASIN.0")[0];

  /**
   * Get product details.
   */
  const details =
    document.getElementById("detail_bullets_id") ||
    document.getElementById("productDetailsTable");
  const detailsText = details.innerText;
  const publisher = detailsText.match(/(出版社:.+)(\(.+\))/) || ["", "", ""]; // [0]出版社:シーアンドアール研究所 (2018/7/27),[1]出版社:シーアンドアール研究所,[2](2018/7/27)
  publisher[1] = publisher[1].replace(/:/, ":["); // 出版社名をリンクにしないならこの2行は削除する
  publisher[1] = publisher[1].match(/;/)
    ? publisher[1].replace(/;/, "];")
    : publisher[1] + "]";
  // pubdata[2] = pubdata[2] + ' ';//リンクなし
  // pubdata[2] = pubdata[2].replace(/\((\d+)\//, '([$1]/') + ' ';//年をリンクに
  publisher[2] = publisher[2].replace(/\((\d+\/\d+)\//, "([$1]/") + " "; // 年月をリンクに

  const d = document.getElementById("productDescription"); // 内容紹介の処理
  // if (!d) {
  //   const subdoc = document.getElementById("product-description-iframe")
  //     .contentWindow.document;
  //   var d = subdoc.getElementById("productDescription");
  // }
  const d1 = d.getElementsByTagName("p")[0];
  // if (!d1) var d1 = d.getElementsByClassName("productDescriptionWrapper")[0];
  const d2 = d1.innerText.replace(/\n/g, "\n>");
  var imagecontainer = document.getElementById("imageBlockContainer"); // 書影の処理
  if (!imagecontainer)
    var imagecontainer = document.getElementById("ebooksImageBlockContainer");
  const image = imagecontainer.getElementsByTagName("img")[0];
  const imageurl = image.getAttribute("src");
  const pub = [];
  const c = document.getElementsByClassName("author");
  for (let g = 0; g < c.length; g++) {
    const at = c[g].textContent.replace(/,/, "");
    const pu = at.match(/\(.+\)/);
    const ct = at.replace(/\(.+\)/, "").replace(/ /g, "");
    pub.push(pu + " [" + ct + "]");
  }
  const lines =
    "[" +
    imageurl +
    " " +
    window.location.href +
    "]\n" +
    pub.join(" ") +
    "\n" +
    publisher[1] +
    publisher[2] +
    `ISBN/ASIN: ${asin.value}` +
    "\n>" +
    d2 +
    "\n#本\n"; // ページへの書き込み内容。ここで順番を変えればページ内容も変わります。
  const body = encodeURIComponent(lines);
  window.open(
    "https://scrapbox.io/akihisa1210/" +
      encodeURIComponent(pageTitle.trim()) +
      "?body=" +
      body
  );
};
main();
