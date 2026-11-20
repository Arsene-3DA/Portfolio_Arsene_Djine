const reduceMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

export function observeReveal(root) {
  const nodes = [...root.querySelectorAll("[data-reveal]")];
  if (!nodes.length) return () => {};
  if (reduceMotion() || !("IntersectionObserver" in window)) {
    nodes.forEach((node) => node.classList.add("is-in"));
    return () => {};
  }
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("is-in");
      observer.unobserve(entry.target);
    }
  }, { threshold: 0, rootMargin: "0px 0px 8% 0px" });
  nodes.forEach((node) => { node.style.transition = "none"; });
  for (const node of nodes) {
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.98 && rect.bottom > 0) node.classList.add("is-in");
    else observer.observe(node);
  }
  requestAnimationFrame(() => {
    nodes.forEach((node) => { node.style.transition = ""; });
  });
  return () => observer.disconnect();
}

export function watchOffscreen(element, className = "is-offscreen") {
  if (!element || reduceMotion() || !("IntersectionObserver" in window)) return () => {};
  const observer = new IntersectionObserver((entries) => {
    element.classList.toggle(className, !entries.some((entry) => entry.isIntersecting));
  }, { threshold: 0 });
  observer.observe(element);
  return () => observer.disconnect();
}

export { reduceMotion };
