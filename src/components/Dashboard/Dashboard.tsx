import { useQuizContext } from "@/hooks/useQuizContext";
import { ButtonLink } from "@components/ButtonLink";
import { DashboardQuestion } from "@components/Dashboard/DashboardQuestion";
import { useQuiz } from "@hooks/useQuiz";
import { useNavigate } from "@tanstack/react-router";

export function Dashboard() {
  const navigate = useNavigate();

  const {
    quizState: { title, questions },
  } = useQuizContext();
  const { goTo } = useQuiz();

  async function handleOnClick(index: number) {
    goTo(index);
    await navigate({ to: "/quiz" });
  }

  return (
    <div>
      <h1>{title}</h1>
      <p>
        Concorso ordinario 2023 - Scuola secondaria di primo e secondo grado
      </p>
      <p>Classe di concorso 2575</p>
      <ButtonLink to="/quiz">Inizia</ButtonLink>
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
