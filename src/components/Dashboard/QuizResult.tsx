import { useQuizContext } from "@/hooks/useQuizContext";

export function QuizResult() {
  const {
    quizState: { questions },
  } = useQuizContext();

  const totalAnswers = questions?.length || 50;
  const correctAnswers =
    questions?.filter((question) => question.selectedAnswer === question.answer)
      .length || 0;
  const totalPoints = totalAnswers * 2;
  const points = correctAnswers * 2;
  const minPassedPoints = 70;
  const isQuizPassed = points >= minPassedPoints;
  const result = isQuizPassed ? "Superato" : "Fallito";
  const resultDetail = `${correctAnswers.toString()} / ${totalAnswers.toString()}`;

  return (
    <div>
      <hr />
      <h2 className={isQuizPassed ? "success" : "wrong"}>Test {result}</h2>
      <p>
        <b>
          Punteggio: {points} / {totalPoints}
        </b>
      </p>
      <p>Risposte esatte: {resultDetail}</p>
    </div>
  );
}
