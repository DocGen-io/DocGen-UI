import { useState } from "react";
import { 
  useTeams, 
  useTeamMembers, 
  usePendingInvitations, 
  useRespondToInvitation, 
  useUpdateMemberRole 
} from "@/hooks/use-teams";
import { useTeamStore } from "@/stores/team-store";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Loader2,
  Users2,
  Compass,
  UserPlus,
} from "lucide-react";
import { CreateTeamDialog } from "@/components/teams/create-team-dialog";
import { TeamList } from "@/components/teams/team-list";
import { TeamRoster } from "@/components/teams/team-roster";
import { TeamSettingsDialog } from "@/components/teams/team-settings-dialog";
import { InvitationList } from "@/components/teams/invitation-list";
import { InviteMemberDialog } from "@/components/teams/invite-member-dialog";
import { Link } from "react-router";

export function TeamsPage() {
  const { data: teams, isLoading: teamsLoading } = useTeams();
  const { activeTeam, setActiveTeam, openCreateTeamDialog } =
    useTeamStore();
  const { data: members, isLoading: membersLoading } = useTeamMembers(
    activeTeam?.id,
  );
  
  const { data: invitations, isLoading: invitationsLoading } = usePendingInvitations(activeTeam?.id || "");
  const respondMutation = useRespondToInvitation(activeTeam?.id || "");
  const updateRoleMutation = useUpdateMemberRole(activeTeam?.id || "");

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [inviteMemberOpen, setInviteMemberOpen] = useState(false);

  const isAdmin =
    activeTeam?.role === "ADMIN" || activeTeam?.role === "MAINTAINER";

  if (teamsLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary/40" />
        <p className="text-sm font-medium text-muted-foreground animate-pulse">
          Fetching your workspaces...
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto pb-24">
      <PageHeader
        title="Workspace Management"
        description="Configure your team boundaries and collaborate on high-fidelity documentation."
        action={
          <div className="flex gap-3">
            <Link to="/teams/discover">
              <Button
                variant="outline"
                className="border-primary/20 text-primary font-bold shadow-sm"
              >
                <Compass className="h-4 w-4 mr-2" />
                Discover Teams
              </Button>
            </Link>
            {activeTeam && isAdmin && (
              <Button
                variant="outline"
                className="border-emerald-500/20 text-emerald-600 font-bold shadow-sm hover:bg-emerald-50"
                onClick={() => setInviteMemberOpen(true)}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Invite
              </Button>
            )}
            <Button
              onClick={() => openCreateTeamDialog(true)}
              className="font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Workspace
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Team List Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-2 mb-2 px-1">
            <Users2 className="h-4 w-4 text-primary" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              My Teams
            </h3>
          </div>
          <TeamList
            teams={teams || []}
            activeTeamId={activeTeam?.id}
            onSelect={setActiveTeam}
          />
        </div>

        {/* Team Members Content */}
        <div className="lg:col-span-8 space-y-6">
          {activeTeam && (
            <InvitationList 
              invitations={invitations} 
              isLoading={invitationsLoading}
              onRespond={(invitationId, accept) => respondMutation.mutate({ invitationId, accept })}
              isRespondPending={respondMutation.isPending}
            />
          )}

          <TeamRoster
            teamName={activeTeam?.name}
            members={members}
            isLoading={membersLoading}
            isAdmin={isAdmin}
            currentUserRole={activeTeam?.role}
            onUpdateRole={(userId, role) => updateRoleMutation.mutate({ userId, role })}
            isUpdatePending={updateRoleMutation.isPending}
            onOpenSettings={() => setSettingsOpen(true)}
            onOpenInvite={() => setInviteMemberOpen(true)}
          />
        </div>
      </div>

      <CreateTeamDialog />
      {activeTeam && (
        <TeamSettingsDialog
          team={activeTeam}
          open={settingsOpen}
          onOpenChange={setSettingsOpen}
        />
      )}
      {activeTeam && (
        <InviteMemberDialog
          team={activeTeam}
          open={inviteMemberOpen}
          onOpenChange={setInviteMemberOpen}
        />
      )}
    </div>
  );
}
