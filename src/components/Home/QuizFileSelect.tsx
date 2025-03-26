import { QUIZ_ACTIONS } from "@/hooks/useQuizContext";
import QuizContext from "@contexts/QuizContext";
import { useNavigate } from "@tanstack/react-router";
import { useContext } from "react";

const QUIZ_FILES = [
  "Domande_2575_v81.pdf",
  "Domande_2575_v82.pdf",
  "Domande_2575_v83.pdf",
  "Domande_2575_v84.pdf",
  "Domande_2575_v85.pdf",
  "Domande_2575_v86.pdf",
  "Domande_2575_v87.pdf",
  "Domande_2575_v88.pdf",
  "Domande_2575_v89.pdf",
  "Domande_2575_v90.pdf",
  "Domande_2575_v161_prova suppletiva.pdf",
];

const fileNameRegex = new RegExp(/^(Domande_2575_v\d+)/g);

function getOptionInfo(filePath: string) {
  const fileName = filePath.match(fileNameRegex);
  const formattedName = fileName?.[0].replaceAll("_", " ");

  return {
    value: filePath,
    name: formattedName,
  };
}

const quizSelectOptions = QUIZ_FILES.map((filePath) => getOptionInfo(filePath));

export function QuizFileSelect() {
  const navigate = useNavigate();

  const { dispatch } = useContext(QuizContext);

  async function handleFileSelect(event: React.MouseEvent<HTMLButtonElement>) {
    const selectedFilePath = (event.target as HTMLButtonElement).value;

    // Set file path in context
    dispatch({ type: QUIZ_ACTIONS.setFilePath, payload: selectedFilePath });

    // Navigate to the dashboard
    await navigate({ to: "/dashboard" });
  }

  return (
    <>
      <h1>Seleziona il quiz</h1>
      {quizSelectOptions.map((option) => (
        <button
          key={option.value}
          value={option.value}
          onClick={(event) => {
            void handleFileSelect(event);
          }}
          type="button"
        >
          {option.name}
        </button>
      ))}
    </>
  );
}
