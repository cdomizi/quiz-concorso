import { Link } from "@tanstack/react-router";
import { QuizFileSelect } from "./QuizFileSelect";

export function Home() {
  return (
    <div>
      <QuizFileSelect />
      <Link to="/dashboard">Vai al quiz</Link>
    </div>
  );
}
