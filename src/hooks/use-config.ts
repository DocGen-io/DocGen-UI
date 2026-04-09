import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { teamsAPI } from '@/lib/api/teams';
import { promptsAPI } from '@/lib/api/prompts';
import type { TeamConfig, PromptTemplate } from '@/types';
import { toast } from 'sonner';

// ==================== Team Configuration Hooks ====================

export function useTeamConfig(teamId: string | undefined) {
  return useQuery({
    queryKey: ['team-config', teamId],
    queryFn: () => teamsAPI.getConfig(teamId!),
    enabled: !!teamId,
  });
}

export function useUpdateTeamConfig(teamId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<TeamConfig>) => 
      teamsAPI.updateConfig(teamId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-config', teamId] });
      toast.success('Team configuration updated!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update configuration');
    }
  });
}

// ==================== Prompt Templates Hooks ====================

export function usePromptTemplate(teamId: string | undefined, name: string | undefined) {
  return useQuery({
    queryKey: ['prompt-template', teamId, name],
    queryFn: () => promptsAPI.getByName(teamId!, name!),
    enabled: !!teamId && !!name,
  });
}

export function useUpdatePromptTemplate(teamId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ name, content }: { name: string; content: string }) => 
      promptsAPI.override(teamId, name, content),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['prompt-template', teamId, variables.name] });
      toast.success('Prompt template updated!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update prompt');
    }
  });
}

export function useRevertPromptTemplate(teamId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => promptsAPI.revert(teamId, name),
    onSuccess: (_, name) => {
      queryClient.invalidateQueries({ queryKey: ['prompt-template', teamId, name] });
      toast.success('Reverted to system default');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to revert prompt');
    }
  });
}
