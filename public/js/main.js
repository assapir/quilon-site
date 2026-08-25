// Highlight every Quilon sample with the same grammar the VS Code extension uses,
// so the colours here and in the editor cannot drift apart.
//
// The carousel itself is CSS — scroll-snap plus ::scroll-marker. No JS.

import { highlight } from "./quilon-highlight.js";

for (const el of document.querySelectorAll("code.language-quilon")) {
  // textContent, not innerHTML: the source in the page is already escaped, and
  // highlight() escapes again as it wraps each token.
  el.innerHTML = highlight(el.textContent);
}

// The star count is decoration on a link that already works: if /api/stars is
// slow, down, or over GitHub's rate limit, the badge simply never appears.
const badge = document.querySelector("[data-star-count]");
if (badge) {
  try {
    const res = await fetch("/api/stars");
    const { stars } = res.ok ? await res.json() : {};
    if (typeof stars === "number") {
      badge.textContent = stars.toLocaleString();
      badge.hidden = false;
    }
  } catch {
    // Offline or blocked. Nothing to show and nothing to say about it.
  }
}
