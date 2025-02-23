import { QuizFileSelect } from "@components/Home/QuizFileSelect";
import { Link } from "@tanstack/react-router";

export function Home() {
  return (
    <div>
      <QuizFileSelect />
      <Link to="/dashboard">Vai al quiz</Link>
    </div>
  );
}
