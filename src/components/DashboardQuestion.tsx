import { ButtonLink } from "./ButtonLink";
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
    <ButtonLink
      className={`dashboard-question-button ${answered ? "answered" : ""}`}
      type="button"
      to="/quiz"
      onClick={() => {
        onClick(index);
      }}
    >
      {questionIndex.toString()}
    </ButtonLink>
  );
}
