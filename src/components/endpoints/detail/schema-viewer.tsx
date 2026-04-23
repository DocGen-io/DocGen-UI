import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

interface SchemaViewerProps {
  schema: any;
  name?: string;
  required?: boolean;
}

export function SchemaViewer({ schema, name, required }: SchemaViewerProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!schema) return null;

  if (schema.$ref) {
    return (
      <div className="flex items-start gap-2 py-1.5 border-b border-border/20 last:border-0 bg-transparent">
        {name && <span className="font-mono text-sm font-semibold text-foreground/90">{name}</span>}
        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded cursor-pointer hover:bg-muted/80 transition-colors">
          ref: {schema.$ref.split('/').pop()}
        </span>
      </div>
    );
  }

  const type = schema.type || "string";
  const isObject = type === "object" || !!schema.properties;
  const isArray = type === "array" || !!schema.items;

  if (isObject || isArray) {
    return (
      <div className="flex flex-col border-b border-border/20 last:border-0 py-2 bg-transparent">
        <div 
          className="flex items-center gap-2 cursor-pointer hover:bg-muted/30 p-1.5 -ml-1.5 rounded-md w-max transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
          {name && <span className="font-mono text-sm font-semibold text-foreground/90">{name}</span>}
          {required && <span className="text-[10px] uppercase font-bold text-destructive bg-destructive/10 px-1.5 py-0.5 rounded">Required</span>}
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-primary/80 bg-primary/10 px-1.5 py-0.5 rounded">
              {isArray ? `array[${schema.items?.type || 'any'}]` : 'object'}
            </span>
            {schema.description && (
              <span className="text-xs text-muted-foreground truncate max-w-[300px]" title={schema.description}>
                {schema.description}
              </span>
            )}
          </div>
        </div>
        
        {isExpanded && (
          <div className="ml-6 pl-4 border-l border-border/40 mt-1 flex flex-col gap-0.5 bg-transparent">
            {schema.example !== undefined && (
              <div className="my-2 mb-3 max-w-4xl">
                <span className="text-[10px] uppercase font-bold text-muted-foreground mb-1 block">Example:</span>
                <pre className="text-xs bg-muted/40 border border-border/40 text-foreground/80 p-3 rounded-md font-mono overflow-x-auto max-h-[300px] overflow-y-auto w-full shadow-inner">
                  {typeof schema.example === "object" ? JSON.stringify(schema.example, null, 2) : String(schema.example)}
                </pre>
              </div>
            )}
            
            {isObject && schema.properties && Object.entries(schema.properties).map(([propName, propSchema]: [string, any]) => (
              <SchemaViewer 
                key={propName} 
                name={propName} 
                schema={propSchema} 
                required={schema.required?.includes(propName)} 
              />
            ))}
            {isArray && schema.items && (
              <SchemaViewer schema={schema.items} name="items" />
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-start gap-4 py-2 border-b border-border/20 last:border-0 bg-transparent hover:bg-muted/10 px-2 -mx-2 rounded transition-colors">
      <div className="flex items-center justify-between min-w-[200px] max-w-[250px]">
        {name && <span className="font-mono text-sm font-semibold text-foreground/90">{name}</span>}
        {required && <span className="text-[10px] uppercase font-bold text-destructive bg-destructive/10 px-1.5 py-0.5 rounded ml-2">Req</span>}
      </div>
      
      <div className="flex flex-col gap-1 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-blue-500/90 bg-blue-500/10 px-1.5 py-0.5 rounded">
            {type}{schema.format ? ` (${schema.format})` : ''}
          </span>
          {schema.enum && (
            <span className="text-xs text-muted-foreground">
              Enum: {schema.enum.join(', ')}
            </span>
          )}
        </div>
        
        {schema.description && (
          <p className="text-sm text-foreground/70 leading-snug break-words">
            {schema.description}
          </p>
        )}
        
        {schema.example !== undefined && (
          <div className="mt-2 max-w-3xl">
            <span className="text-[10px] uppercase font-bold text-muted-foreground mb-1 block">Example:</span>
            {typeof schema.example === "object" ? (
              <pre className="text-xs bg-muted/40 border border-border/40 text-foreground/80 p-2 rounded-md font-mono overflow-x-auto whitespace-pre-wrap max-h-40 overflow-y-auto shadow-inner">
                {JSON.stringify(schema.example, null, 2)}
              </pre>
            ) : (
              <code className="text-xs bg-muted/40 border border-border/40 text-foreground/80 px-2 py-1 rounded font-mono break-all inline-block">
                {String(schema.example)}
              </code>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
