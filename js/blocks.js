import { escapeHtml } from "./format.js";

export function sectionHead(num, title, phrase) {
  return `<header class="block-head">
    <p class="sec-num">${escapeHtml(num)}</p>
    <h2>${escapeHtml(title)}</h2>
    ${phrase ? `<p class="block-phrase">${escapeHtml(phrase)}</p>` : ""}
  </header>`;
}
