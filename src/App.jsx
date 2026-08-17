import { useState } from "react";
import Shell from "./components/Shell";
import IntroScreen from "./components/IntroScreen";
import NameCapture from "./components/NameCapture";
import BioCards from "./components/BioCards";
import Quiz from "./components/Quiz";
import LoadingScreen from "./components/LoadingScreen";
import MatchReveal from "./components/MatchReveal";
import DateAsk from "./components/DateAsk";
import DateSchedule from "./components/DateSchedule";
import FoodVibe from "./components/FoodVibe";
import FinalApproved from "./components/FinalApproved";
import { loadingLines, applicationReviewLines } from "./data/content";

const STAGES = [
  "intro",
  "name",
  "bioCards",
  "quiz",
  "compatLoading",
  "matchReveal",
  "dateAsk",
  "dateSchedule",
  "foodVibe",
  "reviewLoading",
  "approved",
];

// Turns raw quiz/bio-card signals into a fun, always-high match score.
function computeScore({ likes = 0, quizScore = 0 }) {
  const maxQuizScore = 15; // 5 questions x max 3 pts
  const quizPct = Math.min(1, quizScore / maxQuizScore);
  const raw = 82 + Math.round(quizPct * 13) + Math.min(4, likes);
  return Math.min(99, raw);
}

export default function App() {
  const [stageIndex, setStageIndex] = useState(0);
  const [answers, setAnswers] = useState({
    name: "",
    likes: 0,
    quizScore: 0,
    date: "",
    time: "",
    food: "",
  });

  const stage = STAGES[stageIndex];

  function goNext(patch = {}) {
    setAnswers((a) => ({ ...a, ...patch }));
    setStageIndex((i) => Math.min(i + 1, STAGES.length - 1));
  }

  const score = computeScore(answers);

  return (
    <Shell stageKey={stage}>
      {stage === "intro" && <IntroScreen onStart={() => goNext()} />}

      {stage === "name" && <NameCapture onNext={(name) => goNext({ name })} />}

      {stage === "bioCards" && (
        <BioCards onNext={({ likes }) => goNext({ likes })} />
      )}

      {stage === "quiz" && (
        <Quiz onNext={({ quizScore }) => goNext({ quizScore })} />
      )}

      {stage === "compatLoading" && (
        <LoadingScreen
          title="Running the numbers"
          lines={loadingLines}
          duration={2400}
          onDone={() => goNext()}
        />
      )}

      {stage === "matchReveal" && (
        <MatchReveal name={answers.name} score={score} onNext={() => goNext()} />
      )}

      {stage === "dateAsk" && (
        <DateAsk name={answers.name} onYes={() => goNext()} />
      )}

      {stage === "dateSchedule" && (
        <DateSchedule onNext={({ date, time }) => goNext({ date, time })} />
      )}

      {stage === "foodVibe" && (
        <FoodVibe onNext={({ food }) => goNext({ food })} />
      )}

      {stage === "reviewLoading" && (
        <LoadingScreen
          title="Finalizing"
          lines={applicationReviewLines}
          duration={2600}
          onDone={() => goNext()}
        />
      )}

      {stage === "approved" && (
        <FinalApproved
          name={answers.name}
          score={score}
          date={answers.date}
          time={answers.time}
          food={answers.food}
        />
      )}
    </Shell>
  );
}
