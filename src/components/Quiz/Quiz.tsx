import { QUIZ_ACTIONS, useQuizContext } from "@/hooks/useQuizContext";
import { Question } from "@components/Quiz/Question";
import { useRedirect } from "@hooks/useRedirect";

export function Quiz() {
  const {
    quizState: { filePath, questions, step = 0 },
    dispatch,
  } = useQuizContext();

  // Redirect user to home page if no quiz file has been selected
  const redirectToHome = useRedirect({
    destination: "/",
    condition: !filePath,
  });
  if (redirectToHome) redirectToHome();

  const isLast = !!questions?.length && step === questions.length - 1;

  function handlePrev() {
    if (step > 0) dispatch({ type: QUIZ_ACTIONS.setStep, payload: step - 1 });
  }

  function handleNext() {
    if (!isLast) dispatch({ type: QUIZ_ACTIONS.setStep, payload: step + 1 });
  }

  function setAnswer(selectedAnswer: string) {
    if (questions?.length) {
      const answeredQuestion = { ...questions[step], selectedAnswer };
      const newQuestions = questions.toSpliced(step, 1, answeredQuestion);

      dispatch({ type: QUIZ_ACTIONS.setQuestions, payload: newQuestions });
    }
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const selectedAnswer = event.target.value;
    setAnswer(selectedAnswer);
  };

  function goToLast() {
    dispatch({ type: QUIZ_ACTIONS.setStep, payload: questions!.length - 1 });
  }

  function goToFirst() {
    dispatch({ type: QUIZ_ACTIONS.setStep, payload: 0 });
  }

  return (
    <div>
      {questions?.length && (
        <Question
          key={questions[step].index}
          index={questions[step].index}
          total={questions.length}
          question={questions[step].question}
          options={questions[step].options}
          onChange={handleChange}
          onPrev={handlePrev}
          onNext={handleNext}
          goToFirst={goToFirst}
          goToLast={goToLast}
          isLast={isLast}
        />
      )}
    </div>
  );
}
