import { getProject } from "../data.js";
import { escapeHtml } from "../format.js";
import { breadcrumb, textOrMissing } from "../components.js";
import { missing } from "./missing.js";

export function render(route) {
  const project = getProject(route.slug);
  if (!project) return missing();
  const paragraphs = project.paragraphs.map((paragraph) => `<p>${textOrMissing(paragraph)}</p>`).join("");
  const links = [
    project.url ? `<a class="button" href="${escapeHtml(project.url)}">${escapeHtml(project.urlLabel || "Ouvrir le lien")} <span aria-hidden="true">↗</span></a>` : "",
    project.repo ? `<a class="button button-secondary" href="${escapeHtml(project.repo)}">${escapeHtml(project.repoLabel || "Dépôt GitHub")} <span aria-hidden="true">↗</span></a>` : ""
  ].join("");
  const figure = project.image
    ? `<figure class="detail-figure motif-frame"><img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.imageAlt)}" width="${project.imageWidth}" height="${project.imageHeight}"></figure>`
    : "";
  const tags = (project.tags || []).map((tag) => `<li>${escapeHtml(tag)}</li>`).join("");
  return `<article class="view-detail">
    <header class="page-head">
      <div class="container">
        ${breadcrumb([
          { href: "#/", label: "Accueil" },
          { href: "#/projets", label: "Projets" },
          { label: project.title }
        ])}
        <p class="eyebrow">${escapeHtml(project.statusLabel)}</p>
        <h1 class="page-title">${escapeHtml(project.title)}</h1>
        <p class="lede">${textOrMissing(project.summary)}</p>
      </div>
    </header>
    <section class="section">
      <div class="container detail-layout">
        <div class="detail-copy">
          ${paragraphs}
          ${tags ? `<ul class="tag-list">${tags}</ul>` : ""}
          ${links ? `<div class="actions">${links}</div>` : ""}
          ${project.placeholder ? `<p class="note">Pour remplir cet emplacement, modifiez le projet <code>${escapeHtml(project.slug)}</code> dans <code>js/data.js</code>.</p>` : ""}
        </div>
        ${figure}
      </div>
    </section>
  </article>`;
}
