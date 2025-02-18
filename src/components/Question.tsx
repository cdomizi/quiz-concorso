function formatQuestionNumber(index: number) {
  const questionNumber = index + 1; // Transform 0-based index to 1/based

  return `${questionNumber.toString()}. `;
}

function getQuestionData(questionContent: string) {
  const optionRegex = new RegExp(/\s?\[[abcd]\]\s?/);

  return questionContent.split(optionRegex);
}

function getRandomNumber(max: number) {
  return Math.floor(Math.random() * max);
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
  const correctAnswer = options[1]; // First option is always the correct answer

  return (
    <div>
      <p>
        {questionNumber}
        {question}
      </p>
      {options.map((option, index) => (
        <div key={index}>
          <input type="radio" key={index} value={option} />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
    </div>
  );
}
