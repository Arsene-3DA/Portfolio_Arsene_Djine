import { cases, getCase, profile } from "../data.js";
import { escapeHtml } from "../format.js";
import { sectionHead } from "../blocks.js";
import { render as missing } from "./missing.js";

const question = profile.lead.slice(0, profile.lead.indexOf("?") + 1);

function blocks(item) {
  const [org, role] = item.summaryLabel.split(" · ");
  const cells = [
    `<div class="panel span-4" data-reveal><p class="label">Contexte</p><p>${escapeHtml(org)}</p></div>`,
    `<div class="panel span-8" data-reveal><p class="label">Rôle</p><p>${escapeHtml(role)}</p></div>`,
    `<div class="panel span-12" data-reveal><p class="label">Démarche</p><p>${escapeHtml(item.text)}</p></div>`
  ];
  if (item.tools.length) {
    cells.push(`<div class="panel span-12" data-reveal><p class="label">Outils</p><p>${item.tools.map(escapeHtml).join(" · ")}</p></div>`);
  }
  const demo = item.code
    ? `<h3>${escapeHtml(item.demoTitle)}</h3><p>${escapeHtml(item.demoNote)}</p><pre><code>${escapeHtml(item.code)}</code></pre>`
    : `<h3>${escapeHtml(item.demoTitle)}</h3><ol>${item.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>`;
  cells.push(`<div class="panel span-12" data-reveal>${demo}</div>`);
  return `<div class="grid-12">${cells.join("")}</div>`;
}

export function render(route) {
  const one = route.slug ? getCase(route.slug) : null;
  if (route.slug && !one) return missing();
  if (one) {
    return `<article class="case-detail">
      ${sectionHead("01", "Études de cas", question)}
      <p class="back"><a class="link" href="#/cas">Études de cas</a></p>
      <h1>${escapeHtml(one.summaryLabel)}</h1>
      ${blocks(one)}
    </article>`;
  }
  return `<section>
    ${sectionHead("01", "Études de cas", question)}
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
