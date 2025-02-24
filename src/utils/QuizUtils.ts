import { pdfjs } from "react-pdf";

// Set up pdfjs library
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

async function getQuizContent(filePath: string) {
  let quizContent = "";

  // Load Quiz PDF file
  const pdf = await pdfjs.getDocument(filePath).promise;
  const totalPageCount = pdf.numPages;

  // Loop through each page and extract the text
  for (let currentPage = 1; currentPage <= totalPageCount; currentPage++) {
    const page = await pdf.getPage(currentPage);
    const pageContent = await page.getTextContent();
    quizContent += pageContent.items
      .map((item) => "str" in item && item.str)
      .join(" ");
  }

  await pdf.cleanup(); // Close PDF document

  return quizContent;
}

const quizTitleRegex = new RegExp(/Prova OR[A-Z_0-9]+/m);

function getQuizTitle(text: string) {
  const res = quizTitleRegex.exec(text);

  if (res) return res[0];
}

const questionTitleRegex = new RegExp(
  /(SS_[PEDINGTD]{2,3}_\d{1,3}[_NEW]*|MdA|CORTA\s–\sPERF\.\sASSESS|MEDIA\s–\sVAL\.\sBIAS|LUNGA\s–\sFEED|LUNGA\s-\sRAV|CORTA\s–\sDID\.\sSIGN\._NEW|ENGAGEMENT|DISCOVERY\sLEARNING|APPROCCI\sDIALOGICI|EDUCAZIONE\sFORMALE|LEARNING\sTHEORY|PROGETTAZIONE|GREENCOMP[_NEW]*|SELF[_NEW]*|(?<!\(CA)SEL(?!\sFramework))/
);

function splitQuizText(text: string) {
  return text.split(questionTitleRegex);
}

function getQuestions(quizContent: string) {
  const quizText = splitQuizText(quizContent); // Split quiz text by question

  quizText.splice(0, 1); // Remove intro, only keep questions

  // Remove question titles
  const questions = quizText.filter((question, index) => index % 2 && question);

  return questions;
}

export async function getQuizData(filePath: string) {
  try {
    const quizContent = await getQuizContent(filePath);

    const quizTitle = getQuizTitle(quizContent); // Set quiz title

    // Remove question titles
    const questions = getQuestions(quizContent);

    return { quizTitle, questions };
  } catch (error) {
    console.error("Error extracting PDF text:", error);
  }
}

export function getQuestionData(questionContent: string) {
  const optionRegex = new RegExp(/\s?\[[abcd]\]\s?/);

  return questionContent.split(optionRegex);
}

export function scrambleOrder(arr: string[]) {
  const scrambledArr = [];

  // Array of indices representing the original order
  const indices = Array.from(Array(arr.length).keys());

  // Shuffle the indices
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  // Rearrange the elements based on the shuffled indices
  for (const i of indices) {
    scrambledArr.push(arr[indices[i]]);
  }

  return scrambledArr;
}

export function formatQuestionIndex(index: number) {
  // Transform 0-based into 1-based index
  return index + 1;
}
