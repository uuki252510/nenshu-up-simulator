"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

const COLORS = ["#d9ad4b", "#ecc878", "#13294b", "#2c4d77", "#ffffff"];

export default function Confetti() {
  useEffect(() => {
    const timers = [
      setTimeout(() => {
        confetti({
          particleCount: 90,
          spread: 75,
          startVelocity: 42,
          origin: { x: 0.5, y: 0.35 },
          colors: COLORS,
          disableForReducedMotion: true,
        });
      }, 150),
      setTimeout(() => {
        confetti({
          particleCount: 40,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: COLORS,
          disableForReducedMotion: true,
        });
        confetti({
          particleCount: 40,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: COLORS,
          disableForReducedMotion: true,
        });
      }, 500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return null;
}
