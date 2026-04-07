import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { jobsApi } from '../lib/api/jobs';
import { toast } from 'sonner';
import type { Job, JobStatusResponse } from '../types';

// Query Keys
export const jobKeys = {
  all: ['jobs'] as const,
  lists: () => [...jobKeys.all, 'list'] as const,
  list: (teamId: string) => [...jobKeys.lists(), teamId] as const,
  details: () => [...jobKeys.all, 'detail'] as const,
  detail: (teamId: string, jobId: string) => [...jobKeys.details(), teamId, jobId] as const,
};

// Get all jobs for a team
export function useJobs(teamId: string | undefined) {
  return useQuery({
    queryKey: jobKeys.list(teamId || ''),
    queryFn: () => jobsApi.getAll(teamId!),
    enabled: !!teamId,
  });
}

// Get specific job status with intelligent auto-polling
export function useJobStatus(teamId: string | undefined, jobId: string | undefined) {
  return useQuery({
    queryKey: jobKeys.detail(teamId || '', jobId || ''),
    queryFn: () => jobsApi.getStatus(teamId!, jobId!),
    enabled: !!jobId && !!teamId,
    refetchInterval: (query) => {
      const data = query.state.data as JobStatusResponse | undefined;
      const job = data?.job;
      // Poll every 2 seconds if job is running/processing
      return job?.status === 'running' || job?.status === 'processing' ? 2000 : false;
    },
  });
}

// Get job logs - MOVED TO use-job-logs.ts for WebSocket support

// Create new job
export function useCreateJob(teamId: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { source_type: string; path: string; api_dir?: string }) =>
      jobsApi.create(teamId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jobKeys.list(teamId) });
      toast.success('Job started successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to start job');
    },
  });
}

// Delete job
export function useDeleteJob(teamId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobId: string) => jobsApi.delete(teamId, jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jobKeys.list(teamId) });
      toast.success('Job deleted');
    },
    onError: () => {
      toast.error('Failed to delete job');
    },
  });
}
