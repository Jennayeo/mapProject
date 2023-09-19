import { useCallback } from "react";
import { Court } from "../types/court";
import { mutate } from "swr";

export const COURT_KEY = "/courts";

const useCourts = () => {
  const initializeCourts = useCallback((courts: Court[]) => {
    mutate(COURT_KEY, courts);
  }, []);

  return {
    initializeCourts,
  };
};
export default useCourts;
