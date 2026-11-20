import { profile } from "../data.js";
import { escapeHtml } from "../format.js";

export function render() {
  return `<section>
    <h2>Contact</h2>
    <div class="tags">
      <a href="mailto:${escapeHtml(profile.email)}">${escapeHtml(profile.email)}</a>
      <a href="tel:${escapeHtml(profile.phoneTel)}">${escapeHtml(profile.phoneDisplay)}</a>
      <a href="${escapeHtml(profile.github)}">${escapeHtml(profile.githubLabel)}</a>
    </div>
  </section>`;
}
