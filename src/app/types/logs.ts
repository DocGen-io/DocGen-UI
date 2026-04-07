// ==================== Logs ====================

export interface LogEntry {
  id: string;
  job_id: string;
  level: "debug" | "info" | "warning" | "error" | "success";
  message: string;
  timestamp: string;
  metadata?: Record<string, any>;
}
