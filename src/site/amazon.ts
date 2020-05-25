export class Amazon {
  isEbook(): boolean {
    console.log(
      "電子書籍?",
      document
        .getElementsByClassName("swatchElement selected")[0]
        .textContent.includes("電子書籍")
    );
    return document
      .getElementsByClassName("swatchElement selected")[0]
      .textContent.includes("電子書籍");
  }
}
