import { useRef, useState } from "react";
import { motion } from "framer-motion";
import PrimaryButton from "./PrimaryButton";
import { profile } from "../data/content";

const TAUNTS = [
  "nice try 😌",
  "not happening",
  "you can't catch this",
  "keep trying though",
  "getting closer... jk",
  "this button has trust issues",
];

export default function DateAsk({ name, onYes }) {
  const containerRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dodges, setDodges] = useState(0);
  const [taunt, setTaunt] = useState("");

  function dodge() {
    const el = containerRef.current;
    if (!el) return;
    const bounds = el.getBoundingClientRect();
    const maxX = Math.max(0, bounds.width - 110);
    const maxY = Math.max(0, bounds.height - 46);
    const x = Math.random() * maxX - maxX / 2;
    const y = Math.random() * maxY - maxY / 2;
    setPos({ x, y });
    setDodges((d) => d + 1);
    setTaunt(TAUNTS[Math.floor(Math.random() * TAUNTS.length)]);
  }

  return (
    <div className="flex flex-col items-center text-center gap-5">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-fuchsia-500 flex items-center justify-center text-3xl shadow-lg shadow-pink-500/30">
        🥺
      </div>
      <div>
        <h2 className="font-[var(--font-display)] text-xl font-semibold text-neutral-900">
          Alright {name}, moment of truth
        </h2>
        <p className="text-neutral-500 text-sm mt-1">
          Will you go on a date with {profile.name}?
        </p>
      </div>

      <div ref={containerRef} className="relative w-full h-40">
        <div className="absolute inset-0 flex items-center justify-center">
          <PrimaryButton onClick={onYes} className="max-w-[180px]">
            Yes 💕
          </PrimaryButton>
        </div>
        <motion.button
          animate={{ x: pos.x, y: pos.y }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          onMouseEnter={dodge}
          onClick={dodge}
          onTouchStart={dodge}
          className="absolute top-0 right-0 rounded-2xl border border-neutral-200 px-5 py-3 text-neutral-500 font-medium bg-white"
        >
          No
        </motion.button>
      </div>

      {dodges > 0 && (
        <motion.p
          key={taunt}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-pink-400 font-medium -mt-2"
        >
          {taunt}
        </motion.p>
      )}
    </div>
  );
}
