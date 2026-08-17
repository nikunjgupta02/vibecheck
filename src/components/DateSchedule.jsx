import { useState } from "react";
import PrimaryButton from "./PrimaryButton";

const TIMES = [
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
  "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM",
];

export default function DateSchedule({ onNext }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-[var(--font-display)] text-xl font-semibold text-neutral-900">
          So... when are you free? 📅
        </h2>
        <p className="text-neutral-500 text-sm mt-1">Pick a day and time that works.</p>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
          Pick a day
        </span>
        <input
          type="date"
          min={today}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-neutral-900 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
          Pick a time
        </span>
        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-neutral-900 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition bg-white"
        >
          <option value="">Select a time...</option>
          {TIMES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </label>

      <PrimaryButton disabled={!date || !time} onClick={() => onNext({ date, time })}>
        Lock it in →
      </PrimaryButton>
    </div>
  );
}
