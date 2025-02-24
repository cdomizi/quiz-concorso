import { TQuiz, TQuizAction } from "@hooks/useQuizContext";
import { createContext } from "react";

export type TQuizContext = {
  quizState: TQuiz;
  dispatch: React.ActionDispatch<[action: TQuizAction]>;
};

const QuizContext = createContext({} as TQuizContext);

export default QuizContext;
