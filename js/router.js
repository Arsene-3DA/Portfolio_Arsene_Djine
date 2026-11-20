const VIEWS = new Set(["accueil", "cas", "projets", "projet", "outils", "parcours", "contact"]);

const LEGACY = {
  cas: "cas",
  outils: "outils",
  parcours: "parcours",
  projets: "projets",
  contact: "contact",
  accueil: "accueil"
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
      const next = `#/${legacy}`;
      if (location.hash !== next) location.replace(next);
      return { ignore: true, redirect: true };
    }
  }

  path = path.replace(/^\/+|\/+$/g, "");
  const parts = path.split("/").filter(Boolean);
  const head = parts[0] || "";

  if (!parts.length) return { view: "cas" };
  if (head === "cas" && parts.length <= 2) return { view: "cas", slug: parts[1] || "" };
  if (head === "projet" && parts.length === 2) return { view: "projet", slug: parts[1] };
  if (VIEWS.has(head) && parts.length === 1 && head !== "projet") return { view: head };
  return { view: "introuvable" };
}

export function navTarget(route) {
  if (route.view === "projet") return "projets";
  if (VIEWS.has(route.view)) return route.view;
  return "";
}

export function startRouter(onRoute) {
  let ready = false;
  const run = () => {
    const route = parseRoute();
    if (route.ignore) {
      if (!ready && !route.redirect) onRoute({ view: "cas" });
      ready = true;
      return;
    }
    ready = true;
    onRoute(route);
  };
  window.addEventListener("hashchange", run);
  run();
}
