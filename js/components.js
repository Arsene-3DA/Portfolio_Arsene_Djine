import { escapeHtml } from "./format.js";
import { MISSING, isMissing } from "./data.js";

export function missingHtml() {
  return `<span class="a-completer">${MISSING}</span>`;
}

export function textOrMissing(value) {
  if (isMissing(value)) return missingHtml();
  return escapeHtml(value);
}

export function pageHead({ eyebrow, title, lede }) {
  return `<header class="page-head"><div class="container">
    ${eyebrow ? `<p class="eyebrow">${escapeHtml(eyebrow)}</p>` : ""}
    <h1 class="page-title">${escapeHtml(title)}</h1>
    ${lede ? `<p class="lede">${typeof lede === "string" ? escapeHtml(lede) : lede}</p>` : ""}
  </div></header>`;
}

export function breadcrumb(items) {
  const list = items.map((item, index) => {
    const last = index === items.length - 1;
    const inner = last || !item.href
      ? `<span aria-current="${last ? "page" : "false"}">${escapeHtml(item.label)}</span>`
      : `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`;
    return `<li>${inner}</li>`;
  }).join("");
  return `<nav class="breadcrumb" aria-label="Fil d’Ariane"><ol>${list}</ol></nav>`;
}

export function projectCard(project, index = 0) {
  const badge = `<span class="badge ${project.badge || ""}">${escapeHtml(project.statusLabel)}</span>`;
  const media = project.image
    ? `<img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.imageAlt)}" width="${project.imageWidth}" height="${project.imageHeight}" loading="lazy" decoding="async">`
    : `<div class="card-fallback"><span>${escapeHtml(project.placeholder ? "Projet à venir" : project.statusLabel)}</span></div>`;
  const summary = textOrMissing(project.summary);
  return `<article class="project-card${project.placeholder ? " is-placeholder" : ""}" data-reveal style="--d:${index}">
    <a class="project-card-link" href="#/projet/${encodeURIComponent(project.slug)}">
      <div class="project-media motif-frame">${badge}${media}</div>
      <div class="project-body">
        <h3>${escapeHtml(project.title)}</h3>
        <p>${summary}</p>
        <span class="text-link">Voir le projet <span aria-hidden="true">→</span></span>
      </div>
    </a>
  </article>`;
}

export function codeBlock(code, label) {
  return `<pre class="code"><code aria-label="${escapeHtml(label)}">${escapeHtml(code)}</code></pre>`;
}
