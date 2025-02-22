import "@/App.css";
import { Quiz } from "@components/Quiz";
import { Home } from "./components/Home";
import { QuizProvider } from "./contexts/QuizContext";

function App() {
  return (
    <QuizProvider>
      <main>
        <Home />
        <Quiz />
      </main>
    </QuizProvider>
  );
}

export default App;
