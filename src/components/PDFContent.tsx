import {
  getQuizSubtitle,
  getQuizTitle,
  splitText,
} from "@components/PDFService";
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
  const [quizSubtitle, setQuizSubtitle] = useState<string>();
  const [quizContent, setQuizContent] = useState<string[]>();

  useEffect(() => {
    const getTextFromPDF = async () => {
      try {
        const pdf = await pdfjs.getDocument(filePath).promise; // Load PDF document
        const totalPageCount = pdf.numPages;
        let text = "";
        // Loop through each page and extract the text
        for (
          let currentPage = 1;
          currentPage <= totalPageCount;
          currentPage++
        ) {
          const page = await pdf.getPage(currentPage);
          const pageText = await page.getTextContent();
          text += pageText.items
            .map((item) => "str" in item && item.str)
            .join(" ");
        }

        setQuizTitle(getQuizTitle(text));
        setQuizSubtitle(getQuizSubtitle(text));

        const textSplit = splitText(text);

        await pdf.cleanup(); // Close PDF document

        setQuizContent(textSplit); // Update state
      } catch (error) {
        console.error("Error extracting PDF text:", error);
      }
    };
    void getTextFromPDF();
  }, [filePath, setFilePath]);

  return (
    <>
      <FileSelect/>
      <h1>{quizTitle}</h1>
      <h2>{quizSubtitle}</h2>
      <div>
        {quizContent?.map((question, index) => <p key={index}>{question}</p>)}
      </div>
    </>
  );
}
