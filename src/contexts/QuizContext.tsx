import { createContext } from "react";

export type TQuizContext = {
  filePath: string | undefined;
  setFilePath: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const QuizContext = createContext({} as TQuizContext);

export default QuizContext;
