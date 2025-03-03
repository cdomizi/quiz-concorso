import { FileRoutesByPath, useNavigate } from "@tanstack/react-router";

export function useRedirect({
  destination,
  condition,
}: {
  destination: keyof FileRoutesByPath;
  condition: boolean | undefined;
}) {
  const navigate = useNavigate();

  if (condition)
    return () => {
      void navigate({ to: destination });
    };
}
