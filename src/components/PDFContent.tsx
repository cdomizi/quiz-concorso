import { getQuestions, getQuizTitle } from "@components/PDFService";
import { useEffect, useState } from "react";
import { pdfjs } from "react-pdf";
import { FileSelect } from "./FileSelect";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export function PDFContent() {
  const [filePath, setFilePath] = useState<string>("./Domande_2575_v81.pdf");

  const [quizTitle, setQuizTitle] = useState<string>();
  const [questions, setQuestions] = useState<string[]>();

  useEffect(() => {
    const getTextFromPDF = async () => {
      try {
        let quizContent = "";

        const pdf = await pdfjs.getDocument(filePath).promise; // Load PDF document
        const totalPageCount = pdf.numPages;

        // Loop through each page and extract the text
        for (
          let currentPage = 1;
          currentPage <= totalPageCount;
          currentPage++
        ) {
          const page = await pdf.getPage(currentPage);
          const pageContent = await page.getTextContent();
          quizContent += pageContent.items
            .map((item) => "str" in item && item.str)
            .join(" ");
        }

        setQuizTitle(getQuizTitle(quizContent)); // Set quiz title

        // Remove question titles
        const questionsContent = getQuestions(quizContent);

        setQuestions(questionsContent); // Set questions

        await pdf.cleanup(); // Close PDF document
      } catch (error) {
        console.error("Error extracting PDF text:", error);
      }
    };
    void getTextFromPDF();
  }, [filePath, setFilePath]);

  function onFileSelect(filePath: string) {
    setFilePath(filePath);
  }

  return (
    <>
      <FileSelect onSelect={onFileSelect} />
      <h1>{quizTitle}</h1>
      <p>
        Concorso ordinario 2023 - Scuola secondaria di primo e secondo grado
      </p>
      <p>Classe di concorso 2575</p>
      <div>
        {questions?.map((question, index) => <p key={index}>{question}</p>)}
      </div>
    </>
  );
}
