import { createClient } from "@arizeai/phoenix-client";
import { getTraces } from "@arizeai/phoenix-client/traces";

// 1. Initialize the client instance using environment variables
// Use VITE_ prefix for client-side environment variables in Vite
const PHOENIX_HOST = import.meta.env.VITE_PHOENIX_HOST || "http://localhost:6006";

const phoenixClient = createClient({
  options: {
    baseUrl: PHOENIX_HOST,
  },
});

export interface PricingConfig {
  prompt_cost_per_1m: number;
  completion_cost_per_1m: number;
}

export const getProjectTraces = async (
  projectName: string,
  jobId?: string,
  pricing?: PricingConfig
) => {
  console.log(`[Phoenix] Fetching traces for project: "${projectName}", job: "${jobId || 'all'}"`);
  try {
    const filter = jobId ? { attributes: { contains: { key: 'job_id', value: jobId } } } : undefined;

    const result = await getTraces({
      project: { projectName: projectName },
      client: phoenixClient,
      limit: 50,
      filter: filter,
      includeSpans: true,
    } as any);

    // Process traces to include spans 
    return (result.traces || []).map((trace: any) => {
      const spans = (trace.spans || []).map((span: any) => {
        const promptTokens = span.cumulativeTokenCount?.prompt || 0;
        const completionTokens = span.cumulativeTokenCount?.completion || 0;
        const model = span.attributes?.['llm.model_name'] as string | undefined;

        let cost = span.attributes?.['llm.usage.cost'] || 0;

        // If pricing is provided manually in config, use it to calculate cost
        if (pricing && (pricing.prompt_cost_per_1m > 0 || pricing.completion_cost_per_1m > 0)) {
          const promptCost = (promptTokens / 1_000_000) * pricing.prompt_cost_per_1m;
          const completionCost = (completionTokens / 1_000_000) * pricing.completion_cost_per_1m;
          cost = promptCost + completionCost;
        }

        return {
          ...span,
          cost,
          model,
          promptTokens,
          completionTokens,
          totalTokens: span.cumulativeTokenCount?.total || 0
        };
      });

      const totalCost = spans.reduce((sum: number, s: any) => sum + s.cost, 0);
      const totalTokens = spans.reduce((sum: number, s: any) => sum + s.totalTokens, 0);

      return {
        id: trace.trace_id,
        startTime: trace.start_time,
        latencyMs: trace.latency_ms,
        spans,
        totalCost,
        totalTokens,
        spanCount: spans.length
      };
    });
  } catch (error) {
    console.error(`Failed to fetch traces for project: ${projectName}`, error);
    return [];
  }
};


export const getPhoenixProjects = async (): Promise<string[]> => {
  try {
    // Call Phoenix's REST API using the configured host
    const res = await fetch(`${PHOENIX_HOST}/v1/projects`);
    if (!res.ok) {
      console.error("[Phoenix] Project fetch failed with status:", res.status);
      return [];
    }
    const json = await res.json();
    console.log("[Phoenix] Available projects:", json?.data?.map((p: any) => p.name));
    return json?.data?.map((p: any) => p.name) || [];
  } catch (error) {
    console.error("Failed to fetch Phoenix projects", error);
    return [];
  }
};
