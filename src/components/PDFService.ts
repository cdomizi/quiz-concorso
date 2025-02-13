const quizTitleRegex = new RegExp(/^Domande\s+\d+/);
const quizSubtitleRegex = new RegExp(/Prova OR[A-Z_0-9]+/m);
const questionTitleRegex = new RegExp(/SS_PP_\d+/m);

export function getQuizTitle(text: string) {
  const res = quizTitleRegex.exec(text)

  if (res) return res[0];
}

export function getQuizSubtitle(text: string) {
  const res = quizSubtitleRegex.exec(text)

  if (res) return res[0];
}
