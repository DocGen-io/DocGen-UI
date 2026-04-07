// pages/job-details-page.tsx
import { useParams, useNavigate } from "react-router";
import { useJobStatus } from "../../hooks/use-jobs";
import { useJobLogs } from "../../hooks/use-job-logs";
import { useRevisions } from "../../hooks/use-revisions";
import { useTracesForJob } from "../../hooks/use-traces";
import { useTeamStore } from "../../stores/team-store";

import { PageHeader } from "../../components/shared/page-header";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { ArrowLeft } from "lucide-react";

import { JobStatusBadge } from "../../components/jobs/job-status-badge";
import { JobInfoCard } from "../../components/jobs/job-info-card";
import { TraceSummaryCard } from "../../components/jobs/trace-summary-card";
import { LogViewer } from "../../components/jobs/log-viewer";

import { JobArtifactsCard } from "../../components/jobs/job-artifacts-card";
import { useMergedLogs } from "../../hooks/use-merge-logs";
import JobLoadingState from "../../components/jobs/job-loading";
import JobErrorState from "../../components/jobs/job-error";

export function JobDetailsPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { activeTeam } = useTeamStore();

  const {
    data: jobResponse,
    isLoading: jobLoading,
    isError: jobError,
  } = useJobStatus(activeTeam?.id, jobId);
  const { logs: realtimeLogs, status: logsStatus } = useJobLogs(jobId);
  const { data: revisions } = useRevisions(activeTeam?.id, undefined, jobId);
  const { data: traceData, isError: traceError } = useTracesForJob(jobId);

  const job = jobResponse?.job;
  const allLogs = useMergedLogs(jobResponse?.logs, realtimeLogs);

  if (jobLoading) return <JobLoadingState />;
  if (jobError || !job) return <JobErrorState />;

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <PageHeader
        title={
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("/jobs")}
              className="rounded-full h-10 w-10 border-border/60 hover:bg-muted"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight">
                Job Analysis
              </span>
              <span className="text-xs font-mono text-muted-foreground uppercase opacity-50">
                {job.id.substring(0, 8)}
              </span>
            </div>
          </div>
        }
        action={<JobStatusBadge status={job.status} />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <JobInfoCard job={job} />
            <TraceSummaryCard
              summary={traceData?.summary}
              isError={traceError}
            />
          </div>
          <LogViewer logs={allLogs} isLoading={logsStatus === "connecting"} />
        </div>

        {/* Sidebar Area */}
        <div className="space-y-6">
          <JobArtifactsCard
            job={job}
            revisions={revisions}
            activeTeamName={activeTeam?.name}
          />

          {/* Help Card (Small enough to stay inline, or could be extracted too) */}
          <Card className="bg-primary/5 border-primary/20 shadow-none">
            <CardContent className="p-4 space-y-3">
              <h4 className="text-xs font-bold text-primary uppercase tracking-wider">
                Need Help?
              </h4>
              <p className="text-[11px] text-primary/70 leading-relaxed font-medium">
                If your job is stuck in 'pending', ensure your Celery worker is
                running and has access to the repository.
              </p>
              <Button
                variant="link"
                className="p-0 h-auto text-xs font-bold text-primary hover:text-primary/80"
              >
                Documentation &rarr;
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
