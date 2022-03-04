// @vitest-environment jsdom
import { test, expect } from "vitest";
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

test("Select panel is not exist (e.g. old book)", () => {
  const dom = `<div></div>`;
  document.body.innerHTML = dom;

  const amazon = new Amazon();
  expect(amazon.isEbook()).toBe(false);
});
