import { createContext, ReactNode, useState } from "react";

export type TQuizContext = {
  filePath: string | undefined;
  setFilePath: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const QuizContext = createContext({} as TQuizContext);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [quizFilePath, setQuizFilePath] = useState<string | undefined>();

  return (
    <QuizContext
      value={{ filePath: quizFilePath, setFilePath: setQuizFilePath }}
    >
      {children}
    </QuizContext>
  );
}

export default QuizContext;
