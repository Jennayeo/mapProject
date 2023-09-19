import { useCallback } from "react";
import { mutate } from "swr";
import type { Court } from "../types/court";

export const CURRENT_COURT_KEY = "/current-store";

const useCurrentCourt = () => {
  const setCurrentCourt = useCallback((court: Court) => {
    mutate(CURRENT_COURT_KEY, court);
  }, []);

  const clearCurrentCourt = useCallback(() => {
    mutate(CURRENT_COURT_KEY, null);
  }, []);

  return {
    setCurrentCourt,
    clearCurrentCourt,
  };
};
export default useCurrentCourt;
