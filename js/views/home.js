import { profile, paths, projects, pipeline } from "../data.js";
import { escapeHtml } from "../format.js";
import { projectCard } from "../components.js";
import { mountSculpture } from "../sculpture.js";

const featured = ["africana", "shopping-data", "antidopage"]
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter(Boolean);

export function render() {
  return `<div class="view-home">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-band" aria-hidden="true"></div>
      <div class="container hero-inner">
        <div class="hero-copy">
          <p class="eyebrow eyebrow-light">${escapeHtml(profile.location)}</p>
          <h1 class="page-title" id="hero-title">${escapeHtml(profile.name)}</h1>
          <p class="role">${escapeHtml(profile.role)}</p>
          <p class="hero-lead">${escapeHtml(profile.lead)}</p>
          <div class="actions">
            <a class="button" href="#/donnees">Voir les études de cas</a>
            <a class="button button-secondary" href="#/services">Services web</a>
          </div>
        </div>
        <div class="sculpture" aria-hidden="true"></div>
      </div>
    </section>
    <section class="section" aria-labelledby="paths-title">
      <div class="container">
        <div class="section-head">
          <h2 class="section-title" id="paths-title">Deux portes d’entrée</h2>
        </div>
        <div class="path-grid">
          ${paths.map((path, index) => `<a class="path-card" href="${escapeHtml(path.href)}" data-reveal style="--d:${index}">
            <p class="eyebrow">${escapeHtml(path.eyebrow)}</p>
            <h3>${escapeHtml(path.title)}</h3>
            <p>${escapeHtml(path.text)}</p>
            <span class="text-link">Continuer <span aria-hidden="true">→</span></span>
          </a>`).join("")}
        </div>
      </div>
    </section>
    <section class="section section-pattern" aria-labelledby="home-projects-title">
      <div class="container">
        <div class="section-head">
          <h2 class="section-title" id="home-projects-title">Réalisations choisies</h2>
          <a class="text-link" href="#/projets">Tous les projets <span aria-hidden="true">→</span></a>
        </div>
        <div class="project-grid">${featured.map(projectCard).join("")}</div>
      </div>
    </section>
    <section class="section" aria-labelledby="home-stack-title">
      <div class="container">
        <div class="section-head">
          <h2 class="section-title" id="home-stack-title">Pile de données</h2>
          <a class="text-link" href="#/donnees">Le détail <span aria-hidden="true">→</span></a>
        </div>
        <ol class="pipeline">
          ${pipeline.map((item, index) => `<li data-reveal style="--d:${index}"><span class="step-index">${index + 1}</span><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.text)}</p></li>`).join("")}
        </ol>
      </div>
    </section>
  </div>`;
}

export function mount(root) {
  return mountSculpture(root.querySelector(".sculpture"));
}
