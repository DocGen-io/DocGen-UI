import { Loader2 } from "lucide-react";

export default function JobLoadingState() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary/60" />
        <p className="text-sm font-medium text-muted-foreground animate-pulse">
          Loading job details...
        </p>
      </div>
    </div>
  );
}
