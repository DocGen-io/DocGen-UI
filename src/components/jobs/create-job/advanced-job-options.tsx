import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AdvancedJobOptionsProps {
  projectName: string;
  apiDir: string;
  onChange: (field: string, value: string) => void;
}

export function AdvancedJobOptions({
  projectName,
  apiDir,
  onChange,
}: AdvancedJobOptionsProps) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="projectName">Project Name (Optional)</Label>
        <Input
          id="projectName"
          placeholder="e.g. MyProject"
          value={projectName}
          onChange={(e) => onChange("projectName", e.target.value)}
          className="bg-muted/30 border-muted/60 focus:bg-background transition-colors"
        />
        <p className="text-[11px] text-muted-foreground">
          Override the default project name derived from the path.
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="apiDir">Source Directory (Optional)</Label>
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest bg-muted/40 px-1.5 py-0.5 rounded">
            Advanced
          </span>
        </div>
        <Input
          id="apiDir"
          placeholder="e.g. ./src/api"
          value={apiDir}
          onChange={(e) => onChange("apiDir", e.target.value)}
          className="bg-muted/30 border-muted/60 focus:bg-background transition-colors"
        />
        <p className="text-[11px] text-muted-foreground">
          Path relative to root where your API definitions are located.
        </p>
      </div>
    </div>
  );
}
