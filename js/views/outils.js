import { skillGroups, toolNetwork } from "../data.js";
import { escapeHtml } from "../format.js";
import { mountToolNetwork } from "../tools.js";

export function render() {
  return `<section>
    <h2>Mes outils au quotidien</h2>
    <p>${escapeHtml(toolNetwork.description)}</p>
    <div class="tool-panel" data-tools>
      <div data-tools-svg></div>
    </div>
    <button class="motion-toggle" type="button" hidden>Mettre l’animation en pause</button>
  </section>
  <section>
    <h2>Compétences techniques</h2>
    <dl>
      ${skillGroups.map((group) => `<dt>${escapeHtml(group.title)}</dt><dd>${escapeHtml(group.items)}</dd>`).join("")}
    </dl>
  </section>`;
}

export function mount(root) {
  return mountToolNetwork(root);
}
