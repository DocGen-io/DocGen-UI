import { api } from './client';
import type { ProjectConfig, TeamConfig } from '../../types';

export const projectConfigAPI = {
  get: (teamId: string) => api.get<ProjectConfig>(`/teams/${teamId}/project-config`),
  update: (teamId: string, data: Partial<ProjectConfig>) =>
    api.put<ProjectConfig>(`/teams/${teamId}/project-config`, data),
};

export const teamConfigAPI = {
  get: (teamId: string) => api.get<TeamConfig>(`/teams/${teamId}/config`),
  update: (teamId: string, data: Partial<TeamConfig>) =>
    api.put<TeamConfig>(`/teams/${teamId}/config`, data),
};
