import { useEffect } from "react";

const ESC_KEY = "Escape";

export const useHandleEscKeydown = (callback: () => void) => {
  useEffect(() => {
    function handleEscKeydown(event: KeyboardEvent) {
      if (event.key === ESC_KEY) {
        callback();
      }
    }
    document.addEventListener("keydown", handleEscKeydown);
    return () => document.removeEventListener("keydown", handleEscKeydown);
  }, [callback]);
};
