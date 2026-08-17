import { useState } from "react";
import PrimaryButton from "./PrimaryButton";

export default function NameCapture({ onNext }) {
  const [name, setName] = useState("");

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-[var(--font-display)] text-xl font-semibold text-neutral-900">
          First things first
        </h2>
        <p className="text-neutral-500 text-sm mt-1">
          Who am I about to (hopefully) impress?
        </p>
      </div>
      <input
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && name.trim()) onNext(name.trim());
        }}
        placeholder="Your name"
        className="w-full rounded-2xl border border-neutral-200 px-4 py-3.5 text-base text-neutral-900 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition"
      />
      <PrimaryButton disabled={!name.trim()} onClick={() => onNext(name.trim())}>
        Continue
      </PrimaryButton>
    </div>
  );
}
