import { SchemaViewer } from "./schema-viewer";

export function EndpointRequestViewer({ requestBody }: { requestBody: any }) {
  if (!requestBody) return null;

  return (
    <div className="flex flex-col gap-3">
      {requestBody.description && (
        <p className="text-sm text-muted-foreground mb-2 px-2">{requestBody.description}</p>
      )}
      {requestBody.content && Object.keys(requestBody.content).map(contentType => (
        <div key={contentType} className="bg-card border border-border/40 p-4 rounded-lg">
          <span className="text-xs font-bold text-primary/80 uppercase tracking-wider mb-2 block border-b border-border/40 pb-2">
            {contentType}
          </span>
          <div className="pt-2">
            <SchemaViewer schema={requestBody.content[contentType].schema} name="root" />
          </div>
        </div>
      ))}
    </div>
  );
}
