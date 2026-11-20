const VIEWS = new Set([
  "accueil",
  "services",
  "donnees",
  "projets",
  "projet",
  "cas",
  "a-propos",
  "contact"
]);

const LEGACY = {
  cas: "donnees",
  outils: "donnees",
  parcours: "a-propos",
  projets: "projets",
  contact: "contact",
  accueil: "accueil",
  services: "services",
  donnees: "donnees",
  "a-propos": "a-propos"
};

export function parseRoute(hash = location.hash) {
  if (hash === "#contenu") return { ignore: true };

  let path = "";
  try {
    path = decodeURIComponent(hash.replace(/^#/, ""));
  } catch {
    path = "";
  }

  if (path && !path.startsWith("/")) {
    const legacy = LEGACY[path];
    if (legacy) {
      const next = legacy === "accueil" ? "#/" : `#/${legacy}`;
      if (location.hash !== next) location.replace(next);
      return { ignore: true, redirect: true };
    }
  }

  path = path.replace(/^\/+|\/+$/g, "");
  if (path === "accueil") path = "";
  const parts = path.split("/").filter(Boolean);
  const head = parts[0] || "accueil";

  if (head === "projet" && parts[1]) return { view: "projet", slug: parts[1] };
  if (head === "cas" && parts[1]) return { view: "cas", slug: parts[1] };
  if (VIEWS.has(head) && parts.length === 1 && head !== "projet" && head !== "cas") {
    return { view: head };
  }
  if (!parts.length) return { view: "accueil" };
  return { view: "introuvable" };
}

export function navTarget(route) {
  if (route.view === "projet") return "projets";
  if (route.view === "cas") return "donnees";
  if (VIEWS.has(route.view)) return route.view;
  return "";
}

export function startRouter(onRoute) {
  let ready = false;
  const run = () => {
    const route = parseRoute();
    if (route.ignore) {
      if (!ready && !route.redirect) onRoute({ view: "accueil" });
      ready = true;
      return;
    }
    ready = true;
    onRoute(route);
  };
  window.addEventListener("hashchange", run);
  run();
}
