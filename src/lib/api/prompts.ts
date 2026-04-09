import { api } from '@/lib/api/client';
import type { PromptTemplate } from '@/types';

export const promptsAPI = {
  getByName: (teamId: string, name: string) =>
    api.get<PromptTemplate>(`/teams/${teamId}/prompts/${name}`),
  override: (teamId: string, name: string, content: string) =>
    api.post<PromptTemplate>(`/teams/${teamId}/prompts/${name}`, { content }),
  revert: (teamId: string, name: string) =>
    api.delete<any>(`/teams/${teamId}/prompts/${name}`),
};
