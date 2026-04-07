import { useEffect, useState } from 'react';
import { wsManager } from '../lib/websocket';
import type { LogEntry } from '../types';

export function useWebSocketLogs(jobId: string | undefined) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!jobId) return;

    setIsConnected(true);
    
    wsManager.connect(jobId, (log) => {
      setLogs((prev) => [...prev, log]);
    });

    return () => {
      wsManager.disconnect();
      setIsConnected(false);
    };
  }, [jobId]);

  return { logs, isConnected };
}
