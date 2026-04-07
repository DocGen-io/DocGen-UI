import { useState, useMemo, useEffect } from 'react';
import { PageHeader } from '../../components/shared/page-header';
import { Loader2, LayoutGrid, Sparkles } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { useTeamStore } from '../../stores/team-store';
import { EndpointCard } from '../../components/endpoints/endpoint-card';
import { ProjectSelector } from '../../components/endpoints/project-selector';
import { EndpointSearch } from '../../components/endpoints/endpoint-search';
import { EndpointActions } from '../../components/endpoints/endpoint-actions';
import { ClusterList } from '../../components/endpoints/cluster-list';
import { SearchResults } from '../../components/endpoints/search-results';

import {
  useEndpoints,
  useSearchJob,
  useClusterJob,
  useSemanticSearch,
  useClustering,
  useRerunPipeline
} from '../../hooks/use-endpoints';
import { useProjectDiscovery } from '../../hooks/use-project-discovery';

export function EndpointsPage() {
  const { activeTeam } = useTeamStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'query' | 'clusters'>('all');
  const [searchJobId, setSearchJobId] = useState<string | null>(null);
  const [clusterJobId, setClusterJobId] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<any>(null);
  const [clusterResult, setClusterResult] = useState<any>(null);

  const {
    projectName,
    setProjectName,
    availableProjects,
    setSearchParams
  } = useProjectDiscovery(activeTeam?.name);

  // Data fetching
  const { data: endpointsData, isLoading: isLoadingEndpoints } = useEndpoints(projectName);
  const { data: searchJobStatus } = useSearchJob(searchJobId);
  const { data: clusterJobStatus } = useClusterJob(clusterJobId);

  useEffect(() => {
    if (searchJobStatus?.job?.status === 'completed' && searchJobStatus.job.result) {
      setSearchResult(searchJobStatus.job.result);
      setActiveTab('query');
    }
  }, [searchJobStatus]);

  useEffect(() => {
    if (clusterJobStatus?.job?.status === 'completed' && clusterJobStatus.job.result) {
      setClusterResult(clusterJobStatus.job.result);
      setActiveTab('clusters');
    }
  }, [clusterJobStatus]);

  const semanticSearch = useSemanticSearch(projectName);
  const clustering = useClustering(projectName);
  const rerunPipeline = useRerunPipeline(projectName, activeTeam?.id);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    semanticSearch.mutate(searchQuery, {
      onSuccess: (data: any) => {
        setSearchJobId(data.job_id);
        setSearchResult(null);
      }
    });
  };

  const handleClustering = () => {
    clustering.mutate(undefined, {
      onSuccess: (data: any) => {
        setClusterJobId(data.job_id);
        setClusterResult(null);
      }
    });
  };

  const endpoints = useMemo(() => {
    if (!endpointsData?.endpoints) return [];
    return Object.entries(endpointsData.endpoints).flatMap(([path, pathItem]: [string, any]) =>
      Object.entries(pathItem).map(([method, data]: [string, any]) => ({
        path,
        method,
        data,
        name: data.operationId || data.summary || `${method} ${path}`
      }))
    );
  }, [endpointsData]);

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto pb-24">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <PageHeader
          title="API Infrastructure Gallery"
          description="Interact with AI-generated OpenAPI specifications, search semantically, and manage endpoint revisions."
        />
        <div className="flex flex-wrap items-center gap-3">
          <ProjectSelector
            projectName={projectName}
            setProjectName={setProjectName}
            availableProjects={availableProjects}
            setSearchParams={setSearchParams}
          />
          <EndpointActions
            onCluster={handleClustering}
            isClustering={clustering.isPending}
            onRerun={() => rerunPipeline.mutate()}
            isRerunning={rerunPipeline.isPending}
          />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <EndpointSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
          isSearching={semanticSearch.isPending}
        />

        <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)} className="w-full">
          <TabsList className="justify-start h-12 bg-transparent border-b rounded-none w-full gap-4 sm:gap-8 p-0 overflow-x-auto overflow-y-hidden custom-scrollbar">
            <TabsTrigger value="all" className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none h-full px-4 font-bold transition-all whitespace-nowrap">All Endpoints</TabsTrigger>
            <TabsTrigger value="query" disabled={!searchResult} className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none h-full px-4 font-bold transition-all flex items-center gap-2 whitespace-nowrap">
              <Sparkles className="w-4 h-4" /> AI Search Results
            </TabsTrigger>
            <TabsTrigger value="clusters" disabled={!clusterResult} className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none h-full px-4 font-bold transition-all flex items-center gap-2 whitespace-nowrap">
              <LayoutGrid className="w-4 h-4" /> Groups
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-8">
            {isLoadingEndpoints ? (
              <div className="py-24 flex flex-col items-center gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-primary/50" />
                <p className="text-muted-foreground animate-pulse font-medium">Scanning infrastructure for endpoints...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {endpoints.map((ep, i) => (
                  <EndpointCard key={`${ep.path}-${ep.method}-${i}`} ep={ep} projectName={projectName} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="query" className="mt-8">
            {searchResult && (
              <SearchResults 
                results={searchResult.results || []} 
                projectName={projectName} 
              />
            )}
          </TabsContent>

          <TabsContent value="clusters" className="mt-8">
            {clusterResult && (
              <ClusterList 
                clusters={clusterResult.clusters || {}} 
                projectName={projectName} 
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
