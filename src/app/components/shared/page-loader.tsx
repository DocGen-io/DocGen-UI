// Loading Component
import { Loader2 } from 'lucide-react';

export default function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary/40" />
      <p className="text-xs font-medium text-muted-foreground animate-pulse uppercase tracking-widest">
        Initialising Component...
      </p>
    </div>
  );
}