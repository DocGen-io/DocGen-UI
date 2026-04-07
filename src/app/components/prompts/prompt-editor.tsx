import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Loader2, Save, RotateCcw } from "lucide-react";

interface PromptEditorProps {
  selectedPromptName: string;
  promptData: any;
  editedContent: string;
  hasChanges: boolean;
  onContentChange: (value: string) => void;
  onSave: () => void;
  onRevert: () => void;
  isUpdating: boolean;
  isReverting: boolean;
}

export function PromptEditor({
  selectedPromptName,
  promptData,
  editedContent,
  hasChanges,
  onContentChange,
  onSave,
  onRevert,
  isUpdating,
  isReverting,
}: PromptEditorProps) {
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="flex items-center justify-between p-6">
          <div>
            <h2 className="text-xl font-semibold">{selectedPromptName}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {promptData?.is_system_default
                ? "System Default Template"
                : "Custom Template"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {(!promptData?.is_system_default || hasChanges) && (
              <Button
                variant="outline"
                onClick={onRevert}
                disabled={isReverting}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Revert to Default
              </Button>
            )}
            <Button
              onClick={onSave}
              disabled={!hasChanges || isUpdating}
            >
              {isUpdating ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Prompt Content</CardTitle>
              <CardDescription>
                Edit the prompt template content. Use placeholders like{" "}
                {"{variable}"} for dynamic values.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={editedContent}
                onChange={(e) => onContentChange(e.target.value)}
                className="min-h-[500px] font-mono text-sm"
                placeholder="Enter prompt template content..."
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
