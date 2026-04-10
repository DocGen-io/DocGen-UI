import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Hash, Timer, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TraceSummaryProps {
  summary: any | undefined;
  isError: boolean;
  onViewTraces?: () => void;
}

export function TraceSummaryCard({ summary, isError, onViewTraces }: TraceSummaryProps) {
  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          AI Intelligence
        </CardTitle>
        {onViewTraces && summary && (
          <Button 
            variant="link" 
            size="sm" 
            className="h-auto p-0 text-xs font-bold text-primary hover:text-primary/80"
            onClick={onViewTraces}
          >
            View Details &rarr;
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isError ? (
          <div className="py-2 text-center text-xs text-muted-foreground italic">
            Tracing is disabled for this session
          </div>
        ) : summary ? (
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                <Hash className="h-3 w-3" /> Spans
              </p>
              <p className="text-xl font-bold">{summary.total_spans}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                <Zap className="h-3 w-3" /> Tokens
              </p>
              <p className="text-xl font-bold">{summary.total_tokens?.toLocaleString() || 0}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                <Timer className="h-3 w-3" /> Avg Latency
              </p>
              <p className="text-xl font-bold">{summary.avg_latency_ms.toFixed(0)} ms</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                <Zap className="h-3 w-3 text-primary" /> Total Cost
              </p>
              <p className="text-xl font-bold text-primary">${summary.total_cost.toFixed(4)}</p>
            </div>
          </div>
        ) : (
          <div className="py-2 flex items-center justify-center gap-3 text-muted-foreground/50 italic text-sm">
            <Loader2 className="h-4 w-4 animate-spin" />
            Calculating metrics...
          </div>
        )}
      </CardContent>
    </Card>
  );
}
