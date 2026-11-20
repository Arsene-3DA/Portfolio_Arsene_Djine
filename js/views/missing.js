import { pageHead } from "../components.js";

export function missing() {
  return `<div class="view-missing">
    ${pageHead({
      eyebrow: "404",
      title: "Page introuvable",
      lede: "Cette adresse ne correspond à aucune page du portfolio."
    })}
    <section class="section"><div class="container"><a class="button" href="#/">Retour à l’accueil</a></div></section>
  </div>`;
}

export function render() {
  return missing();
}
