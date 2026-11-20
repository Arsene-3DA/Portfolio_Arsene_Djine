import { profile, gaps, parcours, formation, isMissing } from "../data.js";
import { escapeHtml } from "../format.js";
import { pageHead, textOrMissing } from "../components.js";

function portrait() {
  if (isMissing(gaps.portrait)) {
    return `<figure class="portrait portrait-missing"><div class="card-fallback"><span>Photo</span></div><figcaption>${textOrMissing(gaps.portrait)}</figcaption></figure>`;
  }
  const alt = isMissing(gaps.portraitAlt) ? profile.name : gaps.portraitAlt;
  return `<figure class="portrait"><img src="${escapeHtml(gaps.portrait)}" alt="${escapeHtml(alt)}" width="640" height="800" loading="lazy"><figcaption>${escapeHtml(alt)}</figcaption></figure>`;
}

function linkedin() {
  if (isMissing(gaps.linkedin)) return `<p>LinkedIn ${textOrMissing(gaps.linkedin)}</p>`;
  return `<p><a href="${escapeHtml(gaps.linkedin)}">LinkedIn</a></p>`;
}

export function render() {
  return `<div class="view-about">
    ${pageHead({
      eyebrow: profile.location,
      title: "À propos",
      lede: `${profile.role}. ${profile.lead}`
    })}
    <section class="section">
      <div class="container about-layout">
        ${portrait()}
        <div>
          <h2 class="section-title">Parcours professionnel</h2>
          <div class="timeline">
            ${parcours.map((item) => `<article>
              <p class="eyebrow">${escapeHtml(item.when)}</p>
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.text)}</p>
            </article>`).join("")}
          </div>
        </div>
      </div>
    </section>
    <section class="section section-pattern" aria-labelledby="formation-title">
      <div class="container">
        <h2 class="section-title" id="formation-title">Formation et certification</h2>
        <dl class="skill-list">
          ${formation.map((item) => `<div><dt>${escapeHtml(item.title)}</dt><dd>${escapeHtml(item.detail)}</dd></div>`).join("")}
        </dl>
        <div class="gap-note">${linkedin()}<p class="note">La photo et le lien LinkedIn se remplissent dans <code>gaps</code>, au début de <code>js/data.js</code>.</p></div>
      </div>
    </section>
  </div>`;
}
