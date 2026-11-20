import { projects } from "../data.js";
import { escapeHtml } from "../format.js";

function sentence(text) {
  const cut = text.indexOf(". ");
  return cut === -1 ? text : text.slice(0, cut + 1);
}

export function render() {
  return `<section>
    <p class="sec-num">02</p>
    <h2>Projets GitHub</h2>
    <div class="catalog">
      ${projects.map((project, index) => `<a class="row" href="#/projet/${escapeHtml(project.slug)}" data-reveal style="--d:${index}">
        <span class="num">${String(index + 1).padStart(2, "0")}</span>
        <span>
          <h3>${escapeHtml(project.title)}</h3>
          <p>${escapeHtml(sentence(project.text))}</p>
        </span>
        <p class="tools">${project.tools.map(escapeHtml).join(" · ")}</p>
      </a>`).join("")}
    </div>
  </section>`;
}
