import { watchOffscreen } from "./motion.js";
import { toolNetwork } from "./data.js";

export function mountToolNetwork(root) {
  const host = root.querySelector("[data-tools]");
  if (!host) return () => {};
  const slot = host.querySelector("[data-tools-svg]");
  const button = root.querySelector(".motion-toggle");
  let stopWatch = () => {};
  let cancelled = false;

  const onClick = () => {
    const paused = host.classList.toggle("paused");
    button.textContent = paused ? "Reprendre l’animation" : "Mettre l’animation en pause";
    button.setAttribute("aria-pressed", String(paused));
  };

  if (button) {
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
      const drawing = slot.querySelector("svg");
      if (drawing) {
        drawing.querySelector("rect")?.setAttribute("fill", "#0B0D0F");
        drawing.querySelectorAll("rect[fill='#f1f4e9']").forEach((rect) => {
          rect.setAttribute("fill", "none");
          rect.setAttribute("stroke", "#C8A27A");
          rect.setAttribute("stroke-width", "0.6");
        });
        drawing.querySelectorAll(".core path").forEach((path) => {
          path.setAttribute("fill", "none");
          path.setAttribute("stroke", "#C8A27A");
        });
        drawing.querySelector("pattern circle")?.setAttribute("fill", "#8A8F94");
      }
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
