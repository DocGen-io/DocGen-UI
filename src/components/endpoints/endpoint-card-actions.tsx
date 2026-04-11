import { useState } from "react";
import { Eye, GitPullRequest, Stars } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { SpecViewerDialog } from "@/components/endpoints/spec-viewer-dialog";
import { RevisionProposeDialog } from "@/components/endpoints/revision-propose-dialog";
import { ExamplesViewerDialog } from "@/components/endpoints/examples-viewer-dialog";
import { useProposeRevision } from "@/hooks/use-revisions";
import { useGenerateExamples } from "@/hooks/use-endpoints";
import { useTeamStore } from "@/stores/team-store";

interface EndpointCardActionsProps {
  ep: {
    path: string;
    method: string;
    data: any;
    name?: string;
  };
  projectName: string;
}

export function EndpointCardActions({ ep, projectName }: EndpointCardActionsProps) {
  const { activeTeam } = useTeamStore();
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isExamplesOpen, setIsExamplesOpen] = useState(false);
  const [activeExampleJobId, setActiveExampleJobId] = useState<string | null>(null);

  const proposeMutation = useProposeRevision(activeTeam?.id || "");
  const generateExamplesMutation = useGenerateExamples(projectName, activeTeam?.id || "");

  return (
    <div className="flex gap-2 pt-2 flex-wrap">
      <section className="w-full flex gap-4 ">
        <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
          <DialogTrigger className="flex-1">
            <Button
              variant="secondary"
              size="sm"
              className="w-full flex-1 h-8 text-[11px] font-bold tracking-tight"
            >
              <Eye className="w-3 h-3 mr-1.5" />
              View Spec
            </Button>
          </DialogTrigger>
          <SpecViewerDialog
            path={ep.path}
            method={ep.method}
            data={ep.data}
            name={ep.name!!}
          />
        </Dialog>

        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogTrigger className="flex-1">
            <Button
              variant="outline"
              size="sm"
              className="w-full  h-8 text-[11px] font-bold tracking-tight border-primary/20 text-primary hover:bg-primary/5"
            >
              <GitPullRequest className="w-3 h-3 mr-1.5" />
              Propose
            </Button>
          </DialogTrigger>
          <RevisionProposeDialog
            name={ep.name!!}
            data={ep.data}
            onSave={async (val) => {
              if (!activeTeam) {
                toast.error("Please select a team first");
                return;
              }

              try {
                await proposeMutation.mutateAsync({
                  endpoint_id: ep.path,
                  file_path: projectName,
                  action: "modify",
                  original_content: JSON.stringify(ep.data, null, 2),
                  proposed_content: JSON.stringify(val, null, 2),
                });
                setIsEditOpen(false);
              } catch (err) {
                // error handled in hook
              }
            }}
          />
        </Dialog>
      </section>

      <Button
        variant="outline"
        size="sm"
        className="w-full h-8 text-[11px] font-bold tracking-tight text-muted-foreground hover:text-emerald-500 hover:bg-emerald-500/10 transition-all border border-transparent hover:border-emerald-500/20"
        onClick={() => {
          if (!activeTeam) {
            toast.error("Please select a team first");
            return;
          }
          generateExamplesMutation.mutate({ 
            path: ep.path, 
            method: ep.method 
          }, {
            onSuccess: (data: any) => {
              if (data?.id) {
                setActiveExampleJobId(data.id);
                setIsExamplesOpen(true);
              }
            }
          });
        }}
        disabled={generateExamplesMutation.isPending}
      >
        {generateExamplesMutation.isPending ? (
          <span className="flex items-center">
            <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin mr-1.5" />
            Wait...
          </span>
        ) : (
          <>
            <Stars className="w-3 h-3 mr-1.5" />
            Gen Examples
          </>
        )}
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
