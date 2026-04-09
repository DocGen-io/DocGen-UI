import { Job } from "@/types";

export default function JobStatusMessage({ job }: { job: Job }) {
  if (job.status === "running" || job.status === "processing") {
    return (
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Status</span>
          <span className="font-medium capitalize">{job.status}</span>
        </div>
      </div>
    );
  }

  if (job.status === "completed") {
    return (
      <div className="text-sm text-muted-foreground">
        Documentation generated successfully
      </div>
    );
  }

  if (job.status === "failed" && job.error) {
    return (
      <div className="text-sm text-destructive mt-2 p-2 bg-destructive/10 rounded">
        {job.error}
      </div>
    );
  }

  return null;
}
