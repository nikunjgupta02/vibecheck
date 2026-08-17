// Converts numeric score + signals into a friendly vibe result

const VIBE_TIERS = [
  { min: 95, id: "electric", label: "Electric Chemistry", emoji: "⚡️", color: "from-pink-500 to-fuchsia-500", desc: "Sparks, fireworks, and really good playlists." },
  { min: 88, id: "magnetic", label: "Magnetic Pull", emoji: "💫", color: "from-rose-400 to-pink-500", desc: "Pulls toward each other — conversations are easy." },
  { min: 80, id: "cozy", label: "Cozy & Clicks", emoji: "☕", color: "from-amber-400 to-rose-300", desc: "Warm, comfortable, and very promising." },
  { min: 70, id: "curious", label: "Intrigued", emoji: "🧠", color: "from-sky-400 to-indigo-500", desc: "Curiosity unlocked — a story worth exploring." },
  { min: 0, id: "playful", label: "Playful Vibes", emoji: "🎈", color: "from-emerald-300 to-teal-400", desc: "Fun energy — let’s keep the good times coming." },
];

export function getVibeFromScore(score) {
  for (const tier of VIBE_TIERS) {
    if (score >= tier.min) return tier;
  }
  return VIBE_TIERS[VIBE_TIERS.length - 1];
}

export function getVibe({ score, likes = 0, quizAnswers = [], bioTags = [] } = {}) {
  const base = getVibeFromScore(score);
  let label = base.label;
  let desc = base.desc;
  if (likes >= 3) {
    label = `${label} — mutual sparks`;
    desc = desc + " There's mutual enthusiasm.";
  }
  if (bioTags.includes("music")) {
    desc = desc + " Also: music taste overlap detected.";
  }
  return {
    id: base.id,
    label,
    emoji: base.emoji,
    color: base.color,
    description: desc,
  };
}
