import { EndpointCard } from "./endpoint-card";

interface ClusterListProps {
  clusters: Record<string, any[]>;
  projectName: string;
}

export function ClusterList({ clusters, projectName }: ClusterListProps) {
  return (
    <div className="space-y-12">
      {Object.entries(clusters).map(([cid, list]: [string, any]) => (
        <div key={cid} className="space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2 text-foreground/80 uppercase italic tracking-tighter">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs not-italic">
              #{cid}
            </div>
            Group {Number(cid) + 1}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((ep: any, i: number) => (
              <EndpointCard
                key={`${cid}-${i}`}
                ep={ep}
                projectName={projectName}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
