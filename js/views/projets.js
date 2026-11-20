import { projects } from "../data.js";
import { escapeHtml } from "../format.js";

export function render() {
  return `<section class="project-grid">
    <h2>Projets GitHub</h2>
    ${projects.map((project) => `<article>
      <h3>${escapeHtml(project.title)}</h3>
      <p>${escapeHtml(project.text)}</p>
      <a href="${escapeHtml(project.url)}">${escapeHtml(project.link)}</a>
    </article>`).join("")}
  </section>`;
}
