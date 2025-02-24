import { getQuestionData, getQuizData, scrambleOrder } from "@/utils/QuizUtils";
import { useEffect, useReducer } from "react";
import { useQuizCache } from "./useQuizCache";

export type TQuestion = {
  index: number;
  question: string;
  options: string[];
  answer: string;
  selectedAnswer?: string;
};

export type TQuiz = {
  filePath?: string;
  title?: string;
  questions?: TQuestion[];
  step?: number;
  submitted?: boolean;
};

export type TQuizAction = {
  type: keyof typeof QUIZ_ACTIONS;
  payload?: unknown;
};

const initialState: TQuiz = {
  filePath: undefined,
  step: 0,
};

export const QUIZ_ACTIONS = {
  setFilePath: "setFilePath",
  setTitle: "setTitle",
  setQuestions: "setQuestions",
  setStep: "setStep",
  setSubmitted: "setSubmitted",
  eraseState: "eraseState",
} as const;

function quizReducer(state: TQuiz, action: TQuizAction) {
  switch (action.type) {
    case QUIZ_ACTIONS.setFilePath: {
      return {
        ...state,
        filePath: action.payload as string,
      };
    }
    case QUIZ_ACTIONS.setTitle: {
      return {
        ...state,
        title: action.payload as string,
      };
    }
    case QUIZ_ACTIONS.setQuestions: {
      return {
        ...state,
        questions: action.payload as TQuestion[],
      };
    }
    case QUIZ_ACTIONS.setStep: {
      const defaultStep = 0;
      const newStep = action.payload || defaultStep;

      return {
        ...state,
        step: newStep as number,
      };
    }
    case QUIZ_ACTIONS.setSubmitted: {
      return {
        ...state,
        submitted: true,
      };
    }
    case QUIZ_ACTIONS.eraseState: {
      return {};
    }
    default: {
      return state;
    }
  }
}

export function useQuizContext() {
  // Retrieve cached value for quizState
  const { getQuizState, setQuizState } = useQuizCache();

  const [quizState, dispatch] = useReducer(
    quizReducer,
    initialState,
    getQuizState
  );

  useEffect(() => {
    const cachedQuizState = getQuizState();

    const setQuizData = async () => {
      if (quizState.filePath) {
        try {
          const quizData = await getQuizData(quizState.filePath);

          // Set quiz title
          dispatch({
            type: QUIZ_ACTIONS.setTitle,
            payload: quizData?.quizTitle,
          });
          const questionsData = quizData?.questions; // Set Questions

          const allQuestions = questionsData?.map((questionContent, index) => {
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

          dispatch({ type: QUIZ_ACTIONS.setQuestions, payload: allQuestions });
        } catch (error) {
          console.error("Error extracting PDF text:", error);
        }
      }
    };

    // Only set quiz data on empty cache
    if (!cachedQuizState.filePath) void setQuizData();

    setQuizState(quizState); // Persist data on every action dispatched
  }, [getQuizState, quizState, setQuizState]);

  return { quizState, dispatch };
}
