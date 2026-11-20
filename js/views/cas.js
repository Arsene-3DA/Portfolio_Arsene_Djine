import { cases, getCase } from "../data.js";
import { escapeHtml } from "../format.js";
import { render as missing } from "./missing.js";

function caseBody(item) {
  const demo = item.code
    ? `<h3>${escapeHtml(item.demoTitle)}</h3><p>${escapeHtml(item.demoNote)}</p><pre><code>${escapeHtml(item.code)}</code></pre>`
    : `<h3>${escapeHtml(item.demoTitle)}</h3><ol>${item.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>`;
  return `<p>${escapeHtml(item.text)}</p>${demo}`;
}

export function render(route) {
  const one = route.slug ? getCase(route.slug) : null;
  if (route.slug && !one) return missing();
  if (one) {
    return `<article class="detail">
      <p class="sec-num">01</p>
      <p class="back"><a class="link" href="#/cas">Études de cas</a></p>
      <h1>${escapeHtml(one.summaryLabel)}</h1>
      ${caseBody(one)}
    </article>`;
  }
  return `<section>
    <p class="sec-num">01</p>
    <h2>Études de cas</h2>
    <div class="catalog">
      ${cases.map((item, index) => {
        const [org, title] = item.summaryLabel.split(" · ");
        const tools = item.tools.length ? `<p class="tools">${item.tools.map(escapeHtml).join(" · ")}</p>` : "";
        return `<a class="row" href="#/cas/${escapeHtml(item.slug)}" data-reveal style="--d:${index}">
          <span class="num">${String(index + 1).padStart(2, "0")}</span>
          <span>
            <h3>${escapeHtml(title)}</h3>
            <p class="role-line">${escapeHtml(org)}</p>
          </span>
          ${tools}
        </a>`;
      }).join("")}
    </div>
  </section>`;
}
