const FILE_LIST = [
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

const quizSelectOptions = FILE_LIST.map((filePath) => getOptionInfo(filePath));

export function FileSelect() {
  return (
    <>
      <label htmlFor="file-select">Seleziona il quiz: </label>

      <select name="quizzes" id="file-select">
        {" "}
        <option value={undefined}>--Seleziona un&#39;opzione--</option>
        {quizSelectOptions.map((file) => (
          <option key={file.value} value={file.value}>
            {file.name}
          </option>
        ))}
      </select>
    </>
  );
}
