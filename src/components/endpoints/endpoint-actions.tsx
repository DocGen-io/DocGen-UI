import { LayoutGrid, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EndpointActionsProps {
  onCluster: () => void;
  isClustering: boolean;
  onRerun: () => void;
  isRerunning: boolean;
}

export function EndpointActions({
  onCluster,
  isClustering,
  onRerun,
  isRerunning,
}: EndpointActionsProps) {
  return (
    <div className="flex gap-2 w-full sm:w-auto">
      <Button
        variant="outline"
        className="flex-1 sm:flex-none border-primary/20 hover:bg-primary/5 text-primary h-10 px-4 rounded-xl font-bold"
        onClick={onCluster}
        disabled={isClustering}
      >
        {isClustering ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <LayoutGrid className="w-4 h-4 mr-2" />
        )}
        Group
      </Button>
      <Button
        className="flex-1 sm:flex-none bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 h-10 px-6 rounded-xl font-bold transition-all active:scale-95"
        onClick={onRerun}
        disabled={isRerunning}
      >
        {isRerunning ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <RefreshCw className="w-4 h-4 mr-2" />
        )}
        Re-run
      </Button>
    </div>
  );
}
