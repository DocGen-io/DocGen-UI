import { Loader2 } from "lucide-react";

export function ExampleLoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
      <div className="relative">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
        </div>
      </div>
      <div className="space-y-1">
        <p className="font-bold tracking-tight uppercase text-sm">Thinking...</p>
        <p className="text-xs text-muted-foreground opacity-60">LLM is crafting your code examples</p>
      </div>
    </div>
  );
}
