import { useTeamStore } from '@/stores/team-store';
import { useTraces, useTraceMetrics } from '@/hooks/use-traces';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bug, Info, AlertCircle, ExternalLink } from 'lucide-react';
import { EmptyState } from '@/components/shared/empty-state';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';

export function TracesPage() {
  const navigate = useNavigate();
  const { activeTeam } = useTeamStore();
  const { isError: metricsError } = useTraceMetrics(activeTeam?.id);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <PageHeader
        title="AI Traces & Observability"
        description="Detailed insights into LLM interactions and performance."
      />

      <Alert className="bg-primary/5 border-primary/20">
        <Info className="h-5 w-5 text-primary" />
        <AlertTitle className="text-lg font-semibold">Observability Architecture</AlertTitle>
        <AlertDescription className="mt-2 text-muted-foreground leading-relaxed">
          Tracing is currently anchored to individual **Documentation Jobs**. 
          To view technical spans, token costs, and detailed latencies, please navigate to a specific job's detail page.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 overflow-hidden border-border/60">
          <CardHeader className="bg-muted/30 border-b">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bug className="h-5 w-5 text-primary/70" />
              Trace Exploration
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-12 text-center space-y-6">
              <EmptyState
                icon={Bug}
                title="Job-Level Context Required"
                description="Global trace history is currently being refactored to support distributed team metrics."
              />
              <div className="flex justify-center gap-4 pt-4">
                <Button onClick={() => navigate('/jobs')} variant="outline" className="gap-2">
                  Browse Recent Jobs
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-lg">Tracing Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground font-medium">Phoenix Engine</span>
                <span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-[10px] font-bold uppercase tracking-wider">Operational</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground font-medium">Metric Aggregation</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 text-[10px] font-bold uppercase tracking-wider">Job-Only</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-muted/30 border space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">About Phoenix</h4>
              <p className="text-xs text-muted-foreground leading-normal">
                We use Phoenix by Arize to provide state-of-the-art observability for our documentation agent, 
                capturing every prompt, response, and cost metric.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {metricsError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Telemetry Service Unavailable</AlertTitle>
          <AlertDescription>
            The observability backend encountered an error. Please ensure the Phoenix service is running in your environment.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
