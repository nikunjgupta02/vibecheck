// ============================================================
// EDIT THIS FILE to personalize Vibe Check™ with your real info.
// Nothing else in the app needs to change — every screen reads
// from here.
// ============================================================

export const profile = {
  name: "Nikunj",
  tagline: "Engineer. Elite playlist. Selectively social.",
  city: "Indore",
  age: 24,
  // Shown on the final "approved" screen so she can actually reach you.
  socials: {
    instagram: "@nikunjguptaa",
    number: "+91 97529 71809",
  },
};

// Swipeable bio cards — keep these short and punchy, one fact per card.
// "tag" controls the little pill shown in the corner of the card.
export const bioCards = [
  { tag: "job", emoji: "💻", title: "What I do", text: "Engineer by degree, professional vibe-curator by nature. I can talk to anyone — getting picked by me is the hard part 😏" },
  { tag: "music", emoji: "🎧", title: "Music taste", text: "The Weeknd, techno, full-blown party EDM, and unapologetic Bollywood love songs — sometimes in the same hour." },
  { tag: "hobby", emoji: "🏋️", title: "Weekends", text: "Gym, drinks, out with friends — but also very good at doing absolutely nothing on a couch with a good movie." },
  { tag: "social skill", emoji: "🎲", title: "My superpower", text: "I meet the poorest like the poorest and the richest like the richest — same energy either way. I don't change, the room just does." },
  { tag: "green flag", emoji: "🟢", title: "Green flag", text: "Down to earth with literally everyone. Where you're from or what you have doesn't change how I treat you." },
  { tag: "red flag", emoji: "🚩", title: "Red flag (self-aware)", text: "Genuinely uncomfortable in big crowds. Will be quietly plotting the exit strategy within 10 minutes of any party." },
  { tag: "hot take", emoji: "🔥", title: "Hot take", text: "Your sense of humor decides how funny — and how smart — I seem. Bring jokes, I'll bring better ones." },
];

// Compatibility quiz — "value" doesn't need to mean anything, it's just
// used to compute a fun (always high) match percentage at the end.
export const quizQuestions = [
  {
    question: "Pick a Friday night",
    options: [
      { label: "Cozy night in, movie + takeout", value: 3 },
      { label: "Out with friends, chaos guaranteed", value: 2 },
      { label: "Trying a new restaurant", value: 3 },
      { label: "Asleep by 10, no shame", value: 1 },
    ],
  },
  {
    question: "Your love language is...",
    options: [
      { label: "Words of affirmation", value: 2 },
      { label: "Quality time", value: 3 },
      { label: "Acts of service", value: 3 },
      { label: "Physical touch", value: 2 },
    ],
  },
  {
    question: "Pick a red flag you'd actually tolerate",
    options: [
      { label: "Talks to their food before eating it", value: 2 },
      { label: "Has 47 browser tabs open, always", value: 3 },
      { label: "Overly competitive at board games", value: 2 },
      { label: "Texts in full paragraphs", value: 3 },
    ],
  },
  {
    question: "Ideal first date?",
    options: [
      { label: "Coffee, low pressure", value: 2 },
      { label: "Something a little chaotic (go-karts?)", value: 3 },
      { label: "Dinner, let's be real about this", value: 3 },
      { label: "Long walk, longer conversation", value: 3 },
    ],
  },
  {
    question: "Your sense of humor is best described as...",
    options: [
      { label: "Dry and a little unhinged", value: 3 },
      { label: "Wholesome dad jokes", value: 2 },
      { label: "Chronically online", value: 3 },
      { label: "I don't laugh, I smile internally", value: 1 },
    ],
  },
];

// Food / vibe options for the date-planning step.
export const foodOptions = [
  { emoji: "🍕", label: "Pizza" },
  { emoji: "🍣", label: "Sushi" },
  { emoji: "🍔", label: "Burgers" },
  { emoji: "🍝", label: "Pasta" },
  { emoji: "🌮", label: "Tacos" },
  { emoji: "🍜", label: "Ramen" },
];

// Copy for the various loading / review screens — edit for your own humor.
export const loadingLines = [
  "Calculating compatibility...",
  "Cross-referencing vibes...",
  "Checking playlist overlap...",
  "Running a background check (kidding)...",
  "Consulting the group chat...",
  "Finalizing results...",
];

export const applicationReviewLines = [
  "Submitting your application...",
  "Verifying date logistics...",
  "Confirming restaurant reservations exist in theory...",
  "Notifying my mother...",
  "Application under review...",
];
