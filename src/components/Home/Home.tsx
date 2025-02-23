import { ButtonLink } from "@components/ButtonLink";
import { QuizFileSelect } from "@components/Home/QuizFileSelect";

export function Home() {
  return (
    <div>
      <QuizFileSelect />
      <ButtonLink to="/dashboard">Vai al quiz</ButtonLink>
    </div>
  );
}
