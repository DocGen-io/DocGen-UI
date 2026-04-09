import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InvalidInvitationCardProps {
  onReturn: () => void;
}

export function InvalidInvitationCard({
  onReturn,
}: InvalidInvitationCardProps) {
  return (
    <Card className="w-full max-w-md border-destructive/20 bg-destructive/5">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
          <AlertCircle className="h-6 w-6 text-destructive" />
        </div>
        <CardTitle className="text-destructive font-bold">
          Invalid Invitation
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4 pb-8">
        <p className="text-sm text-muted-foreground leading-relaxed">
          This invitation link is either invalid, has expired, or has been
          rotated by the workspace administrator.
        </p>
        <Button variant="outline" className="w-full" onClick={onReturn}>
          Return to Workspaces
        </Button>
      </CardContent>
    </Card>
  );
}
