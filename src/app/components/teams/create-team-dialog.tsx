import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Loader2 } from "lucide-react";
import { useCreateTeam } from "../../hooks/use-teams";
import { useTeamStore } from "../../stores/team-store";

import { TeamForm } from "./team-form";

export function CreateTeamDialog() {
  const createTeam = useCreateTeam();
  const { dialogOpen, openCreateTeamDialog } = useTeamStore();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTeam.mutate(formData, {
      onSuccess: () => {
        openCreateTeamDialog(false);
        setFormData({ name: "", description: "" });
      },
    });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={openCreateTeamDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Team</DialogTitle>
          <DialogDescription>
            Create a team to collaborate with others on documentation
          </DialogDescription>
        </DialogHeader>
        <TeamForm 
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onCancel={() => openCreateTeamDialog(false)}
          isPending={createTeam.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
