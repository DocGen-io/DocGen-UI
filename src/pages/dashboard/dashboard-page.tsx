import { useState } from 'react';
import { useTeamStore } from '@/stores/team-store';
import { useJobs } from '@/hooks/use-jobs';
import { useRevisions } from '@/hooks/use-revisions';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Zap, 
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';
import { CreateJobDialog } from '@/components/jobs/create-job-dialog';
import { useNavigate } from 'react-router';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { StatsOverview } from '@/components/dashboard/stats-overview';
import { RecentJobsList } from '@/components/dashboard/recent-jobs-list';
import { PendingRevisionsList } from '@/components/dashboard/pending-revisions-list';
import { getDashboardStats } from '@/definitions/dashboard';

export function DashboardPage() {
  const navigate = useNavigate();
  const { activeTeam } = useTeamStore();
  const activeTeamId = activeTeam?.id;
  
  const { 
    data: jobs, 
    isLoading: jobsLoading, 
    isError: jobsError,
    refetch: refetchJobs
  } = useJobs(activeTeamId || undefined);
  
  const { 
    data: revisions, 
    isLoading: revisionsLoading, 
    isError: revisionsError,
    refetch: refetchRevisions
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
    revisionsError
  );

  if (!activeTeam) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-muted/5">
        <div className="p-6 bg-primary/5 rounded-full mb-6 border border-primary/10">
          <Zap className="h-12 w-12 text-primary animate-pulse" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome to DocGen</h2>
        <p className="text-muted-foreground mt-4 max-w-md text-lg">
          Connect your first team to start automating your documentation pipeline with ease.
        </p>
        <Button onClick={() => navigate('/teams')} className="mt-8" size="lg">
          Setup Your Team
        </Button>
      </div>
    );
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
            <span>We're having trouble reaching the server. Some information may be out of date.</span>
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
          onViewAll={() => navigate('/jobs')}
        />
        <PendingRevisionsList 
          revisions={revisions} 
          isLoading={revisionsLoading} 
          isError={revisionsError} 
          onRetry={refetchRevisions} 
          onRevisionClick={() => navigate('/revisions')}
          onViewAll={() => navigate('/revisions')}
        />
      </div>

      <CreateJobDialog open={createJobOpen} onOpenChange={setCreateJobOpen} />
    </div>
  );
}
