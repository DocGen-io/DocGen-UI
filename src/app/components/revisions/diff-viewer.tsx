import { ScrollArea } from '../ui/scroll-area';
import { getLineType, getLineClass } from '../../utils/diff-utils';

interface DiffViewerProps {
  diff?: string;
  originalContent?: string;
  proposedContent: string;
}

export function DiffViewer({ diff = '', originalContent, proposedContent }: DiffViewerProps) {
  // If no diff provided, use a simple fallback or empty string
  const diffLines = diff ? diff.split('\n') : [];

  return (
    <div className="space-y-4">
      {/* Side-by-side view (if both original and proposed exist) */}
      {originalContent && proposedContent && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-sm font-medium text-muted-foreground">Original</div>
            <ScrollArea className="h-[400px] w-full rounded-md border bg-muted/30 p-4">
              <pre className="text-sm font-mono whitespace-pre-wrap">
                {originalContent}
              </pre>
            </ScrollArea>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-muted-foreground">Proposed</div>
            <ScrollArea className="h-[400px] w-full rounded-md border bg-muted/30 p-4">
              <pre className="text-sm font-mono whitespace-pre-wrap">
                {proposedContent}
              </pre>
            </ScrollArea>
          </div>
        </div>
      )}

      {diff && (
        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">Changes</div>
          <ScrollArea className="h-[300px] w-full rounded-md border bg-muted/30">
            <div className="font-mono text-sm">
              {diffLines.map((line, index) => {
                const type = getLineType(line);
                const lineClass = getLineClass(type);
                return (
                  <div
                    key={index}
                    className={`px-4 py-1 ${lineClass} hover:bg-accent/20 transition-colors`}
                  >
                    <span className="select-none text-muted-foreground mr-4 inline-block w-8 text-right">
                      {index + 1}
                    </span>
                    <span className="whitespace-pre-wrap">{line}</span>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
