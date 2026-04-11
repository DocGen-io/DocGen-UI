// components/jobs/job-artifacts-card.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code as CodeIcon, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router";
import type { Job } from "@/types";

interface JobArtifactsCardProps {
  job: Job;
  revisions: any[] | undefined;
}

export function JobArtifactsCard({
  job,
  revisions,
}: JobArtifactsCardProps) {
  const navigate = useNavigate();

  const handleReviewEndpoints = () => {
    // 1. Try to extract project name from job path (e.g., "/tmp/Dartsee" -> "Dartsee")
    const projectNameFromPath = job.path ? job.path.replace(/\/$/, "").split("/").pop() : "";

    // 2. Determing final project name for navigation
    const projectName = projectNameFromPath || "default";

    // 3. Navigate with both project and job context
    // This ensures specific job results can be highlighted if supported
    navigate(`/endpoints?project=${projectName}&job=${job.id}`);
  };

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="text-base font-bold">Artifacts</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-3">
        {!revisions ? (
          <p className="text-sm text-muted-foreground italic text-center py-4">
            No artifacts detected yet.
          </p>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/40 border">
              <span className="text-xs font-medium text-muted-foreground">
                Total Generated
              </span>
              <Badge
                variant="secondary"
                className="px-1.5 min-w-[20px] justify-center"
              >
                {revisions.length}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-orange-500/5 border border-orange-200/20">
              <span className="text-xs font-medium text-orange-600">
                Pending Review
              </span>
              <Badge
                variant="outline"
                className="text-orange-600 border-orange-200"
              >
                {revisions.filter((r) => r.status === "pending").length}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-200/20">
              <span className="text-xs font-medium text-emerald-600">
                Approved
              </span>
              <Badge
                variant="outline"
                className="text-emerald-300 bg-emerald-600 border-emerald-500"
              >
                {revisions.filter((r) => r.status === "approved").length}
              </Badge>
            </div>

            <Button
              variant="outline"
              className="w-full mt-4 bg-background hover:bg-muted font-semibold transition-all border-primary/20 hover:border-primary/40 text-primary"
              onClick={() => navigate("/revisions")}
            >
              Manage Revisions
            </Button>

            {job.status === "completed" && (
              <Button
                className="w-full mt-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/20"
                onClick={handleReviewEndpoints}
              >
                <CodeIcon className="w-4 h-4 mr-2" />
                Review Endpoints
                <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
