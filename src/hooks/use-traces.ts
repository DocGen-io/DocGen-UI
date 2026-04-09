import { useQuery } from '@tanstack/react-query';
import { tracesAPI } from '@/lib/api/traces';

// Query Keys
export const traceKeys = {
  all: ['traces'] as const,
  job: (jobId: string) => [...traceKeys.all, 'job', jobId] as const,
  detail: (traceId: string) => [...traceKeys.all, 'detail', traceId] as const,
};

// Get traces for a specific job
export function useTracesForJob(jobId: string | undefined) {
  return useQuery({
    queryKey: traceKeys.job(jobId || ''),
    queryFn: () => tracesAPI.getForJob(jobId!),
    enabled: !!jobId,
    retry: false,
  });
}

// Get details for a specific trace span
// NOTE: Individual trace span fetching is currently handled by the job-level aggregate.
export function useTrace(teamId: string | undefined, traceId: string | undefined) {
  return useQuery({
    queryKey: traceKeys.detail(traceId || ''),
    queryFn: async () => null,
    enabled: !!traceId,
  });
}

// Support functions for UI placeholders
export function useTraces(teamId?: string) {
  return useQuery({
    queryKey: [...traceKeys.all, 'team', teamId],
    queryFn: async () => [],
    enabled: false,
  });
}

export function useTraceMetrics(teamId?: string) {
  return useQuery({
    queryKey: [...traceKeys.all, 'metrics', teamId],
    queryFn: async () => ({
      total_traces: 0,
      total_tokens: 0,
      total_cost: 0,
      avg_latency_ms: 0,
    }),
    enabled: false,
  });
}
