import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ lines, duration = 2600, onDone, title = "Hang tight" }) {
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const stepTime = duration / lines.length;
    const interval = setInterval(() => {
      setLineIndex((i) => Math.min(i + 1, lines.length - 1));
    }, stepTime);
    const timeout = setTimeout(() => onDone?.(), duration);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center text-center gap-6 py-6">
      <h2 className="font-[var(--font-display)] text-lg font-semibold text-neutral-900">
        {title}
      </h2>
      <Spinner />
      <AnimatePresence mode="wait">
        <motion.p
          key={lineIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="text-sm text-neutral-500"
        >
          {lines[lineIndex]}
        </motion.p>
      </AnimatePresence>
      <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-400 to-fuchsia-500"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: duration / 1000, ease: "linear" }}
        />
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      className="w-12 h-12 rounded-full border-4 border-pink-100 border-t-pink-500"
    />
  );
}
