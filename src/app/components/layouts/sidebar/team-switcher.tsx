import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import { ChevronDown, Plus } from "lucide-react";
import { useTeams } from "../../../hooks/use-teams";
import { useTeamStore } from "../../../stores/team-store";
import { cn } from "../../ui/utils";

const TeamSwitcher = () => {
  const { data: teams } = useTeams();
  const { activeTeam, setActiveTeam, dialogOpen, openCreateTeamDialog } =
    useTeamStore();

  useEffect(() => {
    if (teams && teams.length > 0 && !activeTeam) {
      const savedTeamId = localStorage.getItem("active_team_id");
      const teamToSet = savedTeamId
        ? teams.find((t) => t.id === savedTeamId) || teams[0]
        : teams[0];
      setActiveTeam(teamToSet);
    }
  }, [teams, activeTeam, setActiveTeam]);

  return (
    <div className="p-4 border-b border-border">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between rounded-xl h-10 bg-card/50"
          >
            <span className="truncate font-medium">
              {activeTeam?.name || "Select Team"}
            </span>
            <ChevronDown className="h-4 w-4 ml-2 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 rounded-xl shadow-2xl"
          align="start"
        >
          <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Your Teams
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {teams?.map((team) => (
            <DropdownMenuItem
              key={team.id}
              onClick={() => setActiveTeam(team)}
              className={cn(
                "rounded-lg my-0.5",
                activeTeam?.id === team.id &&
                  "bg-primary/10 text-primary font-bold",
              )}
            >
              <div className="flex flex-col">
                <span>{team.name}</span>
                <span className="text-[10px] opacity-70">
                  {team.member_count} members
                </span>
              </div>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => openCreateTeamDialog(true)}
            className="rounded-lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Team
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TeamSwitcher;
