import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PrimaryButton from "./PrimaryButton";
import { burst } from "../lib/confetti";
import { getRiddle, checkRiddleAnswer } from "../lib/truthAnswers";

/**
 * Props:
 * - onSolved(bonus)
 * - onSkip()
 */
export default function Riddle({ onSolved, onSkip }) {
  const r = getRiddle(); // default riddle
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timer, setTimer] = useState(10); // auto-skip after 10s
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setTimer((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (timer === 0 && !locked) onSkip();
  }, [timer, locked, onSkip]);

  function submit() {
    if (locked) return;
    setLocked(true);
    if (checkRiddleAnswer(answer, r.id)) {
      burst(); // small confetti
      setFeedback("Smart cookie! +2 bonus points and a confetti bow.");
      setTimeout(() => onSolved(2), 500);
    } else {
      setFeedback("Close... try again or tap Hint.");
      setLocked(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-2xl bg-white shadow-md border"
      role="dialog"
      aria-labelledby="riddle-title"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 id="riddle-title" className="font-semibold text-lg">
            Quick detour — tiny brainteaser
          </h3>
          <p className="text-sm text-neutral-600 mt-1">{r.question}</p>
        </div>
        <div className="text-xs text-neutral-400">Skip in {timer}s</div>
      </div>

      <div className="mt-3 flex gap-2">
        <input
          className="flex-1 rounded-lg border px-3 py-2"
          placeholder="Type your answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          aria-label="Riddle answer"
          autoFocus
        />
        <PrimaryButton onClick={submit} disabled={locked}>
          Try
        </PrimaryButton>
      </div>

      <div className="mt-2 flex items-center justify-between text-sm">
        <button
          className="text-pink-500 underline"
          onClick={() => setFeedback(r.hint)}
        >
          Hint
        </button>
        <button className="text-neutral-400" onClick={onSkip}>
          Skip
        </button>
      </div>

      {feedback && <p className="mt-2 text-sm text-neutral-700">{feedback}</p>}
    </motion.div>
  );
}
