import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { revisionsAPI } from '@/lib/api/revisions';
import type { Revision, ProposeRevisionRequest } from '@/types';
import { toast } from 'sonner';

// Query Keys
export const revisionKeys = {
  all: ['revisions'] as const,
  lists: () => [...revisionKeys.all, 'list'] as const,
  propose: (endpoint_id: string) => [...revisionKeys.all, 'propose', endpoint_id] as const,
  list: (teamId: string) => [...revisionKeys.lists(), teamId] as const,
};

// Get all revisions for a team, optionally filtered by status or job
export function useRevisions(teamId: string | undefined, status?: string, jobId?: string) {
  return useQuery({
    queryKey: [...revisionKeys.list(teamId || ''), status, jobId],
    queryFn: () => revisionsAPI.getAll(teamId!, status, jobId),
    enabled: !!teamId,
  });
}

// Approve revision mutation
export function useApproveRevision(teamId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (revisionId: string) =>
      revisionsAPI.approve(teamId, revisionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: revisionKeys.list(teamId) });
      toast.success('Revision approved!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to approve revision');
    },
  });
}

// Reject revision mutation
export function useRejectRevision(teamId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (revisionId: string) =>
      revisionsAPI.reject(teamId, revisionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: revisionKeys.list(teamId) });
      toast.success('Revision rejected');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to reject revision');
    },
  });
}

// Propose revision mutation
export function useProposeRevision(teamId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProposeRevisionRequest) => revisionsAPI.propose(teamId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: revisionKeys.list(teamId) });
      toast.success('Revision proposed!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to propose revision');
    },
  });
}
