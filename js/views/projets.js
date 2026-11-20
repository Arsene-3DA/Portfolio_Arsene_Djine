import { projects } from "../data.js";
import { pageHead, projectCard } from "../components.js";

export function render() {
  return `<div class="view-projets">
    ${pageHead({
      eyebrow: "Réalisations",
      title: "Projets",
      lede: "Le site Africana Marché Tropical, les dépôts GitHub déjà publiés, une étude encore en cours, et deux emplacements prêts à être remplis."
    })}
    <section class="section">
      <div class="container">
        <div class="project-grid">${projects.map(projectCard).join("")}</div>
      </div>
    </section>
  </div>`;
}
