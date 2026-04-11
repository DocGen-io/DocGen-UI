import { Check, X, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DiffViewer } from '@/components/revisions/diff-viewer';
import type { Revision } from '@/types';

interface RevisionCardProps {
  revision: Revision;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  isProcessing: boolean;
}

export function RevisionCard({ revision, onApprove, onReject, isProcessing }: RevisionCardProps) {
  return (
    <Card className="border-border/60 shadow-sm overflow-hidden group hover:border-primary/30 transition-all">
      <CardContent className="p-6 space-y-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded-lg group-hover:bg-primary/5 transition-colors">
                <FileText className="h-4 w-4 text-primary/70" />
              </div>
              <h3 className="font-bold text-lg tracking-tight truncate max-w-md">
                {revision.endpoint_id}
              </h3>
              <Badge variant={
                revision.status === 'APPROVED' ? 'default' :
                revision.status === 'REJECTED' ? 'destructive' :
                'secondary'
              } className="capitalize">
                {revision.status}
              </Badge>
            </div>
          </div>

          {revision.status === 'PENDING' && (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="border-primary/20 text-primary hover:bg-primary/5 font-semibold"
                onClick={() => onApprove(revision.id)}
                disabled={isProcessing}
              >
                <Check className="h-4 w-4 mr-2" />
                Approve
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/5"
                onClick={() => onReject(revision.id)}
                disabled={isProcessing}
              >
                <X className="h-4 w-4 mr-2" />
                Reject
              </Button>
            </div>
          )}
        </div>

        <div className="rounded-xl border border-border/40 overflow-hidden">
          <DiffViewer
            originalContent={revision.original_content}
            proposedContent={revision.proposed_content}
          />
        </div>
      </CardContent>
    </Card>
  );
}
