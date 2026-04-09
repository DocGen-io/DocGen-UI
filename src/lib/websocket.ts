// WebSocketManager.ts

import { ConnectionStatus, LogEntry, Subscriber } from "@/types";

export class WebSocketManager {
  private ws: WebSocket | null = null;
  private subscribers: Map<string, Subscriber> = new Map();
  private currentStatus: ConnectionStatus = "disconnected";
  private currentError: string | null = null;

  private updateStatus(status: ConnectionStatus) {
    this.currentStatus = status;
    this.subscribers.forEach((sub) => sub.onStatus(status));
  }

  private updateError(error: string | null) {
    this.currentError = error;
    this.subscribers.forEach((sub) => sub.onError(error));
  }

  connect(jobId: string, accessToken: string): void {
    // Prevent reconnecting if already connecting/connected
    if (
      this.ws &&
      (this.ws.readyState === WebSocket.OPEN ||
        this.ws.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }

    const apiBase =
      import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";
    const wsBase = apiBase.replace(/^http/, "ws").replace(/\/api\/v1\/?$/, "");
    const wsUrl = `${wsBase}/ws/logs/${jobId}?token=${accessToken}`;

    console.log("[WS Manager] Connecting to:", wsUrl);

    this.updateStatus("connecting");
    this.updateError(null);

    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      console.log("[WS Manager] Connected");
      this.updateStatus("connected");
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "complete") {
          this.updateStatus("complete");
        } else if (data.level && data.message) {
          this.subscribers.forEach((sub) => sub.onLog(data));
        }
      } catch (e) {
        if (typeof event.data === "string" && event.data.trim()) {
          const fallbackLog: LogEntry = {
            job_id: jobId,
            timestamp: new Date().toISOString(),
            level: "info",
            message: event.data,
          };
          this.subscribers.forEach((sub) => sub.onLog(fallbackLog));
        }
      }
    };

    this.ws.onerror = (event) => {
      console.error("[WS Manager] Error:", event);
      this.updateError("Connection failed");
      this.updateStatus("disconnected");
    };

    this.ws.onclose = () => {
      console.log("[WS Manager] Disconnected");
      if (this.currentStatus !== "complete") {
        this.updateStatus("disconnected");
      }
      this.ws = null;
    };
  }

  subscribe(subscriber: Subscriber): () => void {
    const listenerId = Math.random().toString(36);
    this.subscribers.set(listenerId, subscriber);

    // Immediately sync the new subscriber with current state
    subscriber.onStatus(this.currentStatus);
    subscriber.onError(this.currentError);

    // Return unsubscribe function
    return () => {
      this.subscribers.delete(listenerId);

      // Cleanup WS if no components are listening anymore
      if (this.subscribers.size === 0 && this.ws) {
        this.ws.close();
        this.ws = null;
        this.currentStatus = "disconnected";
      }
    };
  }
}

export const wsManager = new WebSocketManager();
