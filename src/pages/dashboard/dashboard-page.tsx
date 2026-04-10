import { useState } from "react";
import { useTeamStore } from "@/stores/team-store";
import { useJobs } from "@/hooks/use-jobs";
import {
  useRevisions,
} from "@/hooks/use-revisions";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Plus, AlertTriangle, RefreshCw } from "lucide-react";
import { CreateJobDialog } from "@/components/jobs/create-job-dialog";
import { useNavigate } from "react-router";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { StatsOverview } from "@/components/dashboard/stats-overview";
import { RecentJobsList } from "@/components/dashboard/recent-jobs-list";
import { PendingRevisionsList } from "@/components/dashboard/pending-revisions-list";
import { getDashboardStats } from "@/definitions/dashboard";
import NoActiveTeam from "@/components/dashboard/no-active-team";

export function DashboardPage() {
  const navigate = useNavigate();
  const { activeTeam } = useTeamStore();
  const activeTeamId = activeTeam?.id;

  const {
    data: jobs,
    isLoading: jobsLoading,
    isError: jobsError,
    refetch: refetchJobs,
  } = useJobs(activeTeamId || undefined);

  const {
    data: revisions,
    isLoading: revisionsLoading,
    isError: revisionsError,
    refetch: refetchRevisions,
  } = useRevisions(activeTeamId || undefined);

  const [createJobOpen, setCreateJobOpen] = useState(false);

  const handleRetry = () => {
    if (jobsError) refetchJobs();
    if (revisionsError) refetchRevisions();
  };

  const stats = getDashboardStats(
    jobs,
    jobsLoading,
    jobsError,
    revisions,
    revisionsLoading,
    revisionsError,
  );

  if (!activeTeam) {
    return <NoActiveTeam onSetupClick={() => navigate("/teams")} />;
  }

  return (
    <div className="p-8 space-y-8">
      <PageHeader
        title="Dashboard"
        description={`Overview for ${activeTeam.name}`}
        action={
          <Button onClick={() => setCreateJobOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Job
          </Button>
        }
      />

      {(jobsError || revisionsError) && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Synchronization Error</AlertTitle>
          <AlertDescription className="flex items-center justify-between">
            <span>
              We're having trouble reaching the server. Some information may be
              out of date.
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRetry}
              className="bg-background/20 hover:bg-background/30 border-transparent h-7"
            >
              <RefreshCw className="h-3 w-3 mr-2" />
              Reconnect Now
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <StatsOverview stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentJobsList
          jobs={jobs}
          isLoading={jobsLoading}
          isError={jobsError}
          onRetry={refetchJobs}
          onJobClick={(id) => navigate(`/jobs/${id}`)}
          onViewAll={() => navigate("/jobs")}
        />
        <PendingRevisionsList
          onRevisionClick={() => navigate("/revisions")}
          onViewAll={() => navigate("/revisions")}
        />
      </div>

      <CreateJobDialog open={createJobOpen} onOpenChange={setCreateJobOpen} />
    </div>
  );
}
