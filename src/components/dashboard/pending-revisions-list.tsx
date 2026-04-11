import {
  Loader2,
  AlertTriangle,
  RefreshCw,
  GitPullRequest,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PendingRevisionItem } from "./pending-revision-item";
import type { Revision } from "@/types";
import PendingRevisionsError from "./pending-revisions-error";
import { useApproveRevision, useRevisions } from "@/hooks/use-revisions";
import { useTeamStore } from "@/stores/team-store";

interface PendingRevisionsListProps {
  onRevisionClick: (revision: Revision) => void;
  onViewAll: () => void;
}

export function PendingRevisionsList({
  onRevisionClick,
  onViewAll,
}: PendingRevisionsListProps) {
  const activeTeamId = useTeamStore().activeTeam?.id;

  const {
    data: revisions,
    isLoading: revisionsLoading,
    isError: revisionsError,
  } = useRevisions(activeTeamId || undefined);

  const pendingRevisions =
    revisions?.filter((r) => r.status === "PENDING") || [];

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
        {revisionsLoading ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground space-y-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary/40" />
            <p className="text-sm font-medium">Collecting revisions...</p>
          </div>
        ) : revisionsError ? (
          <PendingRevisionsError />
        ) : pendingRevisions.length > 0 ? (
          pendingRevisions
            .slice(0, 5)
            .map((revision) => (
              <PendingRevisionItem
                key={revision.id}
                revision={revision}
                onClick={onRevisionClick}
              />
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
