import { useState, useEffect } from "react";
import { getAccessToken } from "./use-auth";
import { ConnectionStatus, LogEntry } from "../types";
import { wsManager } from "../lib/websocket";

export function useJobLogs(jobId: string | undefined) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [status, setStatus] = useState<ConnectionStatus>("disconnected");
  const [error, setError] = useState<string | null>(null);

  const accessToken = getAccessToken();

  useEffect(() => {
    if (!jobId || !accessToken) return;

    // 1. Tell the manager to ensure we are connected
    wsManager.connect(jobId, accessToken);

    // 2. Subscribe to logs, status changes, and errors
    const unsubscribe = wsManager.subscribe({
      onLog: (log: LogEntry) => setLogs((prev: LogEntry[]) => [...prev, log]),
      onStatus: (newStatus) => setStatus(newStatus),
      onError: (newError) => setError(newError),
    });

    // 3. Cleanup: Automatically unsubscribe when component unmounts
    return () => {
      unsubscribe();
    };
  }, [jobId, accessToken]);

  const clearLogs = () => setLogs([]);

  return { logs, status, error, clearLogs };
}
