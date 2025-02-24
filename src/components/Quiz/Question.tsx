import { ButtonLink } from "@components/ButtonLink";

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

export function Question({
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
        <ButtonLink to="/dashboard">Pagina principale</ButtonLink>
        <button
          type="button"
          id="goToFirstButton"
          disabled={isFirst}
          onClick={goToFirst}
        >
          &lt;&lt;
        </button>
        <button
          type="button"
          id="prevButton"
          disabled={isFirst}
          onClick={onPrev}
        >
          &lt;
        </button>
        <button
          type="submit"
          id="nextButton"
          disabled={isLast}
          onClick={() => {
            onNext();
          }}
        >
          &gt;
        </button>
        <button
          type="button"
          id="goToLastButton"
          disabled={isLast}
          onClick={goToLast}
        >
          &gt;&gt;
        </button>
      </div>
    </div>
  );
}
