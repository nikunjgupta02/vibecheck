// Riddle and truth utilities (case-insensitive checking, hints)

const RIDDLES = [
  {
    id: "echo",
    question: "I speak without a mouth and hear without ears. What am I?",
    answer: "echo",
    hint: "It repeats what you say.",
  },
  {
    id: "clock",
    question: "What has hands but cannot clap?",
    answer: "clock",
    hint: "It tells time.",
  },
];

export function getRiddle(id = "echo") {
  const r = RIDDLES.find((x) => x.id === id) || RIDDLES[0];
  return { question: r.question, hint: r.hint, id: r.id };
}

export function normalizeAnswer(s) {
  return (s || "").trim().toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function checkRiddleAnswer(answer, id = "echo") {
  const r = RIDDLES.find((x) => x.id === id) || RIDDLES[0];
  return normalizeAnswer(answer) === normalizeAnswer(r.answer);
}

const TRUTHS = [
  "What's a small habit you're secretly proud of?",
  "Tell me one thing that always makes you smile.",
];

export function getRandomTruth() {
  return TRUTHS[Math.floor(Math.random() * TRUTHS.length)];
}
