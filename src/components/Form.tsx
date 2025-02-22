import { useState } from "react";
import { FormStep } from "./FormStep";

export function Form() {
  const questions = Array.from(Array(5).keys());
  const [step, setStep] = useState<number>(0);

  const isLast = step === questions.length - 1;

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
      {
        <FormStep
          index={questions[step]}
          total={questions.length}
          question={questions[step].toString()}
          onPrev={handlePrev}
          onNext={handleNext}
          goToFirst={() => {
            goTo(0);
          }}
          goToLast={() => {
            goTo(questions.length - 1);
          }}
          isLast={isLast}
        />
      }
    </div>
  );
}
