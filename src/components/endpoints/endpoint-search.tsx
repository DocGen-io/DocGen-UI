import { Search, Send, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EndpointSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: (e: React.FormEvent) => void;
  isSearching: boolean;
}

export function EndpointSearch({
  searchQuery,
  setSearchQuery,
  onSearch,
  isSearching,
}: EndpointSearchProps) {
  return (
    <form
      onSubmit={onSearch}
      className="relative group max-w-2xl mx-auto w-full"
    >
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
        <Search className="w-5 h-5" />
      </div>
      <Input
        placeholder="Search endpoints semantically (e.g. 'user authentication' or 'file upload')..."
        className="pl-12 pr-16 h-14 rounded-2xl bg-card border-none shadow-xl focus-visible:ring-2 focus-visible:ring-primary/20 italic"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button
        type="submit"
        size="sm"
        className="absolute right-2 top-1/2 -translate-y-1/2 h-10 rounded-xl px-4 bg-primary transition-all active:scale-95"
        disabled={isSearching}
      >
        {isSearching ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Send className="w-4 h-4" />
        )}
      </Button>
    </form>
  );
}
