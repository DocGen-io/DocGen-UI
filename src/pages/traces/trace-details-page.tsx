import { useParams, useNavigate } from 'react-router';
import { useTrace } from '@/hooks/use-traces';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bug, Search } from 'lucide-react';
import { EmptyState } from '@/components/shared/empty-state';

export function TraceDetailsPage() {
  const { traceId } = useParams<{ traceId: string }>();
  const navigate = useNavigate();
  const { isLoading } = useTrace(undefined, traceId);

  if (isLoading) {
    return <div className="p-8 flex items-center justify-center h-full">Loading telemetry...</div>;
  }

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <PageHeader
        title={
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/traces')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <span>Trace Inspector</span>
          </div>
        }
      />

      <div className="bg-card border rounded-2xl p-12 text-center space-y-6 shadow-sm ring-1 ring-border/50">
        <EmptyState
          icon={Search}
          title="Direct Trace Access Limited"
          description="Individual trace spans are now grouped within their respective Documentation Jobs for better context and correlation."
        />
        
        <div className="flex flex-col items-center gap-4 pt-4">
          <p className="text-sm text-muted-foreground max-w-sm">
            To inspect the specific LLM interactions for ID <code className="bg-muted px-1.5 py-0.5 rounded text-primary font-mono text-xs">{traceId}</code>, 
            please visit the **Job Details** page of the job that initiated this request.
          </p>
          <div className="flex gap-3">
            <Button onClick={() => navigate('/jobs')} variant="default">
              Navigate to Jobs
            </Button>
            <Button onClick={() => navigate('/traces')} variant="outline">
              Back to Traces
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-6 rounded-xl bg-primary/5 border border-primary/10 flex items-start gap-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Bug className="h-5 w-5 text-primary" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-primary">Why did this change?</h4>
          <p className="text-xs text-primary/70 leading-relaxed">
            We've modernized our observability stack to provide a more holistic view of the documentation generation process. 
            By grouping traces by job, you can see how individual AI steps contribute to the overall documentation outcome.
          </p>
        </div>
      </div>
    </div>
  );
}
