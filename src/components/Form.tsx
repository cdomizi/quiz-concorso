import { useQuiz } from "@hooks/useQuiz";
import { useState } from "react";
import { FormStep } from "./FormStep";

export function Form() {
  const { questions, setQuestions } = useQuiz();
  const [step, setStep] = useState<number>(0);

  const isLast = !!questions?.length && step === questions.length - 1;

  function setAnswer(selectedAnswer: string) {
    if (questions?.length) {
      setQuestions((currentQuestions) => {
        const answeredQuestion = { ...questions[step], selectedAnswer };
        const newQuestions = currentQuestions?.toSpliced(
          step,
          1,
          answeredQuestion
        );

        return newQuestions;
      });
    }
  }

  function handlePrev() {
    if (step > 0) setStep((currentStep) => currentStep - 1);
  }

  function handleNext() {
    if (!isLast) setStep((currentStep) => currentStep + 1);
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const selectedAnswer = event.target.value;
    setAnswer(selectedAnswer);
  };

  function goTo(index: number) {
    setStep(index);
  }

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
