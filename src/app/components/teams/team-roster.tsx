import { Loader2, Plus, Settings, Users2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { MemberList } from "./member-list";

interface TeamRosterProps {
  teamName?: string;
  members: any[] | undefined;
  isLoading: boolean;
  isAdmin: boolean;
  isUpdatePending: boolean;
  onUpdateRole: (userId: string, role: string) => void;
  onOpenSettings: () => void;
  onOpenInvite: () => void;
  currentUserRole?: string;
}

export function TeamRoster({
  teamName,
  members,
  isLoading,
  isAdmin,
  isUpdatePending,
  onUpdateRole,
  onOpenSettings,
  onOpenInvite,
  currentUserRole,
}: TeamRosterProps) {
  return (
    <Card className="border-border/60 shadow-xl shadow-background/5 overflow-hidden">
      <CardHeader className="border-b bg-muted/20 pb-5">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold tracking-tight">
              Team Roster
            </CardTitle>
            <p className="text-xs text-muted-foreground font-medium">
              Collaborators in{" "}
              <span className="text-primary font-bold">
                {teamName || "Workspace"}
              </span>
            </p>
          </div>
          {isAdmin && (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="border-primary/20 text-primary hover:bg-primary/5 font-bold"
                onClick={onOpenSettings}
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button size="sm" className="font-bold" onClick={onOpenInvite}>
                <Plus className="h-4 w-4 mr-2" />
                Invite
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary/30" />
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest opacity-50">
              Syncing Roster...
            </p>
          </div>
        ) : members && members.length > 0 ? (
          <MemberList
            members={members}
            currentUserRole={currentUserRole}
            onUpdateRole={onUpdateRole}
            isUpdatePending={isUpdatePending}
          />
        ) : (
          <div className="py-24 text-center space-y-4">
            <div className="p-5 bg-muted w-20 h-20 rounded-[2rem] mx-auto flex items-center justify-center shadow-inner">
              <Users2 className="h-10 w-10 text-muted-foreground/30" />
            </div>
            <div className="space-y-1">
              <p className="text-base font-bold text-muted-foreground">
                Workspace is empty
              </p>
              <p className="text-xs text-muted-foreground/60 max-w-[240px] mx-auto leading-relaxed">
                Start by inviting your colleagues or sharing your public
                discovery link.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
