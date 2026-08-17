import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PrimaryButton from "./PrimaryButton";
import { bioCards } from "../data/content";

export default function BioCards({ onNext }) {
  const [index, setIndex] = useState(0);
  const [likes, setLikes] = useState(0);
  const [dir, setDir] = useState(1);

  const card = bioCards[index];
  const isLast = index === bioCards.length - 1;

  function advance(liked) {
    setDir(liked ? 1 : -1);
    const nextLikes = liked ? likes + 1 : likes;
    if (isLast) {
      onNext({ likes: nextLikes });
    } else {
      setLikes(nextLikes);
      setIndex((i) => i + 1);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="font-[var(--font-display)] text-xl font-semibold text-neutral-900">
          Get to know me
        </h2>
        <p className="text-neutral-500 text-sm mt-1">
          Card {index + 1} of {bioCards.length}
        </p>
      </div>

      <div className="relative h-56">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={(_, info) => {
              if (info.offset.x > 80) advance(true);
              else if (info.offset.x < -80) advance(false);
            }}
            initial={{ opacity: 0, x: dir * 60, rotate: dir * 4 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: -dir * 120, rotate: -dir * 8 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-fuchsia-50 to-pink-50 border border-pink-100 p-6 flex flex-col justify-center items-center text-center cursor-grab active:cursor-grabbing shadow-sm"
          >
            <span className="text-4xl mb-3">{card.emoji}</span>
            <span className="text-[11px] uppercase tracking-wide font-semibold text-pink-500 mb-1">
              {card.tag}
            </span>
            <h3 className="font-semibold text-neutral-900 mb-1">{card.title}</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">{card.text}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => advance(false)}
          className="flex-1 rounded-2xl border border-neutral-200 py-3 text-neutral-500 font-medium hover:bg-neutral-50 transition"
        >
          Meh 🙄
        </button>
        <button
          onClick={() => advance(true)}
          className="flex-1 rounded-2xl border border-pink-200 bg-pink-50 py-3 text-pink-600 font-medium hover:bg-pink-100 transition"
        >
          Cute 🥰
        </button>
      </div>
      <p className="text-center text-[11px] text-neutral-400">
        Tip: you can also swipe the card
      </p>
    </div>
  );
}
