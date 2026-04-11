import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { endpointsApi } from "@/lib/api/endpoints";
import { jobsApi } from "@/lib/api/jobs";
import { toast } from "sonner";

export function useAvailableProjects(teamId?: string) {
  return useQuery({
    queryKey: ["available-projects", teamId],
    queryFn: () => endpointsApi.listProjects(teamId),
    enabled: !!teamId, // Only fetch if teamId is available
  });
}

export function useEndpoints(projectName: string, teamId: string | undefined) {
  const listingJob = useQuery({
    queryKey: ["endpoints-job-trigger", projectName, teamId],
    queryFn: () => endpointsApi.listEndpoints(projectName, teamId!),
    enabled: !!projectName && !!teamId,
    staleTime: 30000, // Don't re-trigger too often
  });

  const jobId = listingJob.data?.id;

  return useQuery({
    queryKey: ["endpoints", projectName, jobId],
    queryFn: () => jobsApi.getUniversalStatus(jobId!),
    enabled: !!jobId,
    refetchInterval: (query) =>
      query.state.data?.job?.status === "completed" ||
      query.state.data?.job?.status === "failed"
        ? false
        : 1000,
    select: (data) => ({
      endpoints: data.job?.result?.endpoints || {},
    }),
  });
}

export function useSearchJob(searchJobId: string | null) {
  return useQuery({
    queryKey: ["search-job", searchJobId],
    queryFn: () => jobsApi.getUniversalStatus(searchJobId!),
    enabled: !!searchJobId,
    refetchInterval: (query) =>
      query.state.data?.job?.status === "completed" ||
      query.state.data?.job?.status === "failed"
        ? false
        : 2000,
  });
}

export function useClusterJob(clusterJobId: string | null) {
  return useQuery({
    queryKey: ["cluster-job", clusterJobId],
    queryFn: () => jobsApi.getUniversalStatus(clusterJobId!),
    enabled: !!clusterJobId,
    refetchInterval: (query) =>
      query.state.data?.job?.status === "completed" ||
      query.state.data?.job?.status === "failed"
        ? false
        : 2000,
  });
}

export function useSemanticSearch(projectName: string, team_id: string) {
  return useMutation({
    mutationFn: (query: string) =>
      endpointsApi.queryEndpoints(projectName, query, team_id),
  });
}

export function useClustering(projectName: string, team_id: string) {
  return useMutation({
    mutationFn: () => endpointsApi.getClusters(projectName, team_id),
  });
}

export function useRerunPipeline(
  projectName: string,
  teamId: string | undefined,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      jobsApi.create(teamId || "", {
        source_type: "local",
        path: projectName,
      }),
    onSuccess: () => {
      toast.success("Pipeline execution started");
      queryClient.invalidateQueries({ queryKey: ["endpoints", projectName] });
    },
    onError: (err: any) =>
      toast.error(`Failed to start pipeline: ${err.message}`),
  });
}

export function useGenerateExamples(projectName: string, teamId: string) {
  return useMutation({
    mutationFn: ({ path, method }: { path: string; method: string }) =>
      endpointsApi.generateExamples(projectName, teamId, path, method),
    onSuccess: () => {
      toast.success("Example generation job started");
    },
    onError: (err: any) =>
      toast.error(`Failed to start example generation: ${err.message}`),
  });
}

export function useExampleJob(jobId: string | null) {
  return useQuery({
    queryKey: ["example-job", jobId],
    queryFn: () => jobsApi.getUniversalStatus(jobId!),
    enabled: !!jobId,
    refetchInterval: (query) =>
      query.state.data?.job?.status === "completed" ||
      query.state.data?.job?.status === "failed"
        ? false
        : 1500, // Faster polling for examples
  });
}
