import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { useUpdateTeam, useRegenerateInviteLink } from '../../hooks/use-teams';
import { toast } from 'sonner';
import type { Team } from '../../types';

interface TeamSettingsDialogProps {
  team: Team;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

import { TeamSettingsForm } from "./team-settings-form";

export function TeamSettingsDialog({ team, open, onOpenChange }: TeamSettingsDialogProps) {
  const [description, setDescription] = useState(team.description || '');
  const [isPublic, setIsPublic] = useState(team.is_public);
  const updateMutation = useUpdateTeam(team.id);
  const rotateMutation = useRegenerateInviteLink(team.id);

  const handleSave = () => {
    updateMutation.mutate(
      { description, is_public: isPublic },
      { onSuccess: () => onOpenChange(false) }
    );
  };

  const inviteLink = `${window.location.origin}/join/${team.invite_token}`;

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    toast.success('Invite link copied to clipboard');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Workspace Settings: <span className="text-primary">{team.name}</span>
          </DialogTitle>
        </DialogHeader>
        
        <TeamSettingsForm
          teamName={team.name}
          description={description}
          setDescription={setDescription}
          isPublic={isPublic}
          setIsPublic={setIsPublic}
          inviteLink={inviteLink}
          onCopyInviteLink={copyInviteLink}
          onRotateInviteLink={() => rotateMutation.mutate()}
          isRotatePending={rotateMutation.isPending}
          onSave={handleSave}
          onCancel={() => onOpenChange(false)}
          isSavePending={updateMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
