import confetti from "canvas-confetti";

const BRAND_COLORS = ["#f5a94e", "#5b8cff", "#eef1f7"];
// Above Cal.com's modal backdrop (appended later in the DOM, so it wins the tie).
const Z = 2147483647;

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Small pop at a screen position (defaults to center). */
export function burst(x?: number, y?: number) {
  if (reducedMotion()) return;
  confetti({
    particleCount: 36,
    spread: 65,
    startVelocity: 22,
    scalar: 0.8,
    ticks: 120,
    gravity: 0.9,
    colors: BRAND_COLORS,
    zIndex: Z,
    disableForReducedMotion: true,
    origin: {
      x: x !== undefined ? x / window.innerWidth : 0.5,
      y: y !== undefined ? y / window.innerHeight : 0.5,
    },
  });
}

/** The big one. Booking successes deserve fireworks. */
export function storm() {
  if (reducedMotion()) return;
  const end = Date.now() + 1400;
  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      startVelocity: 52,
      colors: BRAND_COLORS,
      zIndex: Z,
      disableForReducedMotion: true,
      origin: { x: 0, y: 0.75 },
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      startVelocity: 52,
      colors: BRAND_COLORS,
      zIndex: Z,
      disableForReducedMotion: true,
      origin: { x: 1, y: 0.75 },
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
  confetti({
    particleCount: 80,
    spread: 90,
    startVelocity: 32,
    colors: BRAND_COLORS,
    zIndex: Z,
    disableForReducedMotion: true,
    origin: { x: 0.5, y: 0.45 },
  });
}
