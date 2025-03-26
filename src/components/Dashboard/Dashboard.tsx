import { QUIZ_ACTIONS, useQuizContext } from "@/hooks/useQuizContext";
import { DashboardQuestion } from "@components/Dashboard/DashboardQuestion";
import { useRedirect } from "@hooks/useRedirect";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { QuizResult } from "./QuizResult";

export function Dashboard() {
  const router = useRouter();
  const navigate = useNavigate();

  const {
    quizState: { filePath, title, questions, submitted },
    dispatch,
  } = useQuizContext();

  // Redirect user to home page if no quiz file has been selected
  const redirectToHome = useRedirect({
    destination: "/",
    condition: !filePath,
  });
  if (redirectToHome) redirectToHome();

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

  return (
    <div>
      <h1>{title}</h1>
      <p>Concorso ordinario 2023 - Scuola secondaria di I e II grado</p>
      {submitted && <QuizResult />}
      <button
        type="button"
        disabled={submitted}
        onClick={() => {
          void handleOnClick(0);
        }}
      >
        Inizia
      </button>
      <button type="button" onClick={submit} disabled={submitted}>
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
