import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitBranch, Folder, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Job } from "@/types";

interface JobInfoCardProps {
  job: Job;
}

export function JobInfoCard({ job }: JobInfoCardProps) {
  return (
    <Card className="border-border/60 shadow-sm md:col-span-2">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          Source Info
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-muted rounded-lg">
            {job.source_type === "git" ? (
              <GitBranch className="h-4 w-4 text-primary/70" />
            ) : (
              <Folder className="h-4 w-4 text-primary/70" />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">
              {job.source_type === "git" ? "Repository" : "Local Path"}
            </p>
            <p className="font-medium truncate text-sm">{job.path}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="p-2 bg-muted rounded-lg">
            <Calendar className="h-4 w-4 text-primary/70" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">
              Timeline
            </p>
            <p className="font-medium text-sm">
              Started
              {job.created_at
                ? new Date(job.created_at).toLocaleDateString([], {
                    hour: "numeric",
                    minute: "numeric",
                  })
                : "N/A"}
            </p>
          </div>
        </div>

        {/* Status Info */}
        <div className="pt-4 border-t border-border">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Step</span>
            <Badge variant="outline" className="capitalize">
              {job.status}
            </Badge>
          </div>
          {job.error && (
            <div className="mt-4 p-3 bg-destructive/10 text-destructive text-sm rounded-md border border-destructive/20">
              <p className="font-semibold">Error:</p>
              <p>{job.error}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
