import { api } from '@/lib/api/client';
import type { Revision, RevisionSummary } from '@/types';

export const revisionsAPI = {
  getAll: (teamId: string, status?: string, jobId?: string) => {
    const params = new URLSearchParams();
    if (status) params.append('rev_status', status);
    if (jobId) params.append('job_id', jobId);
    const queryString = params.toString();
    const url = `/${teamId}/docs/revisions${queryString ? `?${queryString}` : ''}`;
    return api.get<Revision[]>(url);
  },
  approve: (teamId: string, revisionId: string) =>
    api.post<Revision>(`/${teamId}/docs/approve/${revisionId}`, {}),
  reject: (teamId: string, revisionId: string) =>
    api.post<Revision>(`/${teamId}/docs/reject/${revisionId}`, {}),
  propose: (teamId: string, data: any) =>
    api.post<Revision>(`/${teamId}/docs/propose`, data),
};
