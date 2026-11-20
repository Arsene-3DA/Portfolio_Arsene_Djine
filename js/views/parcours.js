import { parcours, formation } from "../data.js";
import { escapeHtml } from "../format.js";

export function render() {
  return `<section class="timeline">
    <h2>Parcours professionnel</h2>
    ${parcours.map((item) => `<article>
      <small>${escapeHtml(item.when)}</small>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.text)}</p>
    </article>`).join("")}
  </section>
  <section>
    <h2>Formation et certification</h2>
    <dl>
      ${formation.map((item) => `<dt>${escapeHtml(item.title)}</dt><dd>${escapeHtml(item.detail)}</dd>`).join("")}
    </dl>
  </section>`;
}
