import { useEffect } from "react";
import { motion } from "framer-motion";
import { profile } from "../data/content";
import { bigCelebration } from "../lib/confetti";

export default function FinalApproved({ name, score, date, time, food }) {
  useEffect(() => {
    bigCelebration();
  }, []);

  const prettyDate = date
    ? new Date(date + "T00:00:00").toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="flex flex-col items-center text-center gap-5">
      <motion.div
        initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 14 }}
        className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-4xl shadow-lg shadow-emerald-500/30"
      >
        ✅
      </motion.div>
      <div>
        <h2 className="font-[var(--font-display)] text-2xl font-semibold text-neutral-900">
          Application approved!
        </h2>
        <p className="text-neutral-500 text-sm mt-1">
          {name}, it's official. {profile.name} owes you dinner.
        </p>
      </div>

      <div className="w-full rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/60 p-4 text-left space-y-1.5">
        <p className="text-[11px] uppercase tracking-wide font-semibold text-emerald-600 mb-1">
          Date Confirmation
        </p>
        <Row label="Match score" value={`${score}%`} />
        <Row label="With" value={profile.name} />
        {prettyDate && <Row label="When" value={`${prettyDate}, ${time}`} />}
        {food && <Row label="Eating" value={food} />}
      </div>

      <div className="w-full rounded-2xl bg-neutral-900 p-4 text-left">
        <p className="text-[11px] uppercase tracking-wide font-semibold text-pink-300 mb-2">
          Reach {profile.name}
        </p>
        {profile.socials.instagram && (
          <p className="text-sm text-white">{profile.socials.instagram}</p>
        )}
        {profile.socials.number && (
          <p className="text-sm text-white/80">{profile.socials.number}</p>
        )}
      </div>

      <p className="text-xs text-neutral-400">
        Screenshot this and send it back. Yes, that's the whole plan.
      </p>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-neutral-500">{label}</span>
      <span className="font-medium text-neutral-800">{value}</span>
    </div>
  );
}
