import { projects } from "../data.js";
import { escapeHtml } from "../format.js";
import { sectionHead } from "../blocks.js";

export function render() {
  return `<section>
    ${sectionHead("02", "Projets GitHub")}
    <div class="grid-12">
      ${projects.map((project, index) => `<article class="project-cell span-6" data-reveal style="--d:${index}">
        <h3><a class="title-link" href="#/projet/${escapeHtml(project.slug)}">${escapeHtml(project.title)}</a></h3>
        <p>${escapeHtml(project.text)}</p>
        <p class="tools">${project.tools.map(escapeHtml).join(" · ")}</p>
        <a class="link" href="${escapeHtml(project.url)}">${escapeHtml(project.link)}</a>
      </article>`).join("")}
    </div>
  </section>`;
}
