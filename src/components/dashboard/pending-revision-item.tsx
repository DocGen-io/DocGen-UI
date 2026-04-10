import { GitPullRequest, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Revision } from "@/types";
import { useApproveRevision, useRejectRevision } from "@/hooks/use-revisions";
import { useTeamStore } from "@/stores/team-store";

interface PendingRevisionItemProps {
  revision: Revision;
  onClick: (revision: Revision) => void;
}

export function PendingRevisionItem({
  revision,
  onClick,
}: PendingRevisionItemProps) {
  const activeTeamId = useTeamStore().activeTeam?.id;
  const approveMutation = useApproveRevision(activeTeamId || "");
  const rejectMutation = useRejectRevision(activeTeamId || "");
  const isProcessing = approveMutation.isPending || rejectMutation.isPending;

  return (
    <div
      className="flex items-start gap-4 p-4 rounded-xl border border-border/60 hover:border-primary/40 hover:bg-primary/5 cursor-pointer transition-all group"
      onClick={() => onClick(revision)}
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
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
          onClick={(e) => {
            e.stopPropagation();
            approveMutation.mutate(revision.id);
          }}
          disabled={isProcessing}
        >
          <Check className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50"
          onClick={(e) => {
            e.stopPropagation();
            rejectMutation.mutate(revision.id);
          }}
          disabled={isProcessing}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
