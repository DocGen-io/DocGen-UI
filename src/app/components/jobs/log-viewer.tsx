import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { FileText, Loader2 } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "../ui/utils";
import JobLog from "./job-log";

interface LogViewerProps {
  logs: any[] | undefined;
  isLoading: boolean;
}

export function LogViewer({ logs, isLoading }: LogViewerProps) {
  return (
    <Card className="border-border/60 shadow-md overflow-hidden bg-black/5 ring-1 ring-border">
      <CardHeader className="border-b bg-muted/30 py-4">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <FileText className="h-4 w-4 text-primary/70" />
          Processing Pipeline Logs
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[450px] w-full bg-slate-950 p-6">
          <div className="space-y-1.5 font-mono text-xs selection:bg-primary/30">
            {logs && logs.length > 0 ? (
              logs.map((log: any, i: number) => (
                <JobLog key={i + log.timestamp} log={log} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full pt-20 text-slate-600 space-y-4">
                {isLoading ? (
                  <>
                    <Loader2 className="h-8 w-8 animate-spin opacity-20" />
                    <p className="font-medium animate-pulse">
                      Streaming logs from worker...
                    </p>
                  </>
                ) : (
                  <p className="italic">No logs captured yet.</p>
                )}
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
