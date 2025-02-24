import "@/App.css";
import { router } from "@/main";
import QuizContext from "@contexts/QuizContext";
import { useQuizContext } from "@hooks/useQuizContext";
import { RouterProvider } from "@tanstack/react-router";

function App() {
  const { quizState, dispatch } = useQuizContext();

  return (
    <QuizContext.Provider value={{ quizState, dispatch }}>
      <main>
        <RouterProvider router={router} context={{ quizState, dispatch }} />
      </main>
    </QuizContext.Provider>
  );
}

export default App;
