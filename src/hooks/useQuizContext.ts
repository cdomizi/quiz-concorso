import { useState } from "react";

export function useQuizContext() {
  const [filePath, setFilePath] = useState<string | undefined>();

  return { filePath, setFilePath };
}
