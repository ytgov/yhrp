// @vitest-environment jsdom
import { createApp, nextTick } from "vue";
import { afterEach, describe, expect, it } from "vitest";
import LinkifiedText from "../LinkifiedText.vue";

let app;

const render = async (text) => {
  const el = document.createElement("div");
  app = createApp(LinkifiedText, { text });
  app.mount(el);
  await nextTick();
  return el;
};

afterEach(() => app?.unmount());

describe("LinkifiedText", () => {
  it("renders plain text unchanged", async () => {
    const el = await render("No links here.");
    expect(el.textContent).toBe("No links here.");
    expect(el.querySelectorAll("a")).toHaveLength(0);
  });

  it("turns a URL into a link and keeps surrounding text", async () => {
    const el = await render(
      "Source: https://parks.canada.ca/lhn-nhs/yt/klondike/culture/lhn-nhs-drague4-dredge4"
    );
    const links = el.querySelectorAll("a");
    expect(links).toHaveLength(1);
    expect(links[0].getAttribute("href")).toBe(
      "https://parks.canada.ca/lhn-nhs/yt/klondike/culture/lhn-nhs-drague4-dredge4"
    );
    expect(links[0].getAttribute("rel")).toBe("noopener noreferrer");
    expect(el.textContent).toBe(
      "Source: https://parks.canada.ca/lhn-nhs/yt/klondike/culture/lhn-nhs-drague4-dredge4"
    );
  });

  it("leaves trailing sentence punctuation outside the link", async () => {
    const el = await render("See https://yukon.ca/en. Or (http://example.com).");
    const hrefs = [...el.querySelectorAll("a")].map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(["https://yukon.ca/en", "http://example.com"]);
    expect(el.textContent).toBe("See https://yukon.ca/en. Or (http://example.com).");
  });

  it("does not render markup from the text", async () => {
    const el = await render('<img src=x onerror="alert(1)"> https://yukon.ca');
    expect(el.querySelector("img")).toBeNull();
    expect(el.querySelectorAll("a")).toHaveLength(1);
  });
});
