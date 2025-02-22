import { QuizFileSelect } from "@/components/QuizFileSelect";
import { getQuizData } from "@/components/QuizUtils";
import { Question } from "@components/Question";
import { useEffect, useState } from "react";

export function Quiz() {
  const [filePath, setFilePath] = useState<string>("./Domande_2575_v81.pdf");

  const [quizTitle, setQuizTitle] = useState<string>();
  const [questions, setQuestions] = useState<string[]>();

  useEffect(() => {
    const setQuizData = async () => {
      try {
        const quizData = await getQuizData(filePath);

        setQuizTitle(quizData?.quizTitle); // Set quiz title
        setQuestions(quizData?.questions); // Set questions
      } catch (error) {
        console.error("Error extracting PDF text:", error);
      }
    };

    void setQuizData();
  }, [filePath]);

  function onFileSelect(filePath: string) {
    setFilePath(filePath);
  }

  return (
    <>
      <QuizFileSelect onSelect={onFileSelect} />
      <h1>{quizTitle}</h1>
      <p>
        Concorso ordinario 2023 - Scuola secondaria di primo e secondo grado
      </p>
      <p>Classe di concorso 2575</p>
      <div>
        {questions?.map((question, index) => (
          <Question key={index} questionContent={question} index={index} />
        ))}
      </div>
    </>
  );
}
