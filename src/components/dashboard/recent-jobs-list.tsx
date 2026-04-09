import { Loader2, AlertTriangle, RefreshCw, Clock, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/jobs/job-card";
import type { Job } from "@/types";

interface RecentJobsListProps {
  jobs: Job[] | undefined;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  onJobClick: (jobId: string) => void;
  onViewAll: () => void;
}

export function RecentJobsList({
  jobs,
  isLoading,
  isError,
  onRetry,
  onJobClick,
  onViewAll,
}: RecentJobsListProps) {
  const recentJobs = jobs?.slice(0, 3) || [];

  return (
    <Card className="shadow-sm border-border/60 h-full">
      <CardHeader className="border-b border-border/40 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Recent Jobs
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewAll}
            className="text-primary hover:text-primary/80"
          >
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground space-y-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary/40" />
            <p className="text-sm font-medium">Fetching active jobs...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-12 space-y-4 bg-destructive/5 rounded-xl border border-destructive/10">
            <AlertTriangle className="h-10 w-10 mx-auto text-destructive/40" />
            <div className="space-y-1">
              <p className="font-semibold text-destructive">
                Unable to load jobs
              </p>
              <p className="text-sm text-muted-foreground px-4">
                The server might be temporarily unavailable.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="border-destructive/20 text-destructive hover:bg-destructive/10"
            >
              <RefreshCw className="h-4 w-4 mr-2" /> Try Again
            </Button>
          </div>
        ) : recentJobs.length > 0 ? (
          recentJobs.map((job) => (
            <JobCard key={job.id} job={job} onClick={onJobClick} />
          ))
        ) : (
          <div className="text-center py-16 bg-muted/20 rounded-xl border border-dashed border-border/60 space-y-3">
            <div className="p-3 bg-background rounded-full w-fit mx-auto shadow-sm">
              <Info className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground font-medium">
              No activity recorded yet.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
