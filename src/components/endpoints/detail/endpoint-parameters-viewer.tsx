export function EndpointParametersViewer({ parameters }: { parameters: any[] }) {
  if (!parameters || parameters.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      {parameters.map((p: any, i: number) => (
        <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 py-3 border-b border-border/20 last:border-0">
          <div className="w-1/3 min-w-[200px]">
            <span className="font-mono text-sm font-semibold text-foreground/90">{p.name}</span>
            {p.required && <span className="ml-2 text-[10px] uppercase font-bold text-destructive bg-destructive/10 px-1.5 py-0.5 rounded">Required</span>}
            {p.schema && p.schema.type && (
              <span className="block mt-1 w-max font-mono text-[10px] text-blue-500/90 bg-blue-500/10 px-1.5 py-0.5 rounded">
                {p.schema.type}{p.schema.format ? ` (${p.schema.format})` : ''}
              </span>
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">{p.description || "No description provided."}</p>
          </div>
          <div className="w-1/4">
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">in: {p.in}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
