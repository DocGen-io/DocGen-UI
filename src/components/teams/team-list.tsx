import { cn } from "@/utils";
import type { Team } from "@/types";

interface TeamListProps {
  teams: Team[];
  activeTeamId?: string;
  onSelect: (team: Team) => void;
}

export function TeamList({ teams, activeTeamId, onSelect }: TeamListProps) {
  return (
    <div className="space-y-2">
      {teams.map((team) => (
        <div
          key={team.id}
          onClick={() => onSelect(team)}
          className={cn(
            "p-4 rounded-xl border transition-all cursor-pointer group relative overflow-hidden",
            activeTeamId === team.id
              ? "border-primary bg-primary/5 shadow-sm"
              : "border-border hover:border-primary/30 hover:bg-muted/50",
          )}
        >
          {activeTeamId === team.id && (
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
          )}
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="font-bold text-sm tracking-tight truncate">
                {team.name}
              </p>
              <p className="text-[11px] font-mono text-muted-foreground uppercase opacity-60 truncate">
                {team.slug}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
