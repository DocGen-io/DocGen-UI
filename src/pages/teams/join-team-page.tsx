import { useParams, useNavigate } from "react-router";
import { useTeamByToken } from "@/hooks/use-teams";
import { Loader2 } from "lucide-react";
import { JoinTeamCard } from "@/components/teams/join-team-card";
import { InvalidInvitationCard } from "@/components/teams/invalid-invitation-card";

export function JoinTeamPage() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { data: team, isLoading, error } = useTeamByToken(token || "");

  const handleJoin = () => {
    // TODO: Implement join mutation when API is ready
    console.log("Joining team with token:", token);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary/40" />
        <p className="text-sm font-medium text-muted-foreground animate-pulse uppercase tracking-widest">
          Validating Invitation...
        </p>
      </div>
    );
  }

  if (error || !team) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] p-8">
        <InvalidInvitationCard onReturn={() => navigate("/teams")} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh] p-8">
      <JoinTeamCard 
        team={team} 
        onJoin={handleJoin} 
        isJoining={false} 
      />
    </div>
  );
}
