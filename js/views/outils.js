import { skillGroups, toolNetwork } from "../data.js";
import { escapeHtml } from "../format.js";
import { sectionHead } from "../blocks.js";
import { mountToolNetwork } from "../tools.js";

export function render() {
  return `<section>
    ${sectionHead("03", "Mes outils au quotidien", toolNetwork.description)}
    <div class="tool-panel" data-tools>
      <div data-tools-svg></div>
    </div>
    <button class="motion-toggle link" type="button" hidden>Mettre l’animation en pause</button>
  </section>
  <section>
    ${sectionHead("04", "Compétences techniques")}
    <div class="grid-12">
      ${skillGroups.map((group, index) => `<article class="panel ${index < 3 ? "span-4" : "span-6"}" data-reveal style="--d:${index}">
        <h3>${escapeHtml(group.title)}</h3>
        <p>${escapeHtml(group.items)}</p>
      </article>`).join("")}
    </div>
  </section>`;
}

export function mount(root) {
  return mountToolNetwork(root);
}
