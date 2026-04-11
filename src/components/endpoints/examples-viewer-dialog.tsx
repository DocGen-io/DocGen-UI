import { 
  DialogContent,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, Check, Loader2, Code2, AlertCircle, X } from "lucide-react";
import { useState } from "react";
import { useExampleJob } from "@/hooks/use-endpoints";
import { toast } from "sonner";

interface ExamplesViewerDialogProps {
  jobId: string | null;
  onClose: () => void;
}

const CodeBlock = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="absolute right-4 top-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 bg-background/50 backdrop-blur-md border border-border/50"
          onClick={handleCopy}
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </Button>
      </div>
      <pre className="p-6 rounded-2xl bg-muted/30 border border-border/50 font-mono text-[13px] leading-relaxed overflow-x-auto custom-scrollbar whitespace-pre">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export function ExamplesViewerDialog({ jobId, onClose }: ExamplesViewerDialogProps) {
  const { data: jobStatus, isLoading, isError } = useExampleJob(jobId);

  const job = jobStatus?.job;
  const status = job?.status;
  
  let rawResult = job?.result;
  if (typeof rawResult === 'string') {
    try {
      rawResult = JSON.parse(rawResult);
    } catch (e) {
      console.error("Failed to parse result string:", e);
    }
  }

  let examples: Record<string, string> = {};
  const examplesData = (rawResult as any)?.examples || rawResult || [];

  if (Array.isArray(examplesData)) {
    examplesData.forEach((item: any) => {
      const fw = item.framework || item.Framework || item.name;
      const cd = item.code || item.Code || item.snippet;
      if (fw && typeof cd === 'string') examples[String(fw)] = cd;
    });
  } else if (typeof examplesData === 'object' && examplesData !== null) {
    if (examplesData.examples && Array.isArray(examplesData.examples)) {
       examplesData.examples.forEach((item: any) => {
         const fw = item.framework || item.Framework || item.name;
         const cd = item.code || item.Code || item.snippet;
         if (fw && typeof cd === 'string') examples[String(fw)] = cd;
       });
    } else {
       examples = examplesData as Record<string, string>;
    }
  }

  const exampleKeys = Object.keys(examples).filter(k => k !== 'status' && k !== 'job_id' && typeof examples[k] === 'string');

  return (
    <DialogContent showCloseButton={false} className="sm:max-w-[1200px] max-w-[95vw] w-full border-primary/20 bg-background/95 backdrop-blur-xl shadow-2xl rounded-3xl p-0 overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-border/10 bg-muted/5">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-2xl">
            <Code2 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-black uppercase tracking-tighter">Code Examples</h2>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-70">On-Demand Generation</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-muted/20">
          <X className="w-5 h-5" />
        </Button>
      </div>

      <div className="p-6 overflow-y-auto max-h-[80vh]">
        {isLoading || status === "pending" || status === "processing" ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <div className="relative">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="font-bold tracking-tight uppercase text-sm">Thinking...</p>
              <p className="text-xs text-muted-foreground opacity-60">LLM is crafting your code examples</p>
            </div>
          </div>
        ) : isError || status === "failed" ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center border-2 border-dashed border-destructive/20 rounded-3xl bg-destructive/5">
            <AlertCircle className="w-12 h-12 text-destructive opacity-50" />
            <div className="space-y-1">
              <p className="font-bold tracking-tight uppercase text-sm text-destructive">Something went wrong</p>
              <p className="text-xs text-muted-foreground opacity-60">Could not generate examples at this time.</p>
            </div>
            <Button variant="outline" size="sm" onClick={onClose} className="mt-2 border-destructive/20 text-destructive hover:bg-destructive/10">
              Close
            </Button>
          </div>
        ) : (
          <Tabs defaultValue={exampleKeys[0] || "raw"} className="w-full">
            <div className="overflow-x-auto no-scrollbar mb-6 pb-2">
              <TabsList className="flex items-center justify-start h-11 bg-muted/10 p-1 rounded-xl w-fit gap-1 border border-border/10 min-w-full">
                {exampleKeys.map((lang) => (
                  <TabsTrigger
                    key={lang}
                    value={lang}
                    className="text-[9px] font-black uppercase tracking-widest px-4 rounded-lg data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all h-full whitespace-nowrap"
                  >
                    {lang}
                  </TabsTrigger>
                ))}
                {exampleKeys.length === 0 && (
                  <TabsTrigger value="raw" className="text-[9px] font-black uppercase tracking-widest px-4 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all h-full whitespace-nowrap">
                    No Examples found
                  </TabsTrigger>
                )}
              </TabsList>
            </div>

            {exampleKeys.map((lang) => (
              <TabsContent key={lang} value={lang} className="mt-0 focus-visible:outline-none animate-in fade-in slide-in-from-bottom-2 duration-300">
                <CodeBlock code={typeof examples[lang] === 'string' ? examples[lang] : JSON.stringify(examples[lang], null, 2)} />
              </TabsContent>
            ))}
            
            {exampleKeys.length === 0 && (
              <TabsContent value="raw" className="mt-0 focus-visible:outline-none">
                <div className="p-8 text-center border-2 border-dashed border-border/50 rounded-3xl opacity-50 italic">
                  The generator did not return any code snippets.
                </div>
              </TabsContent>
            )}
          </Tabs>
        )}
      </div>
    </DialogContent>
  );
}
