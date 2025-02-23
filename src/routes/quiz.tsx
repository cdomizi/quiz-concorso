import { Quiz } from "@components/Quiz/Quiz";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/quiz")({
  component: Quiz,
  // Redirect user to home page if no quiz file has been selected
  beforeLoad: ({ context }) => {
    if (!context.filePath) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({ to: "/" });
    }
  },
});
