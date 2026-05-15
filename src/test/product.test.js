import { getParam } from "../js/utils.mjs";

test("getParam returns the correct query parameter value", () => {
  // Mock window.location.search
  const originalLocation = window.location;
  delete window.location;
  window.location = { search: "?product=test-value&other=ignored" };

  expect(getParam("product")).toBe("test-value");
  expect(getParam("other")).toBe("ignored");
  expect(getParam("missing")).toBe(null);

  // Restore
  window.location = originalLocation;
});
