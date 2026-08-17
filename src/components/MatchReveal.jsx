import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import PrimaryButton from "./PrimaryButton";
import { profile, creator } from "../data/content";
import { burst } from "../lib/confetti";
import { getVibe } from "../lib/vibeMatcher";

export default function MatchReveal({ name, score, onNext }) {
  const [display, setDisplay] = useState(0);
  const [showCreator, setShowCreator] = useState(false);
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

  const vibe = getVibe({ score });

  return (
    <div className="flex flex-col items-center text-center gap-5">
      <span className="text-[11px] uppercase tracking-widest font-semibold text-pink-500">
        Vibe Check™ Results
      </span>

      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
        className="relative w-40 h-40 rounded-full flex items-center justify-center shadow-xl"
        style={{ background: "linear-gradient(135deg, rgba(255,160,180,1) 0%, rgba(200,100,200,1) 100%)" }}
      >
        <span className="font-[var(--font-display)] text-4xl font-bold text-white">
          {display}%
        </span>
      </motion.div>

      <div>
        <h2 className="font-[var(--font-display)] text-xl font-semibold text-neutral-900">
          {name} + {profile.name} = a match {vibe.emoji}
        </h2>
        <p className="text-neutral-500 text-sm mt-1 max-w-xs mx-auto">{vibe.description}</p>
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

      <PrimaryButton onClick={onNext} aria-label="Proceed to date setup">
        So... are we doing this? →
      </PrimaryButton>

      <button
        className="text-xs mt-2 text-neutral-400 underline"
        onClick={() => setShowCreator((s) => !s)}
        aria-expanded={showCreator}
      >
        {showCreator ? creator.oneLiner : `Made with ♥ by ${creator.signature}`}
      </button>

      {showCreator && (
        <p className="text-sm text-neutral-500 mt-1 text-center max-w-xs">
          {creator.spotlight}
        </p>
      )}
    </div>
  );
}
