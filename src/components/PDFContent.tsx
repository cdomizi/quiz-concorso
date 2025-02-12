import { useEffect, useState } from "react";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export function PDFContent() {
  const filePath = "./Domande_2575_v81.pdf";

  const [quizContent, setQuizContent] = useState<string>();

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

        await pdf.cleanup(); // Close PDF document

        setQuizContent(text); // Update state
      } catch (error) {
        console.error("Error extracting PDF text:", error);
      }
    };
    void getTextFromPDF();
  }, []);

  return (
    <>
      <h1>Quiz Content:</h1>
      <p>{quizContent}</p>
    </>
  );
}
