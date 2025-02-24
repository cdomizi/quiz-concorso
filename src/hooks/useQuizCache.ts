import { useLocalStorage } from "./useLocalStorage";
import { TQuiz } from "./useQuizContext";

const QUIZ_LOCALSTORAGE_KEY = "quizState";

export function useQuizCache() {
  const { getCurrentValue, setValue, deleteValue } = useLocalStorage<TQuiz>(
    QUIZ_LOCALSTORAGE_KEY
  );

  function getQuizState() {
    const cachedQuizState = getCurrentValue();

    return cachedQuizState || {};
  }

  return {
    getQuizState,
    setQuizState: setValue,
    deleteQuizState: deleteValue,
  };
}
