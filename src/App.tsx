import "@/App.css";
import { router } from "@/main";
import { Quiz } from "@components/Quiz";
import { RouterProvider } from "@tanstack/react-router";
import { Dashboard } from "./components/Dashoard";
import { QuizProvider } from "./contexts/QuizContext";

function App() {
  return (
    <QuizProvider>
      <RouterProvider router={router} />
      <main>
        <Dashboard />
        <Quiz />
      </main>
    </QuizProvider>
  );
}

export default App;
