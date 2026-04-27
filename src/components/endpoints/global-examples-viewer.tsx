import { Dialog } from "@/components/ui/dialog";
import { ExamplesViewerDialog } from "@/components/endpoints/examples-viewer-dialog";
import { useExampleStore } from "@/stores/example-store";

export function GlobalExamplesViewer() {
  const { isExamplesOpen, activeExampleJobId, closeExampleViewer } = useExampleStore();
  
  return (
    <Dialog open={isExamplesOpen} onOpenChange={(v) => {
      if (!v) closeExampleViewer();
    }}>
      {activeExampleJobId && (
        <ExamplesViewerDialog
          jobId={activeExampleJobId}
          onClose={closeExampleViewer}
        />
      )}
    </Dialog>
  );
}
