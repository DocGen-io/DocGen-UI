import { Link } from "react-router";
import { EndpointMethodBadge } from "./endpoint-method-badge";
import { ChevronRight } from "lucide-react";

interface SearchResultItemProps {
  res: any;
  projectName: string;
}

export function SearchResultItem({ res, projectName }: SearchResultItemProps) {
  if (!res.path) return null;

  return (
    <div 
      id={res.id} 
      className="flex justify-between items-center bg-card p-4 rounded-lg shadow-sm border border-border/40 hover:border-primary/20 transition-all hover:bg-muted/30 group"
    >
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex flex-row items-center gap-3">
          <EndpointMethodBadge method={res.method} />
          <p className="font-mono text-sm tracking-tight text-foreground/90">{res.path}</p>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2">{res.summary}</p>
      </div>

      <Link 
        to={`/projects/${projectName}/endpoints/${res.id}`} 
        className="flex items-center gap-1 bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary px-4 py-2 rounded-md font-medium text-sm transition-colors opacity-0 group-hover:opacity-100 focus-within:opacity-100"
      >
        View
        <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
