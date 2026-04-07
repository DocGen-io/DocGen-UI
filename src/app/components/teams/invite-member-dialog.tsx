import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { useRegenerateInviteLink } from '../../hooks/use-teams';
import { toast } from 'sonner';
import type { Team } from '../../types';

interface InviteMemberDialogProps {
  team: Team;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

import { InviteLinkSection } from "./invite-link-section";

export function InviteMemberDialog({ team, open, onOpenChange }: InviteMemberDialogProps) {
  const [copied, setCopied] = useState(false);
  const rotateMutation = useRegenerateInviteLink(team.id);

  const inviteLink = `${window.location.origin}/join/${team.invite_token}`;

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    toast.success('Invite link copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Invite to <span className="text-primary">{team.name}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-6">
          <InviteLinkSection 
            inviteLink={inviteLink}
            copied={copied}
            onCopy={copyInviteLink}
            onRotate={() => rotateMutation.mutate()}
            isRotatePending={rotateMutation.isPending}
          />

          <div className="pt-2 border-t border-border/40">
             <p className="text-[10px] text-center text-muted-foreground italic">
               Note: Rotating the link will immediately invalidate all previously shared links.
             </p>
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="font-bold px-8">
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
