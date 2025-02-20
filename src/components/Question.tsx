function formatQuestionNumber(index: number) {
  // Transform 0-based into 1-based index
  const questionNumber = index + 1;

  return `${questionNumber.toString()}. `;
}

function getQuestionData(questionContent: string) {
  const optionRegex = new RegExp(/\s?\[[abcd]\]\s?/);

  return questionContent.split(optionRegex);
}

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

export function Question({
  questionContent,
  index,
}: {
  questionContent: string;
  index: number;
}) {
  const questionNumber = formatQuestionNumber(index);
  const [question, ...options] = getQuestionData(questionContent);
  // const correctAnswer = options[1]; // First option is always the correct answer

  // List options in scrambled order
  const scrambledOptions = scrambleOrder(options);

  return (
    <div>
      <p>
        {questionNumber}
        {question}
      </p>
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
    </div>
  );
}
