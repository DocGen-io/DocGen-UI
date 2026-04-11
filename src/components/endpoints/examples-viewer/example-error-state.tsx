import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExampleErrorStateProps {
  onClose: () => void;
}

export function ExampleErrorState({ onClose }: ExampleErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center border-2 border-dashed border-destructive/20 rounded-3xl bg-destructive/5">
      <AlertCircle className="w-12 h-12 text-destructive opacity-50" />
      <div className="space-y-1">
        <p className="font-bold tracking-tight uppercase text-sm text-destructive">Something went wrong</p>
        <p className="text-xs text-muted-foreground opacity-60">Could not generate examples at this time.</p>
      </div>
      <Button variant="outline" size="sm" onClick={onClose} className="mt-2 border-destructive/20 text-destructive hover:bg-destructive/10">
        Close
      </Button>
    </div>
  );
}
