const quizTitleRegex = new RegExp(/^Domande\s+\d+/);
const quizSubtitleRegex = new RegExp(/Prova OR[A-Z_0-9]+/m);
const questionTitleRegex = new RegExp(
  /(SS_[PEDINTD]{2}_\d{1,3}|MdA|CORTA\s–\sPERF\.\sASSESS|MEDIA\s–\sVAL\.\sBIAS|LUNGA\s–\sFEED|LUNGA\s-\sRAV|ENGAGEMENT|DISCOVERY\sLEARNING|APPROCCI\sDIALOGICI|EDUCAZIONE\sFORMALE|LEARNING\sTHEORY|PROGETTAZIONE|SEL)/
);

export function getQuizTitle(text: string) {
  const res = quizTitleRegex.exec(text);

  if (res) return res[0];
}

export function getQuizSubtitle(text: string) {
  const res = quizSubtitleRegex.exec(text);

  if (res) return res[0];
}

export function splitText(text: string) {
  return text.split(questionTitleRegex);
}
