import { TQuizContext } from "@/contexts/QuizContext";
import { NotFound } from "@components/NotFound";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

export const Route = createRootRouteWithContext<TQuizContext>()({
  component: () => (
    <>
      <Outlet />
    </>
  ),
  notFoundComponent: () => <NotFound data />,
});
