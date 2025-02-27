import { useQuizContext } from "@/hooks/useQuizContext";
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
  isLast,
}: FormStepProps) {
  const {
    quizState: { questions, submitted },
  } = useQuizContext();

  const questionNumber = index + 1;
  const isFirst = index <= 0;

  const answer = questions![index].answer;
  const selectedAnswer = questions![index].selectedAnswer;

  const OPTION_STATUS = {
    correct: "correct",
    wrong: "wrong",
  } as const;

  function getClassName(option: string) {
    const className =
      option === answer
        ? OPTION_STATUS.correct
        : option === selectedAnswer
          ? OPTION_STATUS.wrong
          : "";

    return submitted ? className : "";
  }

  return (
    <div>
      <div>
        Domanda {questionNumber} di {total}
      </div>
      <fieldset>
        <legend>{question}</legend>
        {options.map((option, optionIndex) => (
          <div key={optionIndex}>
            <label className={getClassName(option)}>
              <input
                key={optionIndex}
                type="radio"
                name={`question_${index.toString()}`}
                value={option}
                onChange={onChange}
                defaultChecked={option === selectedAnswer}
                disabled={submitted}
              />
              {option}
            </label>
          </div>
        ))}
      </fieldset>
      <div>
        <ButtonLink to="/dashboard">Vai al riepilogo</ButtonLink>
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
