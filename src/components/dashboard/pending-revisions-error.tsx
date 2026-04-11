import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useJobs } from "@/hooks/use-jobs";
import { useTeamStore } from "@/stores/team-store";

const PendingRevisionsError = () => {
  const { activeTeam } = useTeamStore();
  const { refetch: refetchJobs } = useJobs(activeTeam?.id || undefined);

  return (
    <div className="text-center py-12 space-y-4 bg-destructive/5 rounded-xl border border-destructive/10">
      <AlertTriangle className="h-10 w-10 mx-auto text-destructive/40" />
      <div className="space-y-1">
        <p className="font-semibold text-destructive">Failed to load reviews</p>
        <p className="text-sm text-muted-foreground px-4">
          There was a problem syncing with the review system.
        </p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => refetchJobs()}
        className="border-destructive/20 text-destructive hover:bg-destructive/10"
      >
        <RefreshCw className="h-4 w-4 mr-2" /> Sync Again
      </Button>
    </div>
  );
};

export default PendingRevisionsError;
