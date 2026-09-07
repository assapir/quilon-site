// Highlight every Quilon sample with the same grammar the VS Code extension uses,
// so the colours here and in the editor cannot drift apart.
//
// The example picker uses native radios and CSS; switching needs no JavaScript.

import { highlight } from "./quilon-highlight.js";

const sources = new Map();
for (const el of document.querySelectorAll("code.language-quilon")) {
  sources.set(el, el.textContent);
  // textContent, not innerHTML: the source in the page is already escaped, and
  // highlight() escapes again as it wraps each token.
  el.innerHTML = highlight(el.textContent);
}

const examples = document.querySelector(".examples");
const toolsTemplate = document.querySelector("#example-tools");

// Clipboard access needs a secure context. Without it (or without JS), the
// examples still work and their source remains manually selectable.
if (examples && toolsTemplate && navigator.clipboard?.writeText) {
  let selectionVersion = 0;
  examples.addEventListener("change", () => {
    selectionVersion += 1;
    for (const status of examples.querySelectorAll(".copy-status")) {
      status.textContent = "";
    }
  });

  for (const [code, source] of sources) {
    const pre = code.closest("pre");
    const panel = code.closest(".panel");
    const block = document.createElement("div");
    block.className = "code-block";
    block.append(toolsTemplate.content.cloneNode(true));
    pre.replaceWith(block);
    block.append(pre);
    pre.tabIndex = 0;
    pre.setAttribute("aria-label", `${panel.querySelector("h2").textContent} source code`);

    const copyButton = block.querySelector(".copy-example");
    const copyStatus = block.querySelector(".copy-status");
    copyButton.setAttribute("aria-label", `Copy ${panel.querySelector("h2").textContent} example`);
    copyButton.addEventListener("click", async () => {
      const version = selectionVersion;
      copyButton.disabled = true;
      copyStatus.textContent = "";
      try {
        await navigator.clipboard.writeText(source);
        if (version === selectionVersion) copyStatus.textContent = "Copied!";
      } catch {
        if (version === selectionVersion) {
          copyStatus.textContent = "Couldn’t copy. Select the code to copy manually.";
        }
      } finally {
        copyButton.disabled = false;
      }
    });
  }
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
