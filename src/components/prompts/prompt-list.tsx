import { FileText } from "lucide-react";
import { cn } from "@/utils";

interface PromptListProps {
  promptNames: string[];
  selectedPromptName: string | null;
  onSelectPrompt: (name: string) => void;
}

export function PromptList({
  promptNames,
  selectedPromptName,
  onSelectPrompt,
}: PromptListProps) {
  return (
    <div className="w-80 border-r border-border bg-card flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-semibold">Prompt Templates</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage AI prompt templates
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {promptNames.map((name) => (
          <button
            key={name}
            onClick={() => onSelectPrompt(name)}
            className={cn(
              "w-full text-left p-3 rounded-lg transition-colors",
              "hover:bg-accent",
              selectedPromptName === name
                ? "bg-primary text-primary-foreground"
                : "bg-background border border-border",
            )}
          >
            <div className="flex items-start gap-2">
              <FileText className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{name}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
