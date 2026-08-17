import PrimaryButton from "./PrimaryButton";
import { profile } from "../data/content";

export default function IntroScreen({ onStart }) {
  return (
    <div className="flex flex-col items-center text-center gap-5">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-fuchsia-500 flex items-center justify-center text-4xl shadow-lg shadow-pink-500/30">
        😏
      </div>
      <div>
        <h1 className="font-[var(--font-display)] text-2xl font-semibold text-neutral-900">
          Think you're compatible with {profile.name}?
        </h1>
        <p className="text-pink-500 text-xs font-medium mt-1">{profile.tagline}</p>
        <p className="text-neutral-500 mt-2 text-sm leading-relaxed">
          Swipe through a few facts, answer a short quiz, and find out your
          Vibe Check™ score. Takes about 60 seconds. Results are 100%
          scientific.*
        </p>
      </div>
      <PrimaryButton onClick={onStart}>Start the Vibe Check →</PrimaryButton>
      <p className="text-[11px] text-neutral-400">*not scientific at all</p>
    </div>
  );
}
