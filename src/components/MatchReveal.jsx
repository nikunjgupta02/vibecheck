import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import PrimaryButton from "./PrimaryButton";
import { profile } from "../data/content";
import { burst } from "../lib/confetti";

export default function MatchReveal({ name, score, onNext }) {
  const [display, setDisplay] = useState(0);
  const fired = useRef(false);

  useEffect(() => {
    const start = performance.now();
    const durationMs = 1400;
    function tick(now) {
      const p = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * score));
      if (p < 1) requestAnimationFrame(tick);
      else if (!fired.current) {
        fired.current = true;
        burst();
      }
    }
    requestAnimationFrame(tick);
  }, [score]);

  return (
    <div className="flex flex-col items-center text-center gap-5">
      <span className="text-[11px] uppercase tracking-widest font-semibold text-pink-500">
        Vibe Check™ Results
      </span>
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
        className="relative w-40 h-40 rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-500 flex items-center justify-center shadow-xl shadow-pink-500/30"
      >
        <span className="font-[var(--font-display)] text-4xl font-bold text-white">
          {display}%
        </span>
      </motion.div>
      <div>
        <h2 className="font-[var(--font-display)] text-xl font-semibold text-neutral-900">
          {name} + {profile.name} = a match 💫
        </h2>
        <p className="text-neutral-500 text-sm mt-1 max-w-xs mx-auto">
          Certified compatible by an algorithm I made up ten minutes ago.
        </p>
      </div>

      <div className="w-full rounded-2xl border border-dashed border-pink-200 bg-pink-50/60 p-4 text-left">
        <p className="text-[11px] uppercase tracking-wide font-semibold text-pink-500 mb-1">
          Certificate of Compatibility
        </p>
        <p className="text-sm text-neutral-700">
          This certifies that <span className="font-semibold">{name}</span> and{" "}
          <span className="font-semibold">{profile.name}</span> scored{" "}
          <span className="font-semibold">{score}%</span> compatible on{" "}
          {new Date().toLocaleDateString()}. Screenshot this, you earned it.
        </p>
      </div>

      <PrimaryButton onClick={onNext}>So... are we doing this? →</PrimaryButton>
    </div>
  );
}
