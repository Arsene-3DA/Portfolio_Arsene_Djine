import { skillGroups, toolNetwork } from "../data.js";
import { escapeHtml } from "../format.js";
import { mountToolNetwork } from "../tools.js";

export function render() {
  return `<section>
    <p class="sec-num">03</p>
    <h2>Mes outils au quotidien</h2>
    <p>${escapeHtml(toolNetwork.description)}</p>
    <div class="tool-panel" data-tools>
      <div data-tools-svg></div>
    </div>
    <button class="motion-toggle link" type="button" hidden>Mettre l’animation en pause</button>
  </section>
  <section>
    <p class="sec-num">04</p>
    <h2>Compétences techniques</h2>
    <div>
      ${skillGroups.map((group, index) => `<div class="skill-block" data-reveal style="--d:${index}">
        <h3>${escapeHtml(group.title)}</h3>
        <p>${escapeHtml(group.items)}</p>
      </div>`).join("")}
    </div>
  </section>`;
}

export function mount(root) {
  return mountToolNetwork(root);
}
