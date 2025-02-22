import { useState } from "react";

function scrambleOrder(arr: string[]) {
  const scrambledArr = [];

  // Array of indices representing the original order
  const indices = Array.from(Array(arr.length).keys());

  // Shuffle the indices
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  // Rearrange the elements based on the shuffled indices
  for (const i of indices) {
    scrambledArr.push(arr[indices[i]]);
  }

  return scrambledArr;
}

export function FormStep({
  index,
  total,
  question,
  onPrev,
  onSubmit,
  isLast,
}: {
  index: number;
  total: number;
  question: string;
  onPrev: () => void;
  onSubmit: (answer?: string) => void;
  isLast: boolean;
}) {
  const questionNumber = index + 1;
  const isFirst = index <= 0;
  const options = ["1", "2", "3", "4"];
  // const correctAnswer = options[0]; // First option is always the correct answer

  // List options in scrambled order
  const scrambledOptions = scrambleOrder(options);

  const nextButtonText = isLast ? "submit" : "next";

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
        {scrambledOptions.map((option, optionIndex) => (
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
          id="prevButton"
          onClick={onPrev}
          disabled={isFirst}
        >
          prev
        </button>
        <button
          type="submit"
          id="nextButton"
          onClick={() => {
            onSubmit(answer);
          }}
        >
          {nextButtonText}
        </button>
      </div>
    </div>
  );
}
