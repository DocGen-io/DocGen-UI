import { api } from '@/lib/api/client';
import type { AITrace, TraceMetrics } from '@/types';

export const tracesAPI = {
  getForJob: (jobId: string) => api.get<any>(`/traces/${jobId}`),
  // Note: Backend currently only supports per-job traces
};
