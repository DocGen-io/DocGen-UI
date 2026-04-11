import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GitSourceFieldsProps {
  repositoryUrl: string;
  branch: string;
  onChange: (field: string, value: string) => void;
  required?: boolean;
}

export function GitSourceFields({
  repositoryUrl,
  branch,
  onChange,
  required = false,
}: GitSourceFieldsProps) {
  return (
    <div className="mt-0 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="repositoryUrl">Repository URL</Label>
        <Input
          id="repositoryUrl"
          placeholder="https://github.com/user/repo"
          value={repositoryUrl}
          onChange={(e) => onChange("repositoryUrl", e.target.value)}
          required={required}
          className="bg-muted/30 border-muted/60 focus:bg-background transition-colors"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="branch">Branch</Label>
        <Input
          id="branch"
          placeholder="main"
          value={branch}
          onChange={(e) => onChange("branch", e.target.value)}
          className="bg-muted/30 border-muted/60 focus:bg-background transition-colors"
        />
      </div>
    </div>
  );
}
