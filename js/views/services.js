import { services, processSteps } from "../data.js";
import { escapeHtml } from "../format.js";
import { pageHead } from "../components.js";

export function render() {
  return `<div class="view-services">
    ${pageHead({
      eyebrow: "Services web · Gatineau et Ottawa",
      title: "Sites pour les commerces d’ici",
      lede: "Création de site vitrine, refonte, référencement local et entretien. Pas de grille tarifaire sur cette page : tarifs sur demande."
    })}
    <section class="section" aria-labelledby="offers-title">
      <div class="container">
        <h2 class="section-title" id="offers-title">Ce que je peux prendre en charge</h2>
        <div class="offer-grid">
          ${services.map((service, index) => `<article class="card fact" data-reveal style="--d:${index}">
            <h3>${escapeHtml(service.title)}</h3>
            <p>${escapeHtml(service.text)}</p>
            <p class="price-note">Tarifs sur demande</p>
          </article>`).join("")}
        </div>
      </div>
    </section>
    <section class="section section-pattern" aria-labelledby="process-title">
      <div class="container">
        <h2 class="section-title" id="process-title">Comment se déroule un mandat</h2>
        <ol class="steps steps-5">
          ${processSteps.map((step, index) => `<li class="card step" data-reveal style="--d:${index}">
            <span class="step-index">${index + 1}</span>
            <h3>${escapeHtml(step.title)}</h3>
            <p>${escapeHtml(step.text)}</p>
          </li>`).join("")}
        </ol>
        <p class="note">Tarifs sur demande. Le montant dépend des pages, des textes déjà prêts et du suivi souhaité après la mise en ligne.</p>
        <div class="actions">
          <a class="button" href="#/contact">Écrire au sujet d’un site</a>
          <a class="button button-secondary" href="#/projet/africana">Voir Africana Marché Tropical</a>
        </div>
      </div>
    </section>
  </div>`;
}
