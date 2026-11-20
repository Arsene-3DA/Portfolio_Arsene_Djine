import { reduceMotion, watchOffscreen } from "./motion.js";
import { toolNetwork } from "./data.js";

export function mountToolNetwork(root) {
  const host = root.querySelector("[data-tools]");
  if (!host) return () => {};
  const slot = host.querySelector("[data-tools-svg]");
  const button = host.querySelector(".motion-toggle");
  let stopWatch = () => {};
  let cancelled = false;

  const onClick = () => {
    const paused = host.classList.toggle("paused");
    button.textContent = paused ? "Reprendre l’animation" : "Mettre l’animation en pause";
    button.setAttribute("aria-pressed", String(paused));
  };

  if (button && !reduceMotion()) {
    button.hidden = false;
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", onClick);
  }

  fetch(toolNetwork.file)
    .then((response) => {
      if (!response.ok) throw new Error(String(response.status));
      return response.text();
    })
    .then((svg) => {
      if (cancelled) return;
      slot.innerHTML = svg;
      stopWatch = watchOffscreen(host);
    })
    .catch(() => {
      if (cancelled) return;
      slot.innerHTML = `<p class="tool-fallback">${toolNetwork.description}</p>`;
    });

  return () => {
    cancelled = true;
    stopWatch();
    button?.removeEventListener("click", onClick);
  };
}
