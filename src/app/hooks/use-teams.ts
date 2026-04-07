import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { teamsAPI } from '../lib/api/teams';
import type { CreateTeamRequest, UpdateTeamConfigRequest } from '../types';
import { toast } from 'sonner';

// Query Keys
export const teamKeys = {
  all: ['teams'] as const,
  lists: () => [...teamKeys.all, 'list'] as const,
  list: () => [...teamKeys.lists()] as const,
  details: () => [...teamKeys.all, 'detail'] as const,
  detail: (id: string) => [...teamKeys.details(), id] as const,
  members: (id: string) => [...teamKeys.detail(id), 'members'] as const,
  config: (id: string) => [...teamKeys.detail(id), 'config'] as const,
};

// Get all user's teams
export function useTeams() {
  return useQuery({
    queryKey: teamKeys.list(),
    queryFn: teamsAPI.getAll,
  });
}

// Get specific team
export function useTeam(teamId: string | undefined) {
  return useQuery({
    queryKey: teamKeys.detail(teamId || ''),
    queryFn: () => teamsAPI.getById(teamId!),
    enabled: !!teamId,
  });
}

// Get team members
export function useTeamMembers(teamId: string | undefined) {
  return useQuery({
    queryKey: teamKeys.members(teamId || ''),
    queryFn: () => teamsAPI.getMembers(teamId!),
    enabled: !!teamId,
  });
}

// Get team configuration
export function useTeamConfig(teamId: string | undefined) {
  return useQuery({
    queryKey: teamKeys.config(teamId || ''),
    queryFn: () => teamsAPI.getConfig(teamId!),
    enabled: !!teamId,
  });
}

// Create team mutation
export function useCreateTeam() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateTeamRequest) => teamsAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.list() });
      toast.success('Team created successfully!');
    },
    onError: () => {
      toast.error('Failed to create team');
    },
  });
}

// Update team configuration mutation
export function useUpdateTeamConfig(teamId: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<UpdateTeamConfigRequest>) => teamsAPI.updateConfig(teamId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.config(teamId) });
      toast.success('Configuration updated successfully!');
    },
    onError: () => {
      toast.error('Failed to update configuration');
    },
  });
}

// Invite user mutation
export function useInviteUser(teamId: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userId: string) => teamsAPI.invite(teamId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.members(teamId) });
      toast.success('Invitation sent!');
    },
    onError: () => {
      toast.error('Failed to send invitation');
    },
  });
}

// Regenerate invite link mutation
export function useRegenerateInviteLink(teamId: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => teamsAPI.regenerateInviteLink(teamId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.detail(teamId) });
      toast.success('Invite link regenerated!');
    },
    onError: () => {
      toast.error('Failed to regenerate invite link');
    },
  });
}
// Update team mutation
export function useUpdateTeam(teamId: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { description?: string; is_public?: boolean }) => teamsAPI.update(teamId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.detail(teamId) });
      queryClient.invalidateQueries({ queryKey: teamKeys.list() });
      toast.success('Team updated successfully!');
    },
    onError: () => {
      toast.error('Failed to update team');
    },
  });
}

// Search public teams
export function usePublicTeams(search: string = '') {
  return useQuery({
    queryKey: ['teams', 'public', search],
    queryFn: () => teamsAPI.search(search),
  });
}

export function useTeamByToken(token: string) {
  return useQuery({
    queryKey: ['teams', 'invite', token],
    queryFn: () => teamsAPI.getByToken(token),
    enabled: !!token,
  });
}

// Request to join team
export function useRequestJoin() {
  return useMutation({
    mutationFn: (teamId: string) => teamsAPI.requestJoin(teamId),
    onSuccess: () => {
      toast.success('Join request sent!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to send join request');
    },
  });
}

// Update member role
export function useUpdateMemberRole(teamId: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: string }) => 
      teamsAPI.updateMemberRole(teamId, userId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.members(teamId) });
      toast.success('Role updated successfully!');
    },
    onError: () => {
      toast.error('Failed to update role');
    },
  });
}

// Respond to invitation
export function useRespondToInvitation(teamId: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ invitationId, accept }: { invitationId: string; accept: boolean }) => 
      teamsAPI.respondToInvitation(teamId, invitationId, accept),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.members(teamId) });
      queryClient.invalidateQueries({ queryKey: [...teamKeys.detail(teamId), 'invitations'] });
      toast.success('Response processed!');
    },
  });
}

// Get pending invitations
export function usePendingInvitations(teamId: string | undefined) {
  return useQuery({
    queryKey: [...teamKeys.detail(teamId || ''), 'invitations'],
    queryFn: () => teamsAPI.getPendingInvitations(teamId!),
    enabled: !!teamId,
  });
}
