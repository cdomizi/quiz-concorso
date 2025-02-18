const quizTitleRegex = new RegExp(/Prova OR[A-Z_0-9]+/m);
const questionTitleRegex = new RegExp(
  /(SS_[PEDINGTD]{2,3}_\d{1,3}[_NEW]*|MdA|CORTA\s–\sPERF\.\sASSESS|MEDIA\s–\sVAL\.\sBIAS|LUNGA\s–\sFEED|LUNGA\s-\sRAV|CORTA\s–\sDID\.\sSIGN\._NEW|ENGAGEMENT|DISCOVERY\sLEARNING|APPROCCI\sDIALOGICI|EDUCAZIONE\sFORMALE|LEARNING\sTHEORY|PROGETTAZIONE|GREENCOMP[_NEW]*|SELF[_NEW]*|(?<!\(CA)SEL(?!\sFramework))/
);

export function getQuizTitle(text: string) {
  const res = quizTitleRegex.exec(text);

  if (res) return res[0];
}

export function getQuizSubtitle(text: string) {
  const res = quizTitleRegex.exec(text);

  if (res) return res[0];
}

function splitQuizText(text: string) {
  return text.split(questionTitleRegex);
}

export function getQuestions(quizContent: string) {
  const quizText = splitQuizText(quizContent); // Split quiz text by question

  quizText.splice(0, 1); // Remove intro, only keep questions

  // Remove question titles
  const questions = quizText.filter((question, index) => index % 2 && question);

  return questions;
}
