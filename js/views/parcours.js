import { parcours, formation } from "../data.js";
import { escapeHtml } from "../format.js";

export function render() {
  return `<section class="timeline">
    <p class="sec-num">05</p>
    <h2>Parcours professionnel</h2>
    ${parcours.map((item, index) => `<article data-reveal style="--d:${index}">
      <p class="when">${escapeHtml(item.when)}</p>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.text)}</p>
    </article>`).join("")}
  </section>
  <section>
    <p class="sec-num">06</p>
    <h2>Formation et certification</h2>
    ${formation.map((item) => `<div class="skill-block">
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.detail)}</p>
    </div>`).join("")}
  </section>`;
}
