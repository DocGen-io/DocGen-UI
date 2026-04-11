import { EndpointCard } from "@/components/endpoints/endpoint-card";
import { Sparkles } from "lucide-react";

interface ClusterListProps {
  clusters: Record<string, string[]>;
  endpoints: any[];
  projectName: string;
}

export function ClusterList({ clusters, endpoints, projectName }: ClusterListProps) {
  return (
    <div className="space-y-12">
      {Object.entries(clusters).map(([groupName, ids]) => {
        const mappedEndpoints = ids.map((id: string) => {
          return endpoints.find((e) => e.nodeId === id);
        }).filter(Boolean);

        if (mappedEndpoints.length === 0) return null;

        return (
          <div key={groupName} className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 text-foreground/80 uppercase italic tracking-tighter">
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs not-italic">
                <Sparkles className="w-4 h-4" />
              </div>
              {groupName}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mappedEndpoints.map((ep: any, i: number) => (
                <EndpointCard
                  key={`${groupName}-${i}`}
                  ep={ep}
                  projectName={projectName}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
