import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Team, TeamRole } from "@/types";

interface TeamState {
  activeTeam: Team | null;
  activeTeamId: string | null;
  dialogOpen: boolean;
  inviteRole: TeamRole | null;
  setInviteRole: (role: TeamRole | null) => void;
  setActiveTeam: (team: Team | null) => void;
  openCreateTeamDialog: (open: boolean) => void;
}

export const useTeamStore = create<TeamState>()(
  persist(
    (set) => ({
      activeTeam: null,
      activeTeamId: null,
      dialogOpen: false,
      inviteRole: null,
      setInviteRole: (role) => set({ inviteRole: role }),
      setActiveTeam: (team) =>
        set({ activeTeam: team, activeTeamId: team?.id || null }),
      openCreateTeamDialog: (open) =>
        set({
          activeTeam: null,
          activeTeamId: null,
          dialogOpen: open,
        }),
    }),
    {
      name: "team-storage",
    },
  ),
);
