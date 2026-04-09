import { useState } from "react";
import { Eye, GitPullRequest } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { SpecViewerDialog } from "@/components/endpoints/spec-viewer-dialog";
import { RevisionProposeDialog } from "@/components/endpoints/revision-propose-dialog";

interface EndpointCardProps {
  ep: {
    path: string;
    method: string;
    data: any;
    name?: string;
  };
  projectName: string;
}

export function EndpointCard({ ep, projectName }: EndpointCardProps) {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const methodColor =
    ep.method?.toUpperCase() === "GET"
      ? "bg-blue-500"
      : ep.method?.toUpperCase() === "POST"
        ? "bg-green-500"
        : "bg-red-500";

  const methodBadgeColor =
    ep.method?.toUpperCase() === "GET"
      ? "bg-blue-500/10 text-blue-500"
      : ep.method?.toUpperCase() === "POST"
        ? "bg-green-500/10 text-green-500"
        : "bg-red-500/10 text-red-500";

  return (
    <Card className="group hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5 bg-card/50 backdrop-blur-sm border-border/50 relative overflow-hidden h-full flex flex-col">
      <div
        className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-[0.03] group-hover:scale-150 transition-transform ${methodColor}`}
      />

      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-bold truncate tracking-tight text-foreground/80 max-w-[80%]">
          {ep.name || ep.path}
        </CardTitle>
        <div
          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${methodBadgeColor}`}
        >
          {ep.method}
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-2 flex-1 flex flex-col justify-between">
        <p className="text-xs text-muted-foreground line-clamp-2 min-h-[2.5rem] leading-relaxed">
          {ep.data?.summary ||
            `Auto-generated endpoint definition for ${ep.path}`}
        </p>

        <div className="flex gap-2 pt-2">
          <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
            <DialogTrigger>
              <Button
                variant="secondary"
                size="sm"
                className="w-full h-8 text-[11px] font-bold tracking-tight"
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
            <DialogTrigger>
              <Button
                variant="outline"
                size="sm"
                className="w-full h-8 text-[11px] font-bold tracking-tight border-primary/20 text-primary hover:bg-primary/5"
              >
                <GitPullRequest className="w-3 h-3 mr-1.5" />
                Propose
              </Button>
            </DialogTrigger>
            <RevisionProposeDialog
              name={ep.name!!}
              data={ep.data}
              onSave={(val) => {
                console.log("Saving revision:", val);
                setIsEditOpen(false);
                toast.success("Revision proposal submitted");
              }}
            />
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
