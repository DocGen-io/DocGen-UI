import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { AlertCircle, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SwaggerUIRendererProps {
  spec: any;
  name: string;
}

const SyntaxHighlighter = ({ code }: { code: any }) => {
  const json = JSON.stringify(code, null, 2);

  // Tokenize JSON for simple highlighting
  const tokens = json.split(
    /(".*?"(?=:)|".*?"|true|false|null|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|[\[\]{},:])/g,
  );

  return (
    <div className="font-mono text-[13px] leading-relaxed whitespace-pre-wrap break-all">
      {tokens.map((token, i) => {
        if (!token) return null;

        let className = "text-foreground/90";
        if (token.startsWith('"') && token.endsWith(":")) {
          className = "text-primary font-semibold";
        } else if (token.startsWith('"')) {
          className = "text-emerald-500";
        } else if (/^(true|false|null)$/.test(token)) {
          className = "text-sky-500 font-bold";
        } else if (/^-?\d/.test(token)) {
          className = "text-amber-500";
        } else if (/[\[\]{},:]/.test(token)) {
          className = "text-muted-foreground/40";
        }

        return (
          <span key={i} className={className}>
            {token}
          </span>
        );
      })}
    </div>
  );
};

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all rounded-lg"
      onClick={handleCopy}
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </Button>
  );
};

export function SwaggerUIRenderer({ spec, name }: SwaggerUIRendererProps) {
  if (!spec) return null;

  const paths = spec.paths || {};
  const endpointEntries = Object.entries(paths).flatMap(
    ([path, pathItem]: [string, any]) =>
      Object.entries(pathItem).map(([method, data]: [string, any]) => ({
        path,
        method,
        data,
      })),
  );

  const getMethodColor = (method: string) => {
    switch (method.toUpperCase()) {
      case "GET":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "POST":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "PUT":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "DELETE":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-slate-500/10 text-slate-500 border-slate-500/20";
    }
  };

  return (
    <div className="w-full space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-10">
      {endpointEntries.map((ep, i) => (
        <Card
          key={i}
          className="border-border/20 shadow-none bg-transparent overflow-hidden rounded-none sm:rounded-2xl transition-all border-b sm:border group/card"
        >
          <div
            className={`h-1 w-full opacity-30 group-hover/card:opacity-100 transition-opacity ${getMethodColor(ep.method).split(" ")[1]}`}
          />
          <CardHeader className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={`font-black uppercase px-2 py-0.5 rounded-md border text-[9px] tracking-widest ${getMethodColor(ep.method)}`}
                >
                  {ep.method}
                </Badge>
                <code className="text-xs font-mono text-muted-foreground bg-muted/20 px-2 py-0.5 rounded select-all opacity-70">
                  {ep.path}
                </code>
              </div>
            </div>
            <CardTitle className="text-xl sm:text-2xl font-black tracking-tighter uppercase text-foreground/90">
              {ep.data.summary || name}
            </CardTitle>
            {ep.data.description && (
              <p className="text-xs text-muted-foreground leading-relaxed mt-1 max-w-none opacity-70">
                {ep.data.description}
              </p>
            )}
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <Tabs defaultValue="parameters" className="w-full">
              <TabsList className="flex items-center justify-start h-11 bg-muted/20 p-1 rounded-xl mb-6 w-fit gap-1 border border-border/30">
                <TabsTrigger
                  value="parameters"
                  className="text-xs font-bold px-6 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all h-full"
                >
                  Parameters
                </TabsTrigger>
                <TabsTrigger
                  value="request"
                  className="text-xs font-bold px-6 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all h-full"
                >
                  Request Body
                </TabsTrigger>
                <TabsTrigger
                  value="responses"
                  className="text-xs font-bold px-6 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all h-full"
                >
                  Responses
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="parameters"
                className="mt-0 focus-visible:outline-none"
              >
                {ep.data.parameters && ep.data.parameters.length > 0 ? (
                  <div className="rounded-2xl border border-border/40 overflow-hidden bg-background/20">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/30">
                        <tr>
                          <th className="text-left p-4 font-bold text-xs uppercase tracking-widest opacity-60">
                            Name
                          </th>
                          <th className="text-left p-4 font-bold text-xs uppercase tracking-widest opacity-60">
                            Location
                          </th>
                          <th className="text-left p-4 font-bold text-xs uppercase tracking-widest opacity-60">
                            Schema Type
                          </th>
                          <th className="text-left p-4 font-bold text-xs uppercase tracking-widest opacity-60">
                            Requirement
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/30">
                        {ep.data.parameters.map((p: any, j: number) => (
                          <tr
                            key={j}
                            className="hover:bg-muted/10 transition-colors group/row"
                          >
                            <td className="p-4 font-mono font-bold text-primary/90">
                              {p.name}
                            </td>
                            <td className="p-4">
                              <Badge
                                variant="secondary"
                                className="text-[10px] uppercase font-bold"
                              >
                                {p.in}
                              </Badge>
                            </td>
                            <td className="p-4 text-muted-foreground font-mono text-xs">
                              {p.schema?.type || "string"}
                            </td>
                            <td className="p-4">
                              {p.required ? (
                                <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-[10px] uppercase font-bold py-0.5 px-2">
                                  Required
                                </Badge>
                              ) : (
                                <span className="text-[10px] text-muted-foreground uppercase font-bold opacity-40 tracking-widest">
                                  Optional
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="py-12 text-center rounded-2xl border border-dashed border-border/50 bg-muted/5">
                    <div className="flex flex-col items-center gap-3">
                      <AlertCircle className="w-6 h-6 text-muted-foreground/30" />
                      <p className="text-sm text-muted-foreground font-medium italic opacity-60">
                        No parameters required for this operation.
                      </p>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent
                value="request"
                className="mt-0 focus-visible:outline-none"
              >
                {ep.data.requestBody ? (
                  <div className="relative group/code rounded-xl border border-border/30 bg-muted/10 overflow-hidden">
                    <div className="flex items-center justify-between px-3 py-1 bg-muted/20 border-b border-border/20">
                      <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/40">
                        Application / JSON
                      </span>
                      <CopyButton
                        text={JSON.stringify(ep.data.requestBody, null, 2)}
                      />
                    </div>
                    <div className="p-4 overflow-auto max-h-[80vh] custom-scrollbar scrollbar-thin scrollbar-thumb-primary/10 hover:scrollbar-thumb-primary/20">
                      <SyntaxHighlighter code={ep.data.requestBody} />
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center rounded-xl border border-dashed border-border/30 bg-muted/5">
                    <div className="flex flex-col items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-muted-foreground/20" />
                      <p className="text-xs text-muted-foreground font-medium italic opacity-50">
                        No request body expected.
                      </p>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent
                value="responses"
                className="mt-0 space-y-4 focus-visible:outline-none"
              >
                {Object.entries(ep.data.responses || {}).map(
                  ([code, r]: [string, any]) => (
                    <div
                      key={code}
                      className="rounded-xl border border-border/30 bg-muted/5 overflow-hidden group/resp"
                    >
                      <div className="flex items-center justify-between px-4 py-2 border-b border-border/20 bg-muted/10">
                        <div className="flex items-center gap-3">
                          <Badge
                            className={`${code.startsWith("2") ? "bg-emerald-500" : "bg-destructive"} font-black px-2 py-0.5 rounded text-[10px]`}
                          >
                            {code}
                          </Badge>
                          <span className="text-xs font-bold tracking-tight text-foreground/70">
                            {r.description}
                          </span>
                        </div>
                      </div>
                      {r.content && (
                        <div className="relative p-4">
                          <div className="absolute top-2 right-2 z-10 opacity-0 group-hover/resp:opacity-100 transition-opacity">
                            <CopyButton
                              text={JSON.stringify(r.content, null, 2)}
                            />
                          </div>
                          <div className="overflow-auto max-h-[80vh] custom-scrollbar scrollbar-thin scrollbar-thumb-primary/10 hover:scrollbar-thumb-primary/20">
                            <SyntaxHighlighter code={r.content} />
                          </div>
                        </div>
                      )}
                    </div>
                  ),
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
