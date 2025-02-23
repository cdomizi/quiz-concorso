import { formatQuestionIndex } from "@utils/QuizUtils";

export function DashboardQuestion({
  index,
  answered,
  onClick,
}: {
  index: number;
  answered: boolean;
  onClick: (index: number) => Promise<void>;
}) {
  const questionIndex = formatQuestionIndex(index);

  return (
    <button
      className={`dashboard-question-button ${answered ? "answered" : ""}`}
      type="button"
      onClick={() => void onClick(index)}
    >
      {questionIndex.toString()}
    </button>
  );
}
