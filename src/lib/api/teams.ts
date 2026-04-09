import { api } from '@/lib/api/client';
import type { Team, TeamMember, TeamConfig } from '@/types';

export const teamsAPI = {
  create: (data: { name: string; description?: string }) =>
    api.post<Team>('/teams/', data),
  getAll: () => api.get<Team[]>('/teams/me'),
  getById: (teamId: string) => api.get<Team>(`/teams/${teamId}`),
  getMembers: (teamId: string) => api.get<TeamMember[]>(`/teams/${teamId}/members`),
  invite: (teamId: string, userId: string) =>
    api.post<any>(`/teams/${teamId}/invite/${userId}`, {}),
  respondToInvitation: (teamId: string, invitationId: string, accept: boolean) =>
    api.post<any>(`/teams/${teamId}/invitations/${invitationId}/respond`, { accept }),
  regenerateInviteLink: (teamId: string) =>
    api.post<Team>(`/teams/${teamId}/invite-link/regenerate`, {}),
  getInviteLink: (teamId: string) => 
    api.get<{ invite_link: string }>(`/teams/${teamId}`), // invite_token is in TeamResponse
  getConfig: (teamId: string) => api.get<TeamConfig>(`/teams/${teamId}/config/`),
  update: (teamId: string, data: { description?: string; is_public?: boolean }) =>
    api.patch<Team>(`/teams/${teamId}`, data),
  async search(query: string = '') {
    return api.get<Team[]>(`/teams/search?q=${encodeURIComponent(query)}`);
  },
  async getByToken(token: string) {
    return api.get<Team>(`/teams/invite/${token}`);
  },
  async requestJoin(teamId: string) {
    return api.post<any>(`/teams/${teamId}/request-join`, {});
  },
  getPendingInvitations: (teamId: string) =>
    api.get<any[]>(`/teams/${teamId}/invitations`),
  updateMemberRole: (teamId: string, userId: string, role: string) =>
    api.patch<any>(`/teams/${teamId}/members/${userId}/role`, { role }),
  updateConfig: (teamId: string, data: any) =>
    api.post<any>(`/teams/${teamId}/config/`, { config_data: data }),
};
