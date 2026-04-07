import { Card, CardContent } from "../ui/card";
import { JobStatusBadge } from "./job-status-badge";
import type { Job } from "../../types";
import JobMetaDetails from "./job-meta-details";
import JobActionsMenu from "./job-action-menu";
import JobStatusMessage from "./job-status-message";

interface JobCardProps {
  job: Job;
  onClick?: (jobId: string) => void;
  onDelete?: (jobId: string) => void;
}

export function JobCard({ job, onClick, onDelete }: JobCardProps) {
  return (
    <div 
      className="cursor-pointer group"
      onClick={() => onClick?.(job.id)}
    >
      <Card className="hover:shadow-md transition-all hover:border-primary/30 border-border/60">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold truncate text-foreground group-hover:text-primary transition-colors">
                  {job.path.split("/").pop() || "Job"}
                </h3>
                <JobStatusBadge status={job.status} />
              </div>

              <JobMetaDetails job={job} />
            </div>

            <JobActionsMenu onDelete={() => onDelete?.(job.id)} />
          </div>

          <JobStatusMessage job={job} />
        </CardContent>
      </Card>
    </div>
  );
}
