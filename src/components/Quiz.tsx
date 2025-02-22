import { useQuiz } from "@hooks/useQuiz";
import { Question } from "./Question";

export function Quiz() {
  const {
    questions,
    step,
    isLast,
    handlePrev,
    handleNext,
    handleChange,
    goTo,
  } = useQuiz();

  return (
    <div>
      {questions && (
        <Question
          key={questions[step].index}
          index={questions[step].index}
          total={questions.length}
          question={questions[step].question}
          options={questions[step].options}
          onChange={handleChange}
          onPrev={handlePrev}
          onNext={handleNext}
          goToFirst={() => {
            goTo(0);
          }}
          goToLast={() => {
            if (questions.length) goTo(questions.length - 1);
          }}
          selectedAnswer={questions[step]?.selectedAnswer}
          isLast={isLast}
        />
      )}
    </div>
  );
}
