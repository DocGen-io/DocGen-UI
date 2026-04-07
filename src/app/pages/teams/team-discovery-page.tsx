import { useState } from 'react';
import { usePublicTeams, useRequestJoin, useTeams } from '../../hooks/use-teams';
import { PageHeader } from '../../components/shared/page-header';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Search, Globe, ArrowLeft, Loader2 } from 'lucide-react';

import { useNavigate } from 'react-router';
import { TeamDiscoveryCard } from '../../components/teams/team-discovery-card';

export function TeamDiscoveryPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const { data: publicTeams, isLoading } = usePublicTeams(search);
  const { data: myTeams } = useTeams();
  const requestJoinMutation = useRequestJoin();

  const myTeamIds = new Set(myTeams?.map(t => t.id) || []);

  const handleBack = () => {
    navigate('/teams');
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto pb-24">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={handleBack} className="rounded-full">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <PageHeader
          title="Discover Workspaces"
          description="Find and join public teams collaborating on high-fidelity documentation."
        />
      </div>

      <div className="relative max-w-2xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by workspace name..."
          className="pl-10 h-12 bg-card/50 border-primary/10 transition-all focus:ring-2 focus:ring-primary/20"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary/40" />
          <p className="text-sm font-medium text-muted-foreground animate-pulse">Scanning public registry...</p>
        </div>
      ) : publicTeams && publicTeams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publicTeams.map((team) => (
            <TeamDiscoveryCard 
              key={team.id}
              team={team}
              isMember={myTeamIds.has(team.id)}
              onJoinRequest={(id) => requestJoinMutation.mutate(id)}
              isJoining={requestJoinMutation.isPending}
            />
          ))}
        </div>
      ) : (
        <div className="py-32 text-center space-y-6 max-w-sm mx-auto">
          <div className="p-8 bg-muted/30 w-24 h-24 rounded-[2.5rem] mx-auto flex items-center justify-center shadow-inner">
             <Globe className="h-12 w-12 text-muted-foreground/20" />
          </div>
          <div className="space-y-2">
            <p className="text-xl font-bold text-muted-foreground">No public teams found</p>
            <p className="text-sm text-muted-foreground/60 leading-relaxed">
              Try adjusting your search or check back later for new communities.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
