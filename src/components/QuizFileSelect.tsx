import QuizContext from "@contexts/QuizContext";
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
  const { filePath, setFilePath } = useContext(QuizContext);

  function handleFileSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedFilePath = event.target.value;

    setFilePath(selectedFilePath); // Set state in parent component
  }

  return (
    <>
      <label htmlFor="file-select">Seleziona il quiz: </label>
      <select
        onChange={handleFileSelect}
        defaultValue={filePath}
        name="quizzes"
        id="file-select"
      >
        {<option value={undefined}></option>}
        {quizSelectOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </>
  );
}
