import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProjectSelectorProps {
  projectName: string;
  setProjectName: (name: string) => void;
  availableProjects: string[];
}

export function ProjectSelector({
  projectName,
  setProjectName,
  availableProjects,
}: ProjectSelectorProps) {
  if (!availableProjects || availableProjects.length === 0) return null;

  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest hidden sm:inline">
        Active Project:
      </span>
      <Select
        value={projectName}
        onValueChange={(val) => {
          if (!val) return;
          setProjectName(val);
        }}
      >
        <SelectTrigger className="w-full sm:w-[220px] bg-card/50 backdrop-blur-sm border-primary/20 h-10 px-4 rounded-xl shadow-lg shadow-primary/5">
          <SelectValue placeholder="Select Project" />
        </SelectTrigger>
        <SelectContent className="bg-card/95 backdrop-blur-xl border-primary/10 rounded-xl">
          {availableProjects.map((p) => (
            <SelectItem key={p} value={p} className="capitalize py-2.5">
              {p.replace(/-/g, " ")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
