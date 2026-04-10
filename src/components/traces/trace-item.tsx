import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronRight } from "lucide-react";

function TraceItem({ trace, isExpanded, onToggle }: any) {
    return (
        <Card className="overflow-hidden border-border/60 hover:border-primary/30 transition-colors">
            <div
                className="p-4 flex items-center justify-between cursor-pointer select-none"
                onClick={onToggle}
            >
                <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-muted flex items-center justify-center">
                        {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </div>
                    <div>
                        <h4 className="font-mono text-sm font-bold truncate max-w-[200px]">{trace.id}</h4>
                        <p className="text-[10px] text-muted-foreground uppercase">{new Date(trace.startTime).toLocaleString()}</p>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase">Tokens</p>
                        <p className="text-sm font-bold">{trace.totalTokens.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase">Cost</p>
                        <p className="text-sm font-bold text-primary">${trace.totalCost.toFixed(4)}</p>
                    </div>
                    <div className="text-right min-w-[80px]">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase">Spans</p>
                        <p className="text-sm font-bold">{trace.spanCount}</p>
                    </div>
                </div>
            </div>

            {isExpanded && (
                <div className="border-t bg-muted/30 p-4 space-y-3">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Detailed Spans</h5>
                    <div className="space-y-2">
                        {trace.spans.map((span: any) => (
                            <div key={span.id} className="p-3 bg-background rounded-lg border border-border/40 flex items-center justify-between text-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-primary/40" />
                                    <div>
                                        <span className="font-bold">{span.name}</span>
                                        <span className="ml-2 text-xs text-muted-foreground">({span.model || 'Unknown Model'})</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <span className="text-xs text-muted-foreground">{span.totalTokens} tokens</span>
                                    <span className="font-mono text-xs font-bold text-primary">${span.cost.toFixed(5)}</span>
                                    <span className="text-xs text-muted-foreground font-mono">{span.latencyMs}ms</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Card>
    );
}


export default TraceItem;