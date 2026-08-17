import { motion, AnimatePresence } from "framer-motion";

export default function Shell({ children, stageKey, footer }) {
  return (
    <div className="min-h-svh w-full flex flex-col items-center justify-center px-4 py-8 bg-[radial-gradient(circle_at_20%_0%,#3a1a4a_0%,#170f26_45%,#0f0a1a_100%)] relative overflow-hidden">
      <BackgroundBlobs />
      <div className="w-full max-w-md flex flex-col items-center gap-4 relative z-10">
        <Header />
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={stageKey}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-full rounded-3xl bg-white/95 backdrop-blur shadow-[0_20px_60px_-15px_rgba(255,93,162,0.35)] p-6 sm:p-8"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
        {footer}
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="flex items-center gap-2 select-none">
      <span className="text-2xl">💗</span>
      <span className="font-[var(--font-display)] font-semibold text-white text-lg tracking-tight">
        Vibe Check<span className="text-pink-400">™</span>
      </span>
    </div>
  );
}

function BackgroundBlobs() {
  return (
    <>
      <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-fuchsia-500/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-pink-500/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 right-0 w-56 h-56 rounded-full bg-purple-500/20 blur-3xl" />
    </>
  );
}
