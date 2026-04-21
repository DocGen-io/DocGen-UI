import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PenTool, Code, Webhook } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { RevisionProposeDialog } from "@/components/endpoints/revision-propose-dialog";
import { ExamplesViewerDialog } from "@/components/endpoints/examples-viewer-dialog";
import { useProposeRevision } from "@/hooks/use-revisions";
import { useGenerateExamples } from "@/hooks/use-endpoints";
import { useTeamStore } from "@/stores/team-store";

interface EndpointActionsProps {
  projectName: string;
  method: string;
  path: string;
  endpointData: any;
}

export function EndpointActions({ projectName, routeId, method, path, endpointData }: EndpointActionsProps) {
  const { activeTeam } = useTeamStore();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isExamplesOpen, setIsExamplesOpen] = useState(false);
  const [activeExampleJobId, setActiveExampleJobId] = useState<string | null>(null);

  const proposeMutation = useProposeRevision(activeTeam?.id || "");
  const generateExamplesMutation = useGenerateExamples(projectName, activeTeam?.id || "");

  const handleTestEndpoint = () => {
    toast("Opening REST client sandbox...");
  };

  return (
    <div className="flex flex-col gap-4 sticky top-6 bg-card border border-border/50 p-6 rounded-xl shadow-sm">
      <h3 className="font-semibold text-base mb-2">Endpoint Actions</h3>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogTrigger className="w-full">
          <Button variant="default" className="w-full justify-start gap-2 h-11">
            <PenTool className="w-4 h-4" />
            Propose Change
          </Button>
        </DialogTrigger>
        <RevisionProposeDialog
          name={path}
          data={endpointData}
          onSave={async (val) => {
            if (!activeTeam) {
              toast.error("Please select a team first");
              return;
            }

            try {
              await proposeMutation.mutateAsync({
                endpoint_id: path,
                file_path: projectName,
                action: "modify",
                original_content: JSON.stringify(endpointData, null, 2),
                proposed_content: JSON.stringify(val, null, 2),
              });
              setIsEditOpen(false);
            } catch (err) {
              // error handled in hook
            }
          }}
        />
      </Dialog>

      <Button
        variant="secondary"
        className="w-full justify-start gap-2 h-11"
        disabled={generateExamplesMutation.isPending}
        onClick={() => {
          if (!activeTeam) {
            toast.error("Please select a team first");
            return;
          }
          generateExamplesMutation.mutate({
            path: path,
            method: method
          }, {
            onSuccess: (data: any) => {
              if (data?.id) {
                setActiveExampleJobId(data.id);
                setIsExamplesOpen(true);
              }
            }
          });
        }}
      >
        {generateExamplesMutation.isPending ? (
          <span className="flex items-center">
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
            Wait...
          </span>
        ) : (
          <>
            <Code className="w-4 h-4" />
            Generate Examples
          </>
        )}
      </Button>

      <Button
        variant="outline"
        className="w-full justify-start gap-2 h-11"
        onClick={handleTestEndpoint}
      >
        <Webhook className="w-4 h-4" />
        Test Endpoint
      </Button>

      <Dialog open={isExamplesOpen} onOpenChange={setIsExamplesOpen}>
        <ExamplesViewerDialog
          jobId={activeExampleJobId}
          onClose={() => setIsExamplesOpen(false)}
        />
      </Dialog>
    </div>
  );
}
