import { FormStep } from "./FormStep";

export function Form() {
  // const questions = Array.from(Array(50).keys());
  const questions = Array.from(Array(5).keys());
  return (
    <div>
      {questions.map((question, index) => (
        <FormStep
          key={index}
          index={index}
          total={questions.length}
          question={question.toString()}
        />
      ))}
    </div>
  );
}
