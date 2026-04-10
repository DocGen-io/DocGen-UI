import { useQuery } from "@tanstack/react-query";
import { getProjectTraces, getPhoenixProjects } from "@/utils/phoenix-client";
import { useTeamConfig } from "@/hooks/use-config";
import type { Team, TeamConfig, UpdateTeamConfigRequest } from "@/types";

export const phoenixKeys = {
    all: ["phoenix"] as const,
    projects: () => [...phoenixKeys.all, "projects"] as const,
    traces: (projectName: string) => [...phoenixKeys.all, "traces", projectName] as const,
};

/**
 * Hook to get all available projects from Phoenix.
 */
export function useAvailablePhoenixProjects() {
    return useQuery({
        queryKey: phoenixKeys.projects(),
        queryFn: getPhoenixProjects,
        staleTime: 30000,
    });
}

/**
 * Hook to get traces for a specific project.
 */
export function useProjectTraces(activeTeam: Team | null, projectName: string | undefined, jobId?: string) {
    const phoenixProjectName = projectName || "default";

    const { data: configWrapper } = useTeamConfig(activeTeam?.id);
    const config = configWrapper?.config_data || configWrapper;

    // Extract pricing from configuration if available
    const pricing = config ? {
        prompt_cost_per_1m: (config as UpdateTeamConfigRequest).prompt_cost_per_1m || 0,
        completion_cost_per_1m: (config as UpdateTeamConfigRequest).completion_cost_per_1m || 0
    } : undefined;

    return useQuery({
        queryKey: [
            ...phoenixKeys.traces(phoenixProjectName),
            jobId,
            pricing
        ].filter(Boolean),
        queryFn: () => getProjectTraces(phoenixProjectName, jobId, pricing),
        enabled: !!phoenixProjectName && !!activeTeam,
    });
}

/**
 * Hook to get metrics summary for a project.
 */
export function useProjectMetrics(activeTeam: Team | null, projectName: string | undefined) {
    const { data: traces, isLoading, isError } = useProjectTraces(activeTeam, projectName);

    const metrics = traces ? {
        total_traces: traces.length,
        total_tokens: traces.reduce((sum: number, t: any) => sum + (t as any).totalTokens, 0),
        total_cost: traces.reduce((sum: number, t: any) => sum + (t as any).totalCost, 0),
        avg_latency_ms: traces.length > 0
            ? traces.reduce((sum: number, t: any) => sum + (t as any).latencyMs, 0) / traces.length
            : 0,
        success_rate: 100,
    } : null;

    return { data: metrics, isLoading, isError };
}