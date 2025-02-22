import { DashboardQuestion } from "@components/DashboardQuestion";
import { useQuiz } from "@hooks/useQuiz";

export function Dashboard() {
  const { quizTitle, questions, goTo } = useQuiz();

  function handleOnClick(index: number) {
    goTo(index);
  }

  return (
    <div>
      <h1>{quizTitle}</h1>
      <p>
        Concorso ordinario 2023 - Scuola secondaria di primo e secondo grado
      </p>
      <p>Classe di concorso 2575</p>
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
