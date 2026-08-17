import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { quizQuestions } from "../data/content";
import Riddle from "./Riddle";

export default function Quiz({ onNext }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showRiddle, setShowRiddle] = useState(false);

  const q = quizQuestions[index];
  const isLast = index === quizQuestions.length - 1;

  function choose(value) {
    const nextScore = score + value;
    if (isLast) {
      setScore(nextScore);
      setShowRiddle(true);
    } else {
      setScore(nextScore);
      setIndex((i) => i + 1);
    }
  }

  function handleRiddleSolved(bonus) {
    setShowRiddle(false);
    onNext({ quizScore: score + bonus, riddleBonus: bonus });
  }

  function handleRiddleSkip() {
    setShowRiddle(false);
    onNext({ quizScore: score, riddleBonus: 0 });
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="font-[var(--font-display)] text-xl font-semibold text-neutral-900">
          Compatibility quiz
        </h2>
        <p className="text-neutral-500 text-sm mt-1">
          Question {index + 1} of {quizQuestions.length}
        </p>
        <div className="w-full h-1.5 bg-neutral-100 rounded-full mt-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-400 to-fuchsia-500"
            initial={false}
            animate={{ width: `${((index + 1) / quizQuestions.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!showRiddle ? (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-3"
          >
            <h3 className="font-medium text-neutral-800">{q.question}</h3>
            {q.options.map((opt) => (
              <button
                key={opt.label}
                onClick={() => choose(opt.value)}
                className="text-left rounded-2xl border border-neutral-200 px-4 py-3 text-sm text-neutral-700 hover:border-pink-300 hover:bg-pink-50 transition"
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="riddle"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-2"
          >
            <Riddle onSolved={handleRiddleSolved} onSkip={handleRiddleSkip} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
