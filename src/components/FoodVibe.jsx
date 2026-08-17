import { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { foodOptions } from "../data/content";

export default function FoodVibe({ onNext }) {
  const [picked, setPicked] = useState(null);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-[var(--font-display)] text-xl font-semibold text-neutral-900">
          What are we feeling? 🍽️
        </h2>
        <p className="text-neutral-500 text-sm mt-1">pick your vibe</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {foodOptions.map((food) => (
          <button
            key={food.label}
            onClick={() => setPicked(food.label)}
            className={
              "rounded-2xl border py-4 flex flex-col items-center gap-1.5 transition " +
              (picked === food.label
                ? "border-pink-400 bg-pink-50 ring-2 ring-pink-200"
                : "border-neutral-200 hover:border-pink-200")
            }
          >
            <span className="text-2xl">{food.emoji}</span>
            <span className="text-xs font-medium text-neutral-700">{food.label}</span>
          </button>
        ))}
      </div>

      <PrimaryButton disabled={!picked} onClick={() => onNext({ food: picked })}>
        Confirm the date →
      </PrimaryButton>
    </div>
  );
}
