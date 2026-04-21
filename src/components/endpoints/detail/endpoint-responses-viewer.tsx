import { SchemaViewer } from "./schema-viewer";

export function EndpointResponsesViewer({ responses }: { responses?: any }) {
  if (!responses) return null;

  return (
    <div className="flex flex-col gap-4">
      {Object.entries(responses).map(([code, config]: [string, any]) => (
        <div key={code} className="flex flex-col gap-2 p-4 bg-muted/30 rounded-lg border border-border/30">
          <div className="flex items-center gap-3">
            <span className={`font-mono text-sm font-bold px-2 py-1 rounded ${code.startsWith("2") ? "bg-green-500/10 text-green-500" : "bg-orange-500/10 text-orange-500"}`}>
              {code}
            </span>
            <span className="text-sm text-muted-foreground font-semibold">{config.description}</span>
          </div>
          {config.content && (
            <div className="mt-2 flex flex-col gap-3">
              {Object.entries(config.content).map(([contentType, contentData]: [string, any]) => (
                <div key={contentType} className="bg-card border border-border/40 p-4 rounded-lg">
                  <span className="text-xs font-bold text-primary/80 uppercase tracking-wider mb-2 block border-b border-border/40 pb-2">
                    {contentType}
                  </span>
                  <div className="pt-2">
                    <SchemaViewer schema={contentData.schema} name="root" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
