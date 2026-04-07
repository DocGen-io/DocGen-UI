import { formatDistanceToNow } from "date-fns";
import { Calendar, Folder, GitBranch } from "lucide-react";
import { Job } from "../../types";

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
          {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
        </span>
      </div>
    </div>
  );
}
