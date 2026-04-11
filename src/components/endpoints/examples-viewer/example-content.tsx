import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "./code-block";

interface ExampleContentProps {
  job: any;
}

export function ExampleContent({ job }: ExampleContentProps) {
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

  if (exampleKeys.length === 0) {
    return (
      <div className="p-8 text-center border-2 border-dashed border-border/50 rounded-3xl opacity-50 italic">
        The generator did not return any code snippets.
      </div>
    );
  }

  return (
    <Tabs defaultValue={exampleKeys[0]} className="w-full">
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
        </TabsList>
      </div>

      {exampleKeys.map((lang) => (
        <TabsContent key={lang} value={lang} className="mt-0 focus-visible:outline-none animate-in fade-in slide-in-from-bottom-2 duration-300">
          <CodeBlock code={typeof examples[lang] === 'string' ? examples[lang] : JSON.stringify(examples[lang], null, 2)} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
