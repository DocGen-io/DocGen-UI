// ==================== WebSocket Messages ====================

export interface WebSocketMessage {
  type: "log" | "status" | "error" | "complete";
  data: any;
  timestamp: string;
}

export interface WebSokectLogEntry {
  timestamp: string;
  level: "debug" | "info" | "warning" | "error" | "success";
  message: string;
  logger?: string;
}

export type ConnectionStatus =
  | "connecting"
  | "connected"
  | "disconnected"
  | "complete";

export interface Subscriber {
  onLog: (log: WebSokectLogEntry) => void;
  onStatus: (status: ConnectionStatus) => void;
  onError: (error: string | null) => void;
}
