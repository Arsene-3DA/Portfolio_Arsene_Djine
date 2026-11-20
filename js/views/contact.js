import { profile, gaps, isMissing } from "../data.js";
import { escapeHtml, mailto } from "../format.js";
import { pageHead, textOrMissing } from "../components.js";

function linkedinLine() {
  if (isMissing(gaps.linkedin)) return `<div><dt>LinkedIn</dt><dd>${textOrMissing(gaps.linkedin)}</dd></div>`;
  return `<div><dt>LinkedIn</dt><dd><a href="${escapeHtml(gaps.linkedin)}">${escapeHtml(gaps.linkedin)}</a></dd></div>`;
}

export function render() {
  return `<div class="view-contact">
    ${pageHead({
      eyebrow: "Contact",
      title: "Écrire",
      lede: "Le formulaire ouvre votre logiciel de courriel. Rien n’est enregistré sur ce site, et aucun service de formulaire tiers n’est utilisé."
    })}
    <section class="section">
      <div class="container contact-layout">
        <div class="card fact contact-facts">
          <h2 class="section-title">Coordonnées</h2>
          <dl>
            <div><dt>Courriel</dt><dd><a href="${escapeHtml(mailto({ to: profile.email }))}">${escapeHtml(profile.email)}</a></dd></div>
            <div><dt>Téléphone</dt><dd><a href="tel:${escapeHtml(profile.phoneTel)}">${escapeHtml(profile.phoneDisplay)}</a></dd></div>
            <div><dt>GitHub</dt><dd><a href="${escapeHtml(profile.github)}">${escapeHtml(profile.githubHandle)}</a></dd></div>
            <div><dt>Lieu</dt><dd>${escapeHtml(profile.location)}</dd></div>
            ${linkedinLine()}
          </dl>
        </div>
        <form class="card form-card" id="contact-form">
          <h2 class="section-title">Message</h2>
          <div class="fields">
            <label class="field">Nom
              <input name="nom" type="text" autocomplete="name" required maxlength="120">
            </label>
            <label class="field">Votre courriel
              <input name="courriel" type="email" autocomplete="email" required maxlength="160">
            </label>
            <label class="field wide">Sujet
              <select name="sujet" required>
                <option>Services web</option>
                <option>Données</option>
                <option>Autre</option>
              </select>
            </label>
            <label class="field wide">Message
              <textarea name="message" rows="6" required maxlength="4000"></textarea>
            </label>
          </div>
          <button class="button" type="submit">Ouvrir le courriel</button>
          <p class="note" id="contact-status" role="status"></p>
        </form>
      </div>
    </section>
  </div>`;
}

export function mount(root) {
  const form = root.querySelector("#contact-form");
  if (!form) return () => {};
  const status = form.querySelector("#contact-status");
  const onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const nom = String(data.get("nom") || "").trim();
    const courriel = String(data.get("courriel") || "").trim();
    const sujet = String(data.get("sujet") || "Message").trim();
    const message = String(data.get("message") || "").trim();
    const href = mailto({
      to: profile.email,
      subject: sujet,
      body: `Nom : ${nom}\nCourriel : ${courriel}\n\n${message}`
    });
    status.textContent = "Votre logiciel de courriel va s’ouvrir. Aucun message n’est enregistré sur ce site.";
    window.location.href = href;
  };
  form.addEventListener("submit", onSubmit);
  return () => form.removeEventListener("submit", onSubmit);
}
