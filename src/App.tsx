import "@/App.css";
import { router } from "@/main";
import { RouterProvider } from "@tanstack/react-router";
import { QuizProvider } from "./contexts/QuizContext";

function App() {
  return (
    <QuizProvider>
      <main>
        <RouterProvider router={router} />
      </main>
    </QuizProvider>
  );
}

export default App;
