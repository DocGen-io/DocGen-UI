import { formatDistanceToNow, parseISO } from "date-fns";
import { Calendar, Folder, GitBranch, Timer } from "lucide-react";
import { Job } from "@/types";
import { JobDuration } from "@/components/jobs/job-duration";

export default function JobMetaDetails({ job }: { job: Job }) {
  return (
    <div className="flex items-center gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-1">
        {job.source_type === "git" ? (
          <GitBranch className="h-3 w-3" />
        ) : (
          <Folder className="h-3 w-3" />
        )}
        <span className="truncate max-w-[200px]">{job.path}</span>
      </div>
      <div className="flex items-center gap-1">
        <Calendar className="h-3 w-3" />
        <span>
          {formatDistanceToNow(parseISO(job.created_at), { addSuffix: true })}
        </span>
      </div>
      <div className="flex items-center gap-1 border-l pl-4 border-border/40">
        <Timer className="h-3 w-3" />
        <JobDuration createdAt={job.created_at} updatedAt={job.updated_at} status={job.status} />
      </div>
    </div>
  );
}
