import { useQuizContext } from "@/hooks/useQuizContext";
import { formatQuestionIndex } from "@utils/QuizUtils";

export function DashboardQuestion({
  index,
  onClick,
}: {
  index: number;
  onClick: (index: number) => Promise<void>;
}) {
  const {
    quizState: { questions, submitted },
  } = useQuizContext();
  const questionIndex = formatQuestionIndex(index);

  const answer = questions![index].answer;
  const selectedAnswer = questions![index].selectedAnswer;

  const QUESTION_STATUS = {
    answered: "answered",
    correct: "correct",
    wrong: "wrong",
  } as const;

  function getClassName() {
    const className = submitted
      ? selectedAnswer === answer
        ? QUESTION_STATUS.correct
        : QUESTION_STATUS.wrong
      : selectedAnswer
        ? QUESTION_STATUS.answered
        : "";

    return className;
  }

  return (
    <button
      className={`dashboard-question-button ${getClassName()}`}
      type="button"
      onClick={() => void onClick(index)}
    >
      {questionIndex.toString()}
    </button>
  );
}
