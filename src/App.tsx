import "@/App.css";
import { Quiz } from "@components/Quiz";
import { Dashboard } from "./components/Dashoard";
import { Home } from "./components/Home";
import { QuizProvider } from "./contexts/QuizContext";

function App() {
  return (
    <QuizProvider>
      <main>
        <Home />
        <Dashboard />
        <Quiz />
      </main>
    </QuizProvider>
  );
}

export default App;
