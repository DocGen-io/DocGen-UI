import { useTeamStore } from "@/stores/team-store";
import { useProjectTraces, useProjectMetrics } from "@/hooks/use-phoenix";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Bug, Info, AlertCircle, Zap, Timer } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useProjectDiscovery } from "@/hooks/use-project-discovery";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TraceItem from "@/components/traces/trace-item";
import MetricCard from "@/components/traces/metric-card";

export function TracesPage() {
  const { activeTeam } = useTeamStore();
  const { projectName, setProjectName, availableProjects } = useProjectDiscovery();
  const { data: traces, isLoading, isError } = useProjectTraces(activeTeam, projectName);
  const { data: metrics } = useProjectMetrics(activeTeam, projectName);
  const [expandedTraceId, setExpandedTraceId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <span className="flex items-center gap-3 text-muted-foreground animate-pulse">
          <Zap className="h-5 w-5 animate-bounce" />
          Synchronizing Phoenix Telemetry...
        </span>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <PageHeader
        title="AI Traces & Observability"
        description="Monitor LLM spans, token usage, and costs across your team projects."
        action={
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Project:</span>
            <Select value={projectName} onValueChange={(val) => val && setProjectName(val)}>
              <SelectTrigger className="w-[200px] h-9 bg-background">
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                {availableProjects.length > 0 ? (
                  availableProjects.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value={projectName} disabled>
                    {projectName}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        }
      />

      {/* Metrics Summary Panels */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard title="Total Spans" value={metrics?.total_traces || 0} icon={Bug} />
        <MetricCard title="Total Tokens" value={metrics?.total_tokens?.toLocaleString() || 0} icon={Zap} />
        <MetricCard
          title="Total Cost"
          value={`$${metrics?.total_cost?.toFixed(4) || "0.0000"}`}
          icon={Info}
          highlight
        />
        <MetricCard title="Avg Latency" value={`${metrics?.avg_latency_ms?.toFixed(0) || 0}ms`} icon={Timer} />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Bug className="h-5 w-5 text-primary" />
          Trace Explorer
        </h3>

        {!traces || traces.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="p-12">
              <EmptyState
                icon={Bug}
                title="No Traces Found"
                description={`Phoenix hasn't captured any LLM spans for ${projectName} yet.`}
              />
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {traces.map((trace: any) => (
              <TraceItem
                key={trace.id}
                trace={trace}
                isExpanded={expandedTraceId === trace.id}
                onToggle={() => setExpandedTraceId(expandedTraceId === trace.id ? null : trace.id)}
              />
            ))}
          </div>
        )}
      </div>

      {isError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Telemetry Service Connection Failed</AlertTitle>
          <AlertDescription>
            Could not reach the Phoenix endpoint. Ensure your backend is running.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

