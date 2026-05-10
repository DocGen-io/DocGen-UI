import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/client";

export interface DashboardStatsResponse {
  total_jobs: number;
  pending_revisions: number;
  total_projects: number;
  total_members: number;
}

export function useDashboardStats(teamId: string | undefined) {
  return useQuery({
    queryKey: ["dashboard-stats", teamId],
    queryFn: async () => {
      if (!teamId) throw new Error("No team ID provided");
      const data = await api.get<DashboardStatsResponse>(`/teams/${teamId}/dashboard-stats`);
      return data;
    },
    enabled: !!teamId,
  });
}
