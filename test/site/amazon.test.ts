import { Amazon } from "../../src/site/amazon";

test("Ebook is selected", () => {
  const dom = `<li class="swatchElement selected"><span>Kindle版 (電子書籍)</span></li>
<li class="swatchElement"></li>`;
  document.body.innerHTML = dom;

  const amazon = new Amazon();
  expect(amazon.isEbook()).toBe(true);
});

test("Paper book is selected", () => {
  const dom = `<li class="swatchElement"><span>Kindle版 (電子書籍)</span></li>
<li class="swatchElement selected"></li>`;
  document.body.innerHTML = dom;

  const amazon = new Amazon();
  expect(amazon.isEbook()).toBe(false);
});
