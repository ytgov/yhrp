import { describe, expect, it } from "vitest";
import { escapeHtml } from "../escapeHtml";

describe("escapeHtml", () => {
  it("escapes HTML special characters", () => {
    expect(escapeHtml(`<img src=x onerror="alert('1')">&`)).toBe(
      "&lt;img src=x onerror=&quot;alert(&#39;1&#39;)&quot;&gt;&amp;"
    );
  });

  it("leaves ordinary text, including accents, unchanged", () => {
    expect(escapeHtml("Dredge No. 4 – Lieu patrimonial")).toBe(
      "Dredge No. 4 – Lieu patrimonial"
    );
  });

  it("returns an empty string for null or undefined", () => {
    expect(escapeHtml(null)).toBe("");
    expect(escapeHtml(undefined)).toBe("");
  });

  it("converts numbers to strings", () => {
    expect(escapeHtml(42)).toBe("42");
  });
});
