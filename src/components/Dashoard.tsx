import { useQuiz } from "@hooks/useQuiz";

export function Dashboard() {
  const { quizTitle } = useQuiz();

  return (
    <div>
      <h1>{quizTitle}</h1>
      <p>
        Concorso ordinario 2023 - Scuola secondaria di primo e secondo grado
      </p>
      <p>Classe di concorso 2575</p>
    </div>
  );
}
