// Compatibility computation utilities
// Centralizes scoring logic so components and tests can reuse it.

export function computeMatchScore({ likes = 0, quizScore = 0, riddleBonus = 0 }, options = {}) {
  const maxQuizScore = options.maxQuizScore ?? 15; // default: 5 q * 3 pts
  const quizPct = Math.min(1, quizScore / maxQuizScore);
  // base value chosen so results are playfully high but variable
  const base = options.base ?? 82;
  const raw = base + Math.round(quizPct * 13) + Math.min(4, likes) + Math.max(0, riddleBonus);
  // clamp to 0-99 for UX reasons (99 looks better than 100)
  const clamped = Math.max(0, Math.min(99, raw));
  return clamped;
}

export function scoreToPercentage(score) {
  // ensure integer percent
  return Math.round(score);
}

export function formatCertificate({ personA, personB, score, date = new Date() }) {
  return {
    title: "Certificate of Compatibility",
    subtitle: `${personA} + ${personB}`,
    score: `${score}%`,
    date: new Date(date).toLocaleDateString(),
    text: `This certifies that ${personA} and ${personB} scored ${score}% compatible on ${new Date(date).toLocaleDateString()}.`,
  };
}
