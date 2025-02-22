export function FormStep({
  index,
  total,
  question,
}: {
  index: number;
  total: number;
  question: string;
}) {
  const questionNumber = index + 1;
  const scrambledOptions = [1, 2, 3, 4];

  const isFirst = index <= 0;
  const isLast = index >= total - 1;

  return (
    <div>
      <div>
        {questionNumber} / {total}
      </div>
      <p>{question} question text</p>
      {scrambledOptions.map((option, optionIndex) => (
        <div key={optionIndex}>
          <label>
            <input
              type="radio"
              key={optionIndex}
              name={`question_${index.toString()}`}
              value={option}
            />
            {option}
          </label>
        </div>
      ))}
      <div>
        <button type="button" id="prevButton" disabled={isFirst}>
          prev
        </button>
        <button type="button" id="nextButton" disabled={isLast}>
          next
        </button>
      </div>
    </div>
  );
}
