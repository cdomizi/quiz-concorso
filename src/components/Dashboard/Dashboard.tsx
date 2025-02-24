import { QUIZ_ACTIONS, useQuizContext } from "@/hooks/useQuizContext";
import { DashboardQuestion } from "@components/Dashboard/DashboardQuestion";
import { useNavigate, useRouter } from "@tanstack/react-router";

export function Dashboard() {
  const router = useRouter();
  const navigate = useNavigate();

  const {
    quizState: { title, questions },
    dispatch,
  } = useQuizContext();

  async function handleOnClick(index: number) {
    dispatch({ type: QUIZ_ACTIONS.setStep, payload: index });
    await navigate({ to: "/quiz" });
  }

  async function exitQuiz() {
    dispatch({ type: QUIZ_ACTIONS.eraseState });
    await router.invalidate();
    await navigate({ to: "/" });
  }

  return (
    <div>
      <h1>{title}</h1>
      <p>
        Concorso ordinario 2023 - Scuola secondaria di primo e secondo grado
      </p>
      <p>Classe di concorso 2575</p>
      <button
        type="button"
        onClick={() => {
          void handleOnClick(0);
        }}
      >
        Inizia
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
            answered={!!question.selectedAnswer}
            onClick={handleOnClick}
          />
        ))}
      </div>
    </div>
  );
}
