import { useState } from "react";
import { EndpointMethodBadge } from "@/components/endpoints/endpoint-method-badge";

interface EndpointHeaderProps {
  path: string;
  method: string;
  summary?: string;
  operationId?: string;
}

export function EndpointHeader({ path, method, summary, operationId }: EndpointHeaderProps) {
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-3 py-6 pb-8 border-b border-border/40">
      <div className="flex flex-wrap items-center gap-4">
        <EndpointMethodBadge method={method} className="text-sm px-3 py-1" />
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground font-mono truncate">
          {path}
        </h1>
      </div>

      {summary && (
        <div className="flex flex-col gap-1 items-start">
          <p className={`text-muted-foreground text-lg max-w-3xl ${isSummaryExpanded ? "" : "line-clamp-2"}`}>
            {summary}
          </p>
          {summary.length > 150 && (
            <button
              onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
              className="text-xs font-semibold text-primary hover:underline mt-1"
            >
              {isSummaryExpanded ? "Show Less" : "Read More"}
            </button>
          )}
        </div>
      )}

      {operationId && (
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Operation ID</span>
          <code className="bg-muted px-2 py-1 rounded text-sm text-foreground/80 font-mono">
            {operationId}
          </code>
        </div>
      )}
    </div>
  );
}
