import "@/App.css";
import { router } from "@/main";
import QuizContext from "@contexts/QuizContext";
import { RouterProvider } from "@tanstack/react-router";
import { useQuizContext } from "./hooks/useQuizContext";

function App() {
  const { filePath, setFilePath } = useQuizContext();
  return (
    <QuizContext.Provider value={{ filePath, setFilePath }}>
      <main>
        <RouterProvider router={router} />
      </main>
    </QuizContext.Provider>
  );
}

export default App;
