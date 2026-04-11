import { EndpointCard } from "@/components/endpoints/endpoint-card";
import { isJSONString } from "@/utils";

interface SearchResultsProps {
  results: any[];
  projectName: string;
}

export function SearchResults({ results, projectName }: SearchResultsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((res: any, i: number) => (
        <EndpointCard
          key={`search-${i}`}
          ep={{
            ...res,
            data: isJSONString(res.content)
              ? JSON.parse(res.content)
              : res.content,
          }}
          projectName={projectName}
        />
      ))}
    </div>
  );
}
