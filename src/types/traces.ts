// ==================== AI Traces ====================

export interface AITrace {
  id: string;
  team_id: string;
  job_id?: string;
  model: string;
  prompt: string;
  response: string;
  tokens_used: number;
  latency_ms: number;
  cost_usd: number;
  status: "success" | "error";
  error_message?: string;
  created_at: string;
  metadata?: Record<string, any>;
}

export interface TraceMetrics {
  total_traces: number;
  total_tokens: number;
  total_cost: number;
  avg_latency_ms: number;
  success_rate: number;
}
