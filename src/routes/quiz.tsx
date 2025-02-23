import { Quiz } from "@components/Quiz/Quiz";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/quiz")({
  component: Quiz,
});
