import { Users2, Globe, Loader2, CheckCircle2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface TeamDiscoveryCardProps {
  team: any;
  isMember: boolean;
  onJoinRequest: (teamId: string) => void;
  isJoining: boolean;
}

export function TeamDiscoveryCard({
  team,
  isMember,
  onJoinRequest,
  isJoining,
}: TeamDiscoveryCardProps) {
  return (
    <Card className="group overflow-hidden border-border/40 hover:border-primary/30 transition-all hover:shadow-2xl hover:shadow-primary/5">
      <CardHeader className="bg-muted/10 pb-4">
        <div className="flex justify-between items-start">
          <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
            <Users2 className="h-5 w-5" />
          </div>
          <Badge
            variant="outline"
            className="bg-emerald-500/5 text-emerald-600 border-emerald-500/10 font-bold text-[10px] tracking-widest uppercase"
          >
            Public
          </Badge>
        </div>
        <CardTitle className="text-lg font-bold tracking-tight mt-4 group-hover:text-primary transition-colors">
          {team.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed h-8">
          {team.description || "No description provided for this workspace."}
        </p>

        <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
          <div className="flex items-center gap-1.5">
            <Globe className="h-3 w-3" />
            <span>{team.slug}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users2 className="h-3 w-3" />
            <span>{team.member_count || 0} Members</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t bg-muted/5">
        {isMember ? (
          <Button
            variant="ghost"
            disabled
            className="w-full font-bold text-emerald-600 gap-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            Already Member
          </Button>
        ) : (
          <Button
            className="w-full font-bold shadow-lg shadow-primary/10 group-hover:scale-[1.02] active:scale-[0.98] transition-all"
            onClick={() => onJoinRequest(team.id)}
            disabled={isJoining}
          >
            {isJoining && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Request to Join
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
