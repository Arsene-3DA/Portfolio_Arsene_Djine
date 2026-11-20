import { reduceMotion } from "./motion.js";

const THREE_URL = "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

export function mountSculpture(host) {
  if (!host) return () => {};

  let dead = false;
  let renderer = null;
  let resizeObserver = null;
  let onMove = null;
  const disposables = [];

  const track = (item) => {
    disposables.push(item);
    return item;
  };

  const boot = async () => {
    if (dead || host.dataset.booted === "true") return;
    host.dataset.booted = "true";
    let THREE;
    try {
      THREE = await import(THREE_URL);
    } catch (error) {
      console.warn("Sculpture laissée en vue statique", error);
      return;
    }
    if (dead) return;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    host.append(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
    camera.position.set(4, 3.1, 5);
    camera.lookAt(0, 0, 0);
    const stack = new THREE.Group();
    scene.add(stack);

    for (let i = 0; i < 5; i += 1) {
      const plate = new THREE.Group();
      const shape = track(new THREE.BoxGeometry(2.25, 0.085, 2.25));
      const color = 0xc8a27a;
      const fill = track(new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.05, depthWrite: false }));
      const line = track(new THREE.LineBasicMaterial({ color }));
      plate.add(new THREE.Mesh(shape, fill));
      plate.add(new THREE.LineSegments(track(new THREE.EdgesGeometry(shape)), line));
      plate.position.y = (i - 2) * 0.44;
      plate.rotation.y = (i - 2) * 0.09;
      stack.add(plate);
    }

    const bead = track(new THREE.SphereGeometry(0.032, 12, 8));
    const metal = track(new THREE.MeshBasicMaterial({ color: 0xc8a27a }));
    const column = track(new THREE.LineBasicMaterial({ color: 0x8a8f94, transparent: true, opacity: 0.7 }));
    for (const x of [-0.72, 0.72]) {
      for (const z of [-0.72, 0.72]) {
        const path = track(new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(x, -0.88, z),
          new THREE.Vector3(x, 0.88, z)
        ]));
        stack.add(new THREE.Line(path, column));
        for (let i = -2; i <= 2; i += 1) {
          const node = new THREE.Mesh(bead, metal);
          node.position.set(x, i * 0.44, z);
          stack.add(node);
        }
      }
    }

    const draw = () => {
      if (dead || !renderer) return;
      renderer.render(scene, camera);
    };
    const resize = () => {
      if (dead || !host.clientWidth || !host.clientHeight) return;
      renderer.setSize(host.clientWidth, host.clientHeight, false);
      camera.aspect = host.clientWidth / host.clientHeight;
      camera.updateProjectionMatrix();
      draw();
    };
    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();
    host.classList.add("ready");

    let yaw = 0;
    let tilt = 0;
    let raf = 0;
    const spin = !reduceMotion();
    const tick = () => {
      if (dead || !spin) return;
      yaw += 0.0016;
      stack.rotation.y = yaw;
      stack.rotation.x = tilt;
      draw();
      raf = requestAnimationFrame(tick);
    };
    if (spin) raf = requestAnimationFrame(tick);
    onMove = (event) => {
      if (!spin || event.pointerType === "touch") return;
      const rect = host.getBoundingClientRect();
      tilt = ((event.clientY - rect.top) / rect.height - 0.5) * 0.12;
    };
    host.addEventListener("pointermove", onMove);
    renderer.domElement.addEventListener("webglcontextlost", () => host.classList.remove("ready"));
    host._stopSpin = () => cancelAnimationFrame(raf);
  };

  let seen = false;
  const visibility = new IntersectionObserver((entries) => {
    if (seen || !entries.some((entry) => entry.isIntersecting)) return;
    seen = true;
    visibility.disconnect();
    boot();
  }, { rootMargin: "200px" });
  visibility.observe(host);

  return () => {
    dead = true;
    visibility.disconnect();
    resizeObserver?.disconnect();
    if (onMove) host.removeEventListener("pointermove", onMove);
    host._stopSpin?.();
    renderer?.dispose();
    disposables.forEach((item) => item.dispose?.());
    renderer?.domElement.remove();
    host.classList.remove("ready");
    delete host.dataset.booted;
  };
}
