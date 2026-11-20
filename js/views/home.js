import { profile } from "../data.js";
import { escapeHtml } from "../format.js";
import { mountSculpture } from "../sculpture.js";

export function render() {
  return `<section class="hero">
    <div>
      <small>${escapeHtml(profile.location)}</small>
      <h1>${escapeHtml(profile.name)}</h1>
      <p class="role">${escapeHtml(profile.role)}</p>
      <p>${escapeHtml(profile.lead)}</p>
      <a class="button" href="#/cas">Explorer mes réalisations ↓</a>
    </div>
    <div class="sculpture" aria-hidden="true"></div>
  </section>`;
}

export function mount(root) {
  return mountSculpture(root.querySelector(".sculpture"));
}
