import { Card, CardContent } from "../ui/card";
import { JobStatusBadge } from "./job-status-badge";
import type { Job } from "../../types";
import { Link } from "react-router";
import JobMetaDetails from "./job-meta-details";
import JobActionsMenu from "./job-action-menu";
import JobStatusMessage from "./job-status-message";

interface JobCardProps {
  job: Job;
  // 1. Pass onClick as a prop instead of hardcoding routing
  onDelete?: (jobId: string) => void;
}

export function JobCard({ job, onDelete }: JobCardProps) {
  return (
    <Link to={`/jobs/${job.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium truncate">
                  {job.path.split("/").pop() || "Job"}
                </h3>
                <JobStatusBadge status={job.status} />
              </div>

              <JobMetaDetails job={job} />
            </div>

            <JobActionsMenu onDelete={() => onDelete?.(job.id)} />
          </div>

          {/* 3. Extract complex conditional rendering */}
          <JobStatusMessage job={job} />
        </CardContent>
      </Card>
    </Link>
  );
}
