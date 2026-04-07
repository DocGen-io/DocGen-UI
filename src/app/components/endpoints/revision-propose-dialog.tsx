import { GitPullRequest } from "lucide-react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { OpenAPIEditor } from "./openapi-editor";

interface RevisionProposeDialogProps {
  name: string;
  data: any;
  onSave: (val: any) => void;
}

export function RevisionProposeDialog({ name, data, onSave }: RevisionProposeDialogProps) {
  return (
    <DialogContent className="max-w-7xl w-[95vw] max-h-[90vh] overflow-y-auto p-0 border-none bg-background/95 backdrop-blur-xl shadow-2xl custom-scrollbar">
      <div className="p-0 pb-10">
        <DialogHeader className="p-6 sm:p-10 pb-0">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-500">
              <GitPullRequest className="w-8 h-8" />
            </div>
            <div>
              <DialogTitle className="text-2xl sm:text-3xl font-black tracking-tighter italic uppercase">
                Revise Spec
              </DialogTitle>
              <p className="text-muted-foreground text-[10px] sm:text-sm uppercase tracking-widest font-bold opacity-60">
                Manual Override & Refinement
              </p>
            </div>
          </div>
        </DialogHeader>
        <OpenAPIEditor
          title={name}
          initialValue={data}
          onSave={onSave}
        />
      </div>
    </DialogContent>
  );
}
