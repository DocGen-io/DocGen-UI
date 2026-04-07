// ==================== WebSocket Messages ====================

export interface WebSocketMessage {
  type: "log" | "status" | "error" | "complete";
  data: any;
  timestamp: string;
}
