import { useState, useMemo } from "react";
import { useNavigate } from "react-router"; // 1. Import useNavigate
import { useTeamStore } from "@/stores/team-store";
import { useJobs, useDeleteJob } from "@/hooks/use-jobs";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Plus, FolderGit2 } from "lucide-react";
import { JobCard } from "@/components/jobs/job-card";
import { CreateJobDialog } from "@/components/jobs/create-job-dialog";
import { EmptyState } from "@/components/shared/empty-state";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import type { JobStatus } from "@/types";

export function JobsPage() {
  const navigate = useNavigate();
  const { activeTeam } = useTeamStore();
  const { data: jobs, isLoading } = useJobs(activeTeam?.id);
  const deleteJob = useDeleteJob(activeTeam?.id!);

  const [createJobOpen, setCreateJobOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<JobStatus | "all">("all");

  const handleDelete = (jobId: string) => {
    // Note: In a production app, you might want to replace window.confirm
    // with a beautiful AlertDialog component from shadcn/ui!
    if (window.confirm("Are you sure you want to delete this job?")) {
      deleteJob.mutate(jobId);
    }
  };

  // 2. Wrap derived state in useMemo for performance
  const { filteredJobs, statusCounts } = useMemo(() => {
    const safeJobs = jobs || [];

    return {
      filteredJobs: safeJobs.filter((job) =>
        filterStatus === "all" ? true : job.status === filterStatus,
      ),
      statusCounts: {
        all: safeJobs.length,
        running: safeJobs.filter(
          (j) => j.status === "running" || j.status === "processing",
        ).length,
        completed: safeJobs.filter((j) => j.status === "completed").length,
        failed: safeJobs.filter((j) => j.status === "failed").length,
      },
    };
  }, [jobs, filterStatus]);

  return (
    <div className="p-8 space-y-6">
      <PageHeader
        title="Jobs"
        description="Manage your documentation generation jobs"
        action={
          <Button onClick={() => setCreateJobOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Job
          </Button>
        }
      />

      <Tabs
        value={filterStatus}
        onValueChange={(v) => setFilterStatus(v as JobStatus | "all")}
      >
        <TabsList>
          <TabsTrigger value="all">All ({statusCounts.all})</TabsTrigger>
          <TabsTrigger value="running">
            Running ({statusCounts.running})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({statusCounts.completed})
          </TabsTrigger>
          <TabsTrigger value="failed">
            Failed ({statusCounts.failed})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={filterStatus} className="mt-6">
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onClick={(id) => navigate(`/jobs/${id}`)}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={FolderGit2}
              title="No jobs found"
              description={
                filterStatus === "all"
                  ? "Create your first job to start generating documentation"
                  : `No ${filterStatus} jobs at the moment`
              }
              action={
                filterStatus === "all"
                  ? {
                      label: "Create Job",
                      onClick: () => setCreateJobOpen(true),
                    }
                  : undefined
              }
            />
          )}
        </TabsContent>
      </Tabs>

      <CreateJobDialog open={createJobOpen} onOpenChange={setCreateJobOpen} />
    </div>
  );
}
