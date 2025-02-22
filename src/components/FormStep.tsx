type FormStepProps = {
  index: number;
  total: number;
  question: string;
  options: string[];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onPrev: () => void;
  onNext: () => void;
  goToFirst: () => void;
  goToLast: () => void;
  selectedAnswer?: string;
  isLast: boolean;
};

export function FormStep({
  index,
  total,
  question,
  options,
  onChange,
  onPrev,
  onNext,
  goToFirst,
  goToLast,
  selectedAnswer,
  isLast,
}: FormStepProps) {
  const questionNumber = index + 1;
  const isFirst = index <= 0;

  const nextButtonText = isLast ? "submit" : ">";

  return (
    <div>
      <div>
        {questionNumber} / {total}
      </div>
      <fieldset>
        <legend>{question}</legend>
        {options.map((option, optionIndex) => (
          <div key={optionIndex}>
            <label>
              <input
                key={optionIndex}
                type="radio"
                name={`question_${index.toString()}`}
                value={option}
                onChange={onChange}
                defaultChecked={option === selectedAnswer}
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
            onNext();
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
