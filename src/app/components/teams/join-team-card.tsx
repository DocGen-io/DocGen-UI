import { ArrowRight, ShieldCheck, Users2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface JoinTeamCardProps {
  team: {
    name: string;
    slug: string;
    member_count?: number;
  };
  onJoin: () => void;
  isJoining: boolean;
}

export function JoinTeamCard({ team, onJoin, isJoining }: JoinTeamCardProps) {
  return (
    <Card className="w-full max-w-md overflow-hidden border-primary/20 shadow-2xl shadow-primary/5">
      <CardHeader className="bg-primary/5 text-center pb-8 border-b border-primary/10">
        <div className="mx-auto w-20 h-20 rounded-[2rem] bg-background shadow-xl flex items-center justify-center mb-6 border border-primary/10">
          <Users2 className="h-10 w-10 text-primary" />
        </div>
        <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-2">
          Workspace Invitation
        </p>
        <CardTitle className="text-2xl font-bold tracking-tight">
          {team.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-8 space-y-6">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground text-center leading-relaxed">
            You've been invited to join{" "}
            <span className="font-bold text-foreground">@{team.slug}</span>. As
            a member, you'll be able to view and contribute to team
            documentation.
          </p>

          <div className="flex items-center justify-center gap-6 py-2">
            <div className="text-center">
              <p className="text-xl font-bold">{team.member_count || 0}</p>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                Members
              </p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <ShieldCheck className="h-5 w-5 text-emerald-500 mx-auto mb-0.5" />
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                Secure Access
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pb-8 px-8">
        <Button
          className="w-full h-12 font-bold text-base shadow-lg shadow-primary/20 group animate-in slide-in-from-bottom-4 duration-500"
          size="lg"
          onClick={onJoin}
          disabled={isJoining}
        >
          {isJoining ? "Joining..." : "Join Workspace"}
          {!isJoining && (
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
