import { SearchResultItem } from "./search-result-item";

interface SearchResultsProps {
  results: any[];
  projectName: string;
}

export function SearchResults({ results, projectName }: SearchResultsProps) {
  return (
    <div className="w-full">
      <h2 className="text-lg font-bold mb-4 tracking-tight flex items-center gap-2">
        <span className="bg-primary/20 text-primary w-2 h-6 rounded-sm inline-block"></span>
        Top related results
      </h2>
      <div className="flex flex-col gap-3 overflow-y-auto max-h-[60vh] pr-2 pb-4 seamless-scroll">
        {results.map((res: any) => (
          <SearchResultItem key={res.id} res={res} projectName={projectName} />
        ))}
      </div>
    </div >
  );
}
