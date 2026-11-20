import { profile } from "../data.js";
import { escapeHtml } from "../format.js";
import { mountSculpture } from "../sculpture.js";

export function render() {
  return `<section class="hero">
    <div class="hero-copy">
      <p class="kicker">${escapeHtml(profile.location)}</p>
      <h1>${escapeHtml(profile.name)}</h1>
      <p class="role">${escapeHtml(profile.role)}</p>
      <p class="lede">${escapeHtml(profile.lead)}</p>
      <p class="actions"><a class="link" href="#/cas">Explorer mes réalisations ↓</a></p>
    </div>
    <div class="sculpture" aria-hidden="true"></div>
  </section>`;
}

export function mount(root) {
  return mountSculpture(root.querySelector(".sculpture"));
}
