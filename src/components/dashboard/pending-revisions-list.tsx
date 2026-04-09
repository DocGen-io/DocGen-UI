import {
  Loader2,
  AlertTriangle,
  RefreshCw,
  GitPullRequest,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Revision } from "@/types";

interface PendingRevisionsListProps {
  revisions: Revision[] | undefined;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  onRevisionClick: (revision: Revision) => void;
  onViewAll: () => void;
}

export function PendingRevisionsList({
  revisions,
  isLoading,
  isError,
  onRetry,
  onRevisionClick,
  onViewAll,
}: PendingRevisionsListProps) {
  const pendingRevisions =
    revisions?.filter((r) => r.status === "pending") || [];

  return (
    <Card className="shadow-sm border-border/60 h-full">
      <CardHeader className="border-b border-border/40 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <GitPullRequest className="h-5 w-5 text-primary" />
            Pending Reviews
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
      <CardContent className="pt-6 space-y-3">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground space-y-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary/40" />
            <p className="text-sm font-medium">Collecting revisions...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-12 space-y-4 bg-destructive/5 rounded-xl border border-destructive/10">
            <AlertTriangle className="h-10 w-10 mx-auto text-destructive/40" />
            <div className="space-y-1">
              <p className="font-semibold text-destructive">
                Failed to load reviews
              </p>
              <p className="text-sm text-muted-foreground px-4">
                There was a problem syncing with the review system.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="border-destructive/20 text-destructive hover:bg-destructive/10"
            >
              <RefreshCw className="h-4 w-4 mr-2" /> Sync Again
            </Button>
          </div>
        ) : pendingRevisions.length > 0 ? (
          pendingRevisions.slice(0, 5).map((revision) => (
            <div
              key={revision.id}
              className="flex items-start gap-4 p-4 rounded-xl border border-border/60 hover:border-primary/40 hover:bg-primary/5 cursor-pointer transition-all group"
              onClick={() => onRevisionClick(revision)}
            >
              <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <GitPullRequest className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate text-foreground/90">
                  {revision.endpoint_id}
                </p>
                <p className="text-sm text-muted-foreground truncate italic mt-0.5">
                  "{revision.proposed_content.substring(0, 80)}..."
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-muted/20 rounded-xl border border-dashed border-border/60 space-y-3">
            <div className="p-3 bg-background rounded-full w-fit mx-auto shadow-sm">
              <TrendingUp className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground font-medium">
              Your queue is empty!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
