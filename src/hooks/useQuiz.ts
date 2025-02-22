import { getQuizData } from "@/components/QuizUtils";
import { useEffect, useState } from "react";

type TQuestion = {
  index: number;
  question: string;
  options: string[];
  answer: string;
  givenAnswer?: string;
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

const FILE_PATH = "./Domande_2575_v81.pdf";

export function useQuiz() {
  const [questions, setQuestions] = useState<TQuestion[]>();

  useEffect(() => {
    const setQuizData = async () => {
      try {
        const quizData = await getQuizData(FILE_PATH);

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
  }, []);

  return { questions };
}
