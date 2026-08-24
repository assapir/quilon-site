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
