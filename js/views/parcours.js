import { parcours, formation, profile } from "../data.js";
import { escapeHtml } from "../format.js";
import { sectionHead } from "../blocks.js";

const diplomas = formation.filter((item) => !item.title.includes("SC-200"));
const certification = formation.find((item) => item.title.includes("SC-200"));

function rail(items) {
  return `<div class="rail">${items.map((item, index) => `<article data-reveal style="--d:${index}">
    ${item.when ? `<p class="when">${escapeHtml(item.when)}</p>` : ""}
    <h3>${escapeHtml(item.title)}</h3>
    <p>${escapeHtml(item.text || item.detail)}</p>
  </article>`).join("")}</div>`;
}

export function render() {
  return `<section>
    ${sectionHead("05", "Parcours professionnel", profile.role)}
    ${rail(parcours)}
  </section>
  <section>
    ${sectionHead("06", "Formation et certification")}
    ${rail(diplomas)}
  </section>
  ${certification ? `<section>
    ${sectionHead("07", certification.title, certification.detail)}
  </section>` : ""}`;
}
