import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LocalSourceFieldsProps {
  localPath: string;
  onChange: (field: string, value: string) => void;
  required?: boolean;
}

export function LocalSourceFields({
  localPath,
  onChange,
  required = false,
}: LocalSourceFieldsProps) {
  return (
    <div className="mt-0 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="localPath">Local Path</Label>
        <Input
          id="localPath"
          placeholder="/path/to/project"
          value={localPath}
          onChange={(e) => onChange("localPath", e.target.value)}
          required={required}
          className="bg-muted/30 border-muted/60 focus:bg-background transition-colors"
        />
      </div>
    </div>
  );
}
