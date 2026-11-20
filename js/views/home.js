import { profile, projects, skillGroups, toolNetwork } from "../data.js";
import { escapeHtml } from "../format.js";
import { sectionHead } from "../blocks.js";
import { mountSculpture } from "../sculpture.js";

const question = profile.lead.slice(0, profile.lead.indexOf("?") + 1);

const sommaire = [
  { num: "01", href: "#/cas", title: "Études de cas", phrase: question, span: "span-4" },
  { num: "02", href: "#/projets", title: "Projets GitHub", phrase: projects[0].title, span: "span-4" },
  { num: "03", href: "#/outils", title: "Mes outils au quotidien", phrase: toolNetwork.description, span: "span-4" },
  { num: "05", href: "#/parcours", title: "Parcours professionnel", phrase: profile.role, span: "span-6" },
  { num: "08", href: "#/contact", title: "Contact", phrase: profile.email, span: "span-6" }
];

export function render() {
  return `<section class="hero">
    <div class="hero-copy">
      <p class="kicker">${escapeHtml(profile.location)}</p>
      <h1>${escapeHtml(profile.name)}</h1>
      <p class="role-banner">${profile.role.split(" | ").map((part, index) => `${index ? '<span class="role-rule" aria-hidden="true"></span><span class="visually-hidden"> | </span>' : ""}<span>${escapeHtml(part)}</span>`).join("")}</p>
      <p class="lede">${escapeHtml(profile.lead)}</p>
      <p class="actions"><a class="link" href="#/cas">Explorer mes réalisations ↓</a></p>
    </div>
    <div class="sculpture" aria-hidden="true"></div>
  </section>
  <section>
    <div class="grid-12">
      ${sommaire.map((item, index) => `<a class="panel sommaire ${item.span}" href="${item.href}" data-reveal style="--d:${index}">
        <p class="sec-num">${item.num}</p>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.phrase)}</p>
      </a>`).join("")}
    </div>
  </section>
  <section>
    ${sectionHead("04", "Compétences techniques")}
    <div class="grid-12">
      ${skillGroups.map((group, index) => `<article class="panel ${index < 3 ? "span-4" : "span-6"}" data-reveal style="--d:${index}">
        <h3>${escapeHtml(group.title)}</h3>
        <p>${escapeHtml(group.items)}</p>
      </article>`).join("")}
    </div>
  </section>`;
}

export function mount(root) {
  return mountSculpture(root.querySelector(".sculpture"));
}
