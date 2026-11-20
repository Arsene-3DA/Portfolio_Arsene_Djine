import { profile } from "../data.js";
import { escapeHtml } from "../format.js";
import { sectionHead } from "../blocks.js";

export function render() {
  return `<section>
    ${sectionHead("08", "Contact", profile.location)}
    <div class="grid-12">
      <div class="span-7">
        <p class="role">${escapeHtml(profile.role)}</p>
        <p class="lede">${escapeHtml(profile.lead)}</p>
      </div>
      <div class="coords span-5">
        <a class="link" href="mailto:${escapeHtml(profile.email)}">${escapeHtml(profile.email)}</a>
        <a class="link" href="tel:${escapeHtml(profile.phoneTel)}">${escapeHtml(profile.phoneDisplay)}</a>
        <a class="link" href="${escapeHtml(profile.github)}">${escapeHtml(profile.githubLabel)}</a>
      </div>
    </div>
  </section>`;
}
