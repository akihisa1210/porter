export class Amazon {
  isEbook(): boolean {
    const selectedBookTypePanel = document.getElementsByClassName(
      "swatchElement selected"
    )[0];
    if (selectedBookTypePanel === undefined) {
      // selectedBookTypePanel が存在しない書籍ページ
      return false;
    }
    return selectedBookTypePanel.textContent.includes("電子書籍");
  }
}
