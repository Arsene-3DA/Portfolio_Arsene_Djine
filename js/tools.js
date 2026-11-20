import { toolNetwork } from "./data.js";

export function mountToolNetwork(root) {
  const host = root.querySelector("[data-tools]");
  if (!host) return () => {};
  const slot = host.querySelector("[data-tools-svg]");
  const button = root.querySelector(".motion-toggle");
  let cancelled = false;

  const onClick = () => {
    const paused = host.classList.toggle("paused");
    button.textContent = paused ? "Reprendre l’animation" : "Mettre l’animation en pause";
  };

  if (button) {
    button.hidden = false;
    button.addEventListener("click", onClick);
  }

  fetch(toolNetwork.file)
    .then((response) => {
      if (!response.ok) throw new Error(String(response.status));
      return response.text();
    })
    .then((svg) => {
      if (!cancelled) slot.innerHTML = svg;
    })
    .catch(() => {
      if (!cancelled) slot.innerHTML = `<p>${toolNetwork.description}</p>`;
    });

  return () => {
    cancelled = true;
    button?.removeEventListener("click", onClick);
  };
}
