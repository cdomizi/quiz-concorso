import { useQuiz } from "@hooks/useQuiz";
import { FormStep } from "./FormStep";

export function Form() {
  const {
    questions,
    step,
    isLast,
    handlePrev,
    handleNext,
    handleChange,
    goTo,
  } = useQuiz("./Domande_2575_v81.pdf");

  return (
    <div>
      {questions && (
        <FormStep
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
