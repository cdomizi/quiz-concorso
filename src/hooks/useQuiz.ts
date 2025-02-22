import { getQuizData } from "@/components/QuizUtils";
import { useEffect, useState } from "react";

type TQuestion = {
  index: number;
  question: string;
  options: string[];
  answer: string;
  selectedAnswer?: string;
};

function formatQuestionIndex(index: number) {
  // Transform 0-based into 1-based index
  return index++;
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

export function useQuiz(filePath: string) {
  const [questions, setQuestions] = useState<TQuestion[]>();
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    const setQuizData = async () => {
      try {
        const quizData = await getQuizData(filePath);

        const questionsData = quizData?.questions;

        const allQuestions = questionsData?.map((questionContent, i) => {
          const index = formatQuestionIndex(i);
          const [question, ...options] = getQuestionData(questionContent);

          const answer = options[0]; // First option is always the correct answer

          // List options in scrambled order
          const scrambledOptions = scrambleOrder(options);

          const currentQuestion: TQuestion = {
            index,
            question,
            options: scrambledOptions,
            answer,
          };

          return currentQuestion;
        });

        setQuestions(allQuestions);
      } catch (error) {
        console.error("Error extracting PDF text:", error);
      }
    };

    void setQuizData();
  }, [filePath]);

  const isLast = !!questions?.length && step === questions.length - 1;

  function handlePrev() {
    if (step > 0) setStep((currentStep) => currentStep - 1);
  }

  function handleNext() {
    if (!isLast) setStep((currentStep) => currentStep + 1);
  }

  function setAnswer(selectedAnswer: string) {
    if (questions?.length) {
      setQuestions((currentQuestions) => {
        const answeredQuestion = { ...questions[step], selectedAnswer };
        const newQuestions = currentQuestions?.toSpliced(
          step,
          1,
          answeredQuestion
        );

        return newQuestions;
      });
    }
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const selectedAnswer = event.target.value;
    setAnswer(selectedAnswer);
  };

  function goTo(index: number) {
    setStep(index);
  }

  return {
    questions,
    step,
    isLast,
    handlePrev,
    handleNext,
    handleChange,
    goTo,
  };
}
