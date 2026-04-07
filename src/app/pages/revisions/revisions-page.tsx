import { useTeamStore } from '../../stores/team-store';
import { useRevisions, useApproveRevision, useRejectRevision } from '../../hooks/use-revisions';
import { PageHeader } from '../../components/shared/page-header';
import { GitPullRequest, Search, Loader2 } from 'lucide-react';
import { EmptyState } from '../../components/shared/empty-state';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { RevisionCard } from '../../components/revisions/revision-card';
import type { RevisionStatus } from '../../types';
import { useState } from 'react';

export function RevisionsPage() {
  const { activeTeam } = useTeamStore();
  const activeTeamId = activeTeam?.id;
  const { data: revisions, isLoading } = useRevisions(activeTeamId || undefined);
  const approveRevision = useApproveRevision(activeTeamId!);
  const rejectRevision = useRejectRevision(activeTeamId!);
  const [filter, setFilter] = useState<RevisionStatus | 'all'>('all');

  const handleApprove = (revisionId: string) => {
    approveRevision.mutate(revisionId);
  };

  const handleReject = (revisionId: string) => {
    rejectRevision.mutate(revisionId);
  };

  const filteredRevisions = revisions?.filter(r =>
    filter === 'all' ? true : r.status === filter
  ) || [];

  const counts = {
    all: revisions?.length || 0,
    pending: revisions?.filter(r => r.status === 'pending').length || 0,
    approved: revisions?.filter(r => r.status === 'approved').length || 0,
    rejected: revisions?.filter(r => r.status === 'rejected').length || 0,
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <PageHeader
        title="Artifact Revisions"
        description="Verify and merge AI-generated schema modifications across your documentation."
      />

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary/40" />
          <p className="text-sm font-medium text-muted-foreground animate-pulse">Syncing revisions...</p>
        </div>
      ) : (
        <Tabs value={filter} onValueChange={(v) => setFilter(v as RevisionStatus | 'all')} className="w-full">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="all" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
              All <span className="ml-2 px-1.5 py-0.5 rounded-full bg-muted text-[10px]">{counts.all}</span>
            </TabsTrigger>
            <TabsTrigger value="pending" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
              Pending <span className="ml-2 px-1.5 py-0.5 rounded-full bg-orange-500/10 text-orange-600 text-[10px]">{counts.pending}</span>
            </TabsTrigger>
            <TabsTrigger value="approved" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
              Approved <span className="ml-2 px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-600 text-[10px]">{counts.approved}</span>
            </TabsTrigger>
            <TabsTrigger value="rejected" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
              Rejected <span className="ml-2 px-1.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 text-[10px]">{counts.rejected}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={filter} className="mt-8">
            {filteredRevisions.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {filteredRevisions.map((revision) => (
                  <RevisionCard 
                    key={revision.id} 
                    revision={revision} 
                    onApprove={handleApprove}
                    onReject={handleReject}
                    isProcessing={approveRevision.isPending || rejectRevision.isPending}
                  />
                ))}
              </div>
            ) : (
              <div className="py-24 bg-muted/20 rounded-3xl border border-dashed border-border/60">
                <EmptyState
                  icon={Search}
                  title={filter === 'all' ? "No revisions recorded" : `No ${filter} revisions`}
                  description={
                    filter === 'all'
                      ? "Submit a documentation job to see AI-generated change requests here."
                      : "The filtered queue is currently empty."
                  }
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}