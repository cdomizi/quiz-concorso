import { Dashboard } from "@components/Dashboard/Dashboard";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  // Redirect user to home page if no quiz file has been selected
  beforeLoad: ({ context }) => {
    if (!context.quizState.filePath) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({ to: "/" });
    }
  },
});
