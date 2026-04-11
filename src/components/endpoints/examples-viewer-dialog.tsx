import { 
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Code2, X } from "lucide-react";
import { useExampleJob } from "@/hooks/use-endpoints";
import { ExampleLoadingState } from "./examples-viewer/example-loading-state";
import { ExampleErrorState } from "./examples-viewer/example-error-state";
import { ExampleContent } from "./examples-viewer/example-content";

interface ExamplesViewerDialogProps {
  jobId: string | null;
  onClose: () => void;
}

export function ExamplesViewerDialog({ jobId, onClose }: ExamplesViewerDialogProps) {
  const { data: jobStatus, isLoading, isError } = useExampleJob(jobId);

  const job = jobStatus?.job;
  const status = job?.status;
  
  const isProcessing = isLoading || status === "pending" || status === "processing";
  const hasError = isError || status === "failed";

  return (
    <DialogContent showCloseButton={false} className="sm:max-w-[1200px] max-w-[95vw] w-full border-primary/20 bg-background/95 backdrop-blur-xl shadow-2xl rounded-3xl p-0 overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-border/10 bg-muted/5">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-2xl">
            <Code2 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-black uppercase tracking-tighter">Code Examples</h2>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-70">On-Demand Generation</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-muted/20">
          <X className="w-5 h-5" />
        </Button>
      </div>

      <div className="p-6 overflow-y-auto max-h-[80vh]">
        {isProcessing ? (
          <ExampleLoadingState />
        ) : hasError ? (
          <ExampleErrorState onClose={onClose} />
        ) : (
          <ExampleContent job={job} />
        )}
      </div>
    </DialogContent>
  );
}
