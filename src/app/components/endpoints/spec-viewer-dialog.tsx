import { Code } from "lucide-react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { SwaggerUIRenderer } from "./swagger-ui-renderer";

interface SpecViewerDialogProps {
  path: string;
  method: string;
  data: any;
  name: string;
}

export function SpecViewerDialog({ path, method, data, name }: SpecViewerDialogProps) {
  return (
    <DialogContent className="max-w-7xl w-[95vw] max-h-[90vh] overflow-y-auto p-0 border-none bg-background/95 backdrop-blur-xl shadow-2xl custom-scrollbar">
      <div className="p-0 pb-10">
        <DialogHeader className="p-6 sm:p-10 pb-0">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary">
              <Code className="w-8 h-8" />
            </div>
            <div>
              <DialogTitle className="text-2xl sm:text-3xl font-black tracking-tighter italic uppercase">
                Endpoint Spec
              </DialogTitle>
              <p className="text-muted-foreground text-[10px] sm:text-sm uppercase tracking-widest font-bold opacity-60">
                Visual Representation
              </p>
            </div>
          </div>
        </DialogHeader>
        <div className="bg-card/50 rounded-2xl p-0.5 border border-primary/10 overflow-hidden">
          <SwaggerUIRenderer
            spec={{
              paths: {
                [path]: { [method.toLowerCase()]: data },
              },
            }}
            name={name}
          />
        </div>
      </div>
    </DialogContent>
  );
}
