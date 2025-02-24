import { useQuizCache } from "@/hooks/useQuizCache";
import { QUIZ_ACTIONS, useQuizContext } from "@/hooks/useQuizContext";
import { DashboardQuestion } from "@components/Dashboard/DashboardQuestion";
import { useNavigate, useRouter } from "@tanstack/react-router";

export function Dashboard() {
  const router = useRouter();
  const navigate = useNavigate();
  const { deleteQuizState } = useQuizCache();

  const {
    quizState: { title, questions },
    dispatch,
  } = useQuizContext();

  async function handleOnClick(index: number) {
    dispatch({ type: QUIZ_ACTIONS.setStep, payload: index });
    await navigate({ to: "/quiz" });
  }

  async function endQuiz() {
    deleteQuizState();
    await router.invalidate();
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
          void endQuiz();
        }}
      >
        Termina
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
