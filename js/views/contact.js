import { profile } from "../data.js";
import { escapeHtml } from "../format.js";

export function render() {
  return `<section>
    <p class="sec-num">07</p>
    <h2>Contact</h2>
    <div class="tags">
      <a class="link" href="mailto:${escapeHtml(profile.email)}">${escapeHtml(profile.email)}</a>
      <a class="link" href="tel:${escapeHtml(profile.phoneTel)}">${escapeHtml(profile.phoneDisplay)}</a>
      <a class="link" href="${escapeHtml(profile.github)}">${escapeHtml(profile.githubLabel)}</a>
    </div>
  </section>`;
}
