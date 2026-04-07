import { api } from './client';
import type { Job, JobStatusResponse } from '../../types';

export const jobsApi = {
  // GET /teams/{team_id}/jobs
  getAll: (teamId: string) => api.get<Job[]>(`/teams/${teamId}/jobs`),
  
  // POST /teams/{team_id}/jobs/generate
  create: (teamId: string, data: { source_type: string; path: string; api_dir?: string }) =>
    api.post<Job>(`/teams/${teamId}/jobs/generate`, data),
  
  // GET /teams/{team_id}/jobs/{job_id}
  getStatus: (teamId: string, jobId: string) =>
    api.get<JobStatusResponse>(`/teams/${teamId}/jobs/${jobId}`),

  // GET /jobs/{job_id}/status (Universal)
  getUniversalStatus: (jobId: string) =>
    api.get<JobStatusResponse>(`/jobs/${jobId}/status`),

  // Note: Logs are now handled via WebSocket (/ws/logs/{job_id})
  // DELETE /teams/{team_id}/jobs/{job_id}
  delete: (teamId: string, jobId: string) =>
    api.delete<any>(`/teams/${teamId}/jobs/${jobId}`),
};
