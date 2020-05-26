import { Amazon } from "../../src/site/amazon";

test("Paper book is selected", () => {
  const dom = `<li class="swatchElement"></li>
<li class="swatchElement selected"></li>`;
  document.body.innerHTML = dom;

  const amazon = new Amazon();
  expect(amazon.isEbook()).toBe(false);
});
