import { getCase } from "../data.js";
import { escapeHtml } from "../format.js";
import { breadcrumb, codeBlock } from "../components.js";
import { missing } from "./missing.js";

export function render(route) {
  const item = getCase(route.slug);
  if (!item) return missing();
  const demo = item.code
    ? `<h2 class="section-title">${escapeHtml(item.demoTitle)}</h2><p>${escapeHtml(item.demoNote)}</p>${codeBlock(item.code, item.demoTitle)}`
    : `<h2 class="section-title">${escapeHtml(item.demoTitle)}</h2><ol class="plain-steps">${item.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>`;
  return `<article class="view-detail">
    <header class="page-head">
      <div class="container">
        ${breadcrumb([
          { href: "#/", label: "Accueil" },
          { href: "#/donnees", label: "Données" },
          { label: `${item.kicker} · ${item.title}` }
        ])}
        <p class="eyebrow">${escapeHtml(item.kicker)}</p>
        <h1 class="page-title">${escapeHtml(item.title)}</h1>
        <p class="lede">${escapeHtml(item.summary)}</p>
      </div>
    </header>
    <section class="section">
      <div class="container detail-copy detail-narrow">
        ${demo}
        <div class="actions"><a class="button button-secondary" href="#/donnees">Retour aux données</a></div>
      </div>
    </section>
  </article>`;
}
