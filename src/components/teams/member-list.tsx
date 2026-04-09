import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Crown, Shield, ShieldCheck, User } from "lucide-react";
import type { TeamMember } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MemberListProps {
  members: TeamMember[];
  currentUserRole?: string;
  onUpdateRole: (userId: string, newRole: string) => void;
  isUpdatePending: boolean;
}

const roleIcons: Record<string, any> = {
  ADMIN: Crown,
  MAINTAINER: ShieldCheck,
  EDITOR: Shield,
  VIEWER: User,
};

export function MemberList({
  members,
  currentUserRole,
  onUpdateRole,
  isUpdatePending,
}: MemberListProps) {
  const canManage =
    currentUserRole === "ADMIN" || currentUserRole === "MAINTAINER";

  return (
    <div className="grid gap-4">
      {members.map((member) => {
        const RoleIcon = roleIcons[member.role] || User;
        const username = member.user?.username || "User";
        const email = member.user?.email || "";

        return (
          <div
            key={member.id}
            className="flex items-center justify-between p-4 rounded-2xl border border-border/40 bg-card/40 backdrop-blur-sm hover:bg-card/60 transition-all shadow-sm"
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-background shadow-md">
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                  {username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-bold tracking-tight leading-none">
                  {username}
                </p>
                <p className="text-[11px] text-muted-foreground font-medium opacity-60">
                  {email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {canManage && member.role !== "ADMIN" ? (
                <Select
                  defaultValue={member.role}
                  onValueChange={(newRole) =>
                    onUpdateRole(member.user_id, newRole!!)
                  }
                  disabled={isUpdatePending}
                >
                  <SelectTrigger className="w-[130px] h-9 text-[11px] font-bold border-primary/10 bg-primary/5 text-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="MAINTAINER"
                      className="text-[11px] font-medium"
                    >
                      Maintainer
                    </SelectItem>
                    <SelectItem
                      value="EDITOR"
                      className="text-[11px] font-medium"
                    >
                      Editor
                    </SelectItem>
                    <SelectItem
                      value="VIEWER"
                      className="text-[11px] font-medium"
                    >
                      Viewer
                    </SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Badge
                  variant="outline"
                  className="gap-1.5 font-bold py-1.5 px-3 border-primary/20 bg-primary/5 text-primary shadow-sm shadow-primary/5"
                >
                  <RoleIcon className="h-3 w-3" />
                  <span className="capitalize text-[10px] tracking-widest">
                    {member.role}
                  </span>
                </Badge>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
