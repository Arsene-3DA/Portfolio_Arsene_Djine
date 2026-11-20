import { views } from "./views/index.js";
import { navTarget, startRouter } from "./router.js";
import { pageMeta } from "./data.js";
import { observeReveal, reduceMotion } from "./motion.js";

const main = document.querySelector("#contenu");
const header = document.querySelector(".site-header");
const nav = document.querySelector("#nav-principale");
const toggle = document.querySelector(".nav-toggle");
const toggleLabel = toggle.querySelector(".visually-hidden");
const description = document.querySelector('meta[name="description"]');

let cleanup = () => {};
let first = true;

function setMenu(open) {
  nav.classList.toggle("is-open", open);
  header.classList.toggle("menu-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggleLabel.textContent = open ? "Fermer le menu" : "Ouvrir le menu";
  document.body.classList.toggle("nav-lock", open);
}

function closeMenu(options = {}) {
  const wasOpen = nav.classList.contains("is-open");
  setMenu(false);
  if (wasOpen && options.focusToggle) toggle.focus();
}

function setNav(id) {
  for (const link of document.querySelectorAll("[data-nav]")) {
    if (id && link.dataset.nav === id) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  }
}

function draw(route) {
  cleanup();
  cleanup = () => {};
  const view = views[route.view] || views.introuvable;
  if (!first && !reduceMotion()) main.classList.add("is-swap");
  main.innerHTML = view.render(route);
  main.dataset.view = route.view;
  const meta = pageMeta(route);
  document.title = meta.title;
  if (description) description.setAttribute("content", meta.description);
  setNav(navTarget(route));
  const stopReveal = observeReveal(main);
  const stopView = view.mount ? (view.mount(main, route) || (() => {})) : (() => {});
  cleanup = () => {
    stopReveal();
    stopView();
  };
  closeMenu();
  if (!first) {
    main.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }
  first = false;
  requestAnimationFrame(() => main.classList.remove("is-swap"));
}

toggle.addEventListener("click", () => {
  const open = !nav.classList.contains("is-open");
  setMenu(open);
  if (open) nav.querySelector("a")?.focus();
});

nav.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nav.classList.contains("is-open")) closeMenu({ focusToggle: true });
});

matchMedia("(min-width: 960px)").addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});

document.querySelector(".skip").addEventListener("click", (event) => {
  event.preventDefault();
  main.focus();
});

const year = document.querySelector("#footer-year");
if (year) year.textContent = String(new Date().getFullYear());

startRouter(draw);
