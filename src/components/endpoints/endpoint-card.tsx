import { getMethodColor } from "@/lib/utils/method-utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EndpointMethodBadge } from "@/components/endpoints/endpoint-method-badge";
import { EndpointCardActions } from "@/components/endpoints/endpoint-card-actions";

interface EndpointCardProps {
  ep: {
    path: string;
    method: string;
    data: any;
    name?: string;
  };
  projectName: string;
}

export function EndpointCard({ ep, projectName }: EndpointCardProps) {
  const methodColor = getMethodColor(ep.method);

  return (
    <Card className="group hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5 bg-card/50 backdrop-blur-sm border-border/50 relative overflow-hidden h-full flex flex-col">
      <div
        className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-[0.03] group-hover:scale-150 transition-transform ${methodColor}`}
      />

      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-bold truncate tracking-tight text-foreground/80 max-w-[80%]">
          {ep.path}
        </CardTitle>
        <EndpointMethodBadge method={ep.method} />
      </CardHeader>

      <CardContent className="space-y-4 pt-2 flex-1 flex flex-col justify-between">
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {ep.data?.summary ||
            `Auto-generated endpoint definition for ${ep.path}`}
        </p>

        <EndpointCardActions ep={ep} projectName={projectName} />
      </CardContent>
    </Card>
  );
}
