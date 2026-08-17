import confetti from "canvas-confetti";

const colors = ["#ff5da2", "#ff8fc7", "#ffd166", "#c084fc", "#7dd3fc"];

export function burst() {
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 },
    colors,
    scalar: 1.1,
  });
}

export function bigCelebration() {
  const duration = 2200;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 65,
      origin: { x: 0, y: 0.7 },
      colors,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 65,
      origin: { x: 1, y: 0.7 },
      colors,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();

  setTimeout(() => {
    confetti({
      particleCount: 160,
      spread: 100,
      origin: { y: 0.5 },
      colors,
      scalar: 1.2,
    });
  }, 300);
}
