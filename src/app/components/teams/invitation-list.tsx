import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Check, X, Loader2, Clock } from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';

interface InvitationListProps {
  invitations: any[] | undefined;
  isLoading: boolean;
  onRespond: (invitationId: string, accept: boolean) => void;
  isRespondPending: boolean;
}

export function InvitationList({ 
  invitations, 
  isLoading, 
  onRespond, 
  isRespondPending 
}: InvitationListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary/30" />
      </div>
    );
  }

  if (!invitations || invitations.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 mb-8">
      <div className="flex items-center gap-2 px-1">
        <Clock className="h-4 w-4 text-amber-500" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Pending Requests</h3>
        <Badge variant="secondary" className="h-5 px-1.5 min-w-[20px] justify-center bg-amber-500/10 text-amber-600 border-amber-500/20">
          {invitations.length}
        </Badge>
      </div>

      <div className="grid gap-3">
        {invitations.map((inv) => (
          <div
            key={inv.id}
            className="flex items-center justify-between p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 transition-all"
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                <AvatarFallback className="bg-amber-500/10 text-amber-600 font-bold">
                  RQ
                </AvatarFallback>
              </Avatar>
              <div className="space-y-0.5">
                <p className="text-sm font-bold tracking-tight">
                  Join Request
                </p>
                <p className="text-[10px] text-muted-foreground font-medium opacity-70">
                  User ID: {inv.invitee_user_id.substring(0, 8)}...
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0 border-destructive/20 text-destructive hover:bg-destructive/10"
                onClick={() => onRespond(inv.id, false)}
                disabled={isRespondPending}
              >
                <X className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                className="h-8 w-8 p-0 bg-emerald-600 hover:bg-emerald-700 text-white border-0"
                onClick={() => onRespond(inv.id, true)}
                disabled={isRespondPending}
              >
                <Check className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
