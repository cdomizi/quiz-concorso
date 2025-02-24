import { QUIZ_ACTIONS, useQuizContext } from "@/hooks/useQuizContext";
import { DashboardQuestion } from "@components/Dashboard/DashboardQuestion";
import { useNavigate, useRouter } from "@tanstack/react-router";

export function Dashboard() {
  const router = useRouter();
  const navigate = useNavigate();

  const {
    quizState: { title, questions, submitted },
    dispatch,
  } = useQuizContext();

  async function handleOnClick(index: number) {
    dispatch({ type: QUIZ_ACTIONS.setStep, payload: index });
    await navigate({ to: "/quiz" });
  }

  function submit() {
    dispatch({ type: QUIZ_ACTIONS.setSubmitted });
  }

  async function exitQuiz() {
    dispatch({ type: QUIZ_ACTIONS.eraseState });
    await router.invalidate();
    await navigate({ to: "/" });
  }

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
      <h1>{title}</h1>
      <p>
        Concorso ordinario 2023 - Scuola secondaria di primo e secondo grado
      </p>
      <p>Classe di concorso 2575</p>
      {submitted && (
        <div>
          <hr />
          <h2 className={isQuizPassed ? "success" : "wrong"}>Test {result}</h2>
          <p>
            <b>
              Punteggio: {points} / {totalPoints}
            </b>
          </p>
          <p>Risposte: {resultDetail}</p>
        </div>
      )}
      <button
        type="button"
        disabled={submitted}
        onClick={() => {
          void handleOnClick(0);
        }}
      >
        Inizia
      </button>
      <button type="button" onClick={submit}>
        Termina
      </button>
      <button
        type="button"
        onClick={() => {
          void exitQuiz();
        }}
      >
        Esci
      </button>
      <div>
        {questions?.map((question) => (
          <DashboardQuestion
            key={question.index}
            index={question.index}
            onClick={handleOnClick}
          />
        ))}
      </div>
    </div>
  );
}
