/**
 * Escape a value for safe use inside HTML text or a quoted attribute.
 *
 * Use this whenever register data is put into an HTML string, for example
 * Leaflet popups, so a place name or URL can never inject markup.
 */
const HTML_ESCAPES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);
}
