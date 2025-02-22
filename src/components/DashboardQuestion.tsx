import { formatQuestionIndex } from "./QuizUtils";

export function DashboardQuestion({
  index,
  answered,
  onClick,
}: {
  index: number;
  answered: boolean;
  onClick: (index: number) => void;
}) {
  const questionIndex = formatQuestionIndex(index);

  return (
    <button
      className={`dashboard-question-button ${answered ? "answered" : ""}`}
      type="button"
      onClick={() => {
        onClick(index);
      }}
    >
      {questionIndex}
    </button>
  );
}
