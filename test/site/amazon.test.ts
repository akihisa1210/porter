import { Amazon } from "../../src/site/amazon";

test("Paper book is selected", () => {
  const amazon = new Amazon();
  expect(amazon.isEbook).toBe(false);
});
