import { cases, getCase } from "../data.js";
import { escapeHtml } from "../format.js";

function caseDetails(item, open) {
  const demo = item.code
    ? `<h3>${escapeHtml(item.demoTitle)}</h3><p>${escapeHtml(item.demoNote)}</p><pre><code>${escapeHtml(item.code)}</code></pre>`
    : `<h3>${escapeHtml(item.demoTitle)}</h3><ol>${item.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>`;
  return `<details ${open ? "open" : ""} id="cas-${escapeHtml(item.slug)}">
    <summary>${escapeHtml(item.summaryLabel)}</summary>
    <p>${escapeHtml(item.text)}</p>
    ${demo}
  </details>`;
}

export function render(route) {
  const one = route.slug ? getCase(route.slug) : null;
  const list = one ? [one] : cases;
  return `<section>
    <h2>Études de cas</h2>
    ${list.map((item, index) => caseDetails(item, Boolean(one) || index === 0)).join("")}
  </section>`;
}
