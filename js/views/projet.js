import { getProject } from "../data.js";
import { escapeHtml } from "../format.js";
import { render as missing } from "./missing.js";

export function render(route) {
  const project = getProject(route.slug);
  if (!project) return missing();
  return `<article class="detail">
    <p class="sec-num">02</p>
    <p class="back"><a class="link" href="#/projets">Projets GitHub</a></p>
    <h1>${escapeHtml(project.title)}</h1>
    <p>${escapeHtml(project.text)}</p>
    <p><a class="link" href="${escapeHtml(project.url)}">${escapeHtml(project.link)}</a></p>
  </article>`;
}
