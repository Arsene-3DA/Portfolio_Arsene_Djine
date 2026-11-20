import { views } from "./views/index.js";
import { navTarget, startRouter } from "./router.js";
import { pageMeta } from "./data.js";
import { observeReveal, reduceMotion } from "./motion.js";

const main = document.querySelector("#contenu");
const description = document.querySelector('meta[name="description"]');
let cleanup = () => {};
let first = true;

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
  const meta = pageMeta(route);
  document.title = meta.title;
  if (description) description.setAttribute("content", meta.description);
  setNav(navTarget(route));
  const footer = document.querySelector("footer");
  if (footer) footer.hidden = route.view === "contact";
  const stopReveal = observeReveal(main);
  const stopView = view.mount ? (view.mount(main, route) || (() => {})) : (() => {});
  cleanup = () => {
    stopReveal();
    stopView();
  };
  if (!first) {
    main.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }
  first = false;
  requestAnimationFrame(() => main.classList.remove("is-swap"));
}

document.querySelector(".skip")?.addEventListener("click", (event) => {
  event.preventDefault();
  main.focus();
});

startRouter(draw);
