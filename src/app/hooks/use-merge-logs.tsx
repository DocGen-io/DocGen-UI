import { useMemo } from "react";
import type { LogEntry } from "../types"; // Adjust import as needed

export function useMergedLogs(
  historicalLogs: LogEntry[] = [],
  realtimeLogs: LogEntry[] = [],
) {
  return useMemo(() => {
    const merged = [...historicalLogs];

    realtimeLogs.forEach((rl) => {
      // Prevent duplicates
      const isDuplicate = historicalLogs.some(
        (hl) => hl.message === rl.message && hl.timestamp === rl.timestamp,
      );
      if (!isDuplicate) {
        merged.push(rl);
      }
    });

    return merged;
  }, [historicalLogs, realtimeLogs]);
}
