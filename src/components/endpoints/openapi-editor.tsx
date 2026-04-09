import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Save,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  FileCode,
} from "lucide-react";
import { toast } from "sonner";

interface OpenAPIEditorProps {
  initialValue: any;
  onSave: (newValue: any) => void;
  title: string;
}

export function OpenAPIEditor({
  initialValue,
  onSave,
  title,
}: OpenAPIEditorProps) {
  const [content, setContent] = useState(JSON.stringify(initialValue, null, 2));
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      JSON.parse(content);
      setIsValid(true);
      setError(null);
    } catch (e: any) {
      setIsValid(false);
      setError(e.message);
    }
  }, [content]);

  const handleSave = () => {
    if (isValid) {
      onSave(JSON.parse(content));
      toast.success("OpenAPI spec saved successfully");
    } else {
      toast.error("Cannot save invalid JSON");
    }
  };

  const handleReset = () => {
    setContent(JSON.stringify(initialValue, null, 2));
    toast.info("Changes reset");
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileCode className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold tracking-tight">
            {title} Editor
          </h3>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="h-8"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={!isValid}
            className="h-8 bg-primary"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="relative group">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`w-full h-[60vh] p-6 font-mono text-[13px] bg-muted/30 rounded-2xl border ${
            isValid
              ? "border-border focus:border-primary/50"
              : "border-destructive focus:border-destructive"
          } focus:ring-4 focus:ring-primary/10 transition-all outline-none resize-none leading-relaxed`}
          placeholder="Paste your OpenAPI JSON here..."
          spellCheck={false}
        />

        <div className="absolute bottom-4 right-6 flex items-center gap-3">
          {isValid ? (
            <Badge
              variant="outline"
              className="bg-green-500/10 text-green-500 border-green-500/20 py-1 flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3 h-3" />
              Valid OpenAPI JSON
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="bg-red-500/10 text-red-500 border-red-500/20 py-1 flex items-center gap-1.5"
            >
              <AlertTriangle className="w-3 h-3" />
              Invalid JSON syntax
            </Badge>
          )}
        </div>
      </div>

      {!isValid && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Syntax Error</p>
            <p className="opacity-80 font-mono text-[11px] mt-1">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}
