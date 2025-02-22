import { useQuiz } from "@hooks/useQuiz";
import { useState } from "react";
import { FormStep } from "./FormStep";

export function Form() {
  const { questions } = useQuiz();
  const [step, setStep] = useState<number>(0);

  const isLast = !!questions?.length && step === questions.length - 1;

  function handlePrev() {
    setStep((currentStep) => currentStep - 1);
  }

  function handleNext(answer?: string) {
    console.log(answer);

    if (!isLast) setStep((currentStep) => currentStep + 1);
  }

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
          onPrev={handlePrev}
          onNext={handleNext}
          goToFirst={() => {
            goTo(0);
          }}
          goToLast={() => {
            if (questions.length) goTo(questions.length - 1);
          }}
          isLast={isLast}
        />
      )}
    </div>
  );
}
