import { useState } from "react";

type FormStepProps = {
  index: number;
  total: number;
  question: string;
  options: string[];
  onPrev: () => void;
  onNext: (answer?: string) => void;
  goToFirst: () => void;
  goToLast: () => void;
  isLast: boolean;
};

export function FormStep({
  index,
  total,
  question,
  options,
  onPrev,
  onNext,
  goToFirst,
  goToLast,
  isLast,
}: FormStepProps) {
  const questionNumber = index + 1;
  const isFirst = index <= 0;

  const nextButtonText = isLast ? "submit" : ">";

  const [answer, setAnswer] = useState<string | undefined>();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setAnswer(event.target.value);
    console.log({ prevAnswer: answer, newAnswer: event.target.value });
  };

  return (
    <div>
      <div>
        {questionNumber} / {total}
      </div>
      <fieldset>
        <legend>{question} question text</legend>
        {options.map((option, optionIndex) => (
          <div key={optionIndex}>
            <label>
              <input
                key={optionIndex}
                type="radio"
                name={`question_${index.toString()}`}
                value={option}
                onChange={handleChange}
              />
              {option}
            </label>
          </div>
        ))}
      </fieldset>
      <div>
        <button
          type="button"
          id="goToFirstButton"
          onClick={goToFirst}
          disabled={isFirst}
        >
          &lt;&lt;
        </button>
        <button
          type="button"
          id="prevButton"
          onClick={onPrev}
          disabled={isFirst}
        >
          &lt;
        </button>
        <button
          type="submit"
          id="nextButton"
          onClick={() => {
            onNext(answer);
          }}
        >
          {nextButtonText}
        </button>
        <button
          type="button"
          id="goToLastButton"
          onClick={goToLast}
          disabled={isLast}
        >
          &gt;&gt;
        </button>
      </div>
    </div>
  );
}
