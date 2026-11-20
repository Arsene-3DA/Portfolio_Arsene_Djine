import { profile, cases, pipeline, skillGroups, toolNetwork } from "../data.js";
import { escapeHtml } from "../format.js";
import { pageHead, codeBlock } from "../components.js";
import { mountToolNetwork } from "../tools.js";

function caseBlock(item) {
  const demo = item.code
    ? `<h3>${escapeHtml(item.demoTitle)}</h3><p>${escapeHtml(item.demoNote)}</p>${codeBlock(item.code, item.demoTitle)}`
    : `<h3>${escapeHtml(item.demoTitle)}</h3><ol class="plain-steps">${item.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>`;
  return `<article class="case-card card" id="cas-${escapeHtml(item.slug)}">
    <p class="eyebrow">${escapeHtml(item.kicker)}</p>
    <h3>${escapeHtml(item.title)}</h3>
    <p>${escapeHtml(item.summary)}</p>
    ${demo}
    <p><a class="text-link" href="#/cas/${escapeHtml(item.slug)}">Ouvrir cette étude <span aria-hidden="true">→</span></a></p>
  </article>`;
}

export function render() {
  return `<div class="view-donnees">
    ${pageHead({
      eyebrow: profile.role,
      title: "Données",
      lede: profile.lead
    })}
    <section class="section" aria-labelledby="pipeline-title">
      <div class="container">
        <h2 class="section-title" id="pipeline-title">Du fichier au tableau de bord</h2>
        <ol class="pipeline">
          ${pipeline.map((item, index) => `<li data-reveal style="--d:${index}"><span class="step-index">${index + 1}</span><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.text)}</p></li>`).join("")}
        </ol>
      </div>
    </section>
    <section class="section section-paper" aria-labelledby="cases-title">
      <div class="container">
        <div class="section-head">
          <h2 class="section-title" id="cases-title">Études de cas</h2>
        </div>
        <div class="case-list">${cases.map(caseBlock).join("")}</div>
      </div>
    </section>
    <section class="section" aria-labelledby="tools-heading">
      <div class="container">
        <h2 class="section-title" id="tools-heading">Mes outils au quotidien</h2>
        <p class="lede lede-tight">${escapeHtml(toolNetwork.description)}</p>
        <div class="tool-panel" data-tools>
          <div data-tools-svg></div>
          <button class="motion-toggle" type="button" hidden>Mettre l’animation en pause</button>
        </div>
      </div>
    </section>
    <section class="section section-pattern" aria-labelledby="skills-title">
      <div class="container">
        <h2 class="section-title" id="skills-title">Compétences techniques</h2>
        <dl class="skill-list">
          ${skillGroups.map((group) => `<div data-reveal><dt>${escapeHtml(group.title)}</dt><dd>${escapeHtml(group.items)}</dd></div>`).join("")}
        </dl>
      </div>
    </section>
  </div>`;
}

export function mount(root) {
  return mountToolNetwork(root);
}
