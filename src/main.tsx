/* eslint-disable @typescript-eslint/consistent-type-definitions */
import App from "@/App";
import { createHashHistory, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

// Import the generated route tree
import { routeTree } from "@/routeTree.gen";

// Set up memory routing for deployment on GitHub pages
const hashHistory = createHashHistory();

// Create a new router instance
export const router = createRouter({
  routeTree,
  history: hashHistory,
  context: {
    quizState: undefined!,
    dispatch: undefined!,
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
