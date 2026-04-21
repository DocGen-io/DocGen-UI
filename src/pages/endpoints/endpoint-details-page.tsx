import { useParams, useSearchParams } from "react-router";
import { useEndpointDetails } from "@/hooks/use-endpoints";
import { useTeamStore } from "@/stores/team-store";
import { EndpointHeader } from "@/components/endpoints/detail/endpoint-header";
import { EndpointActions } from "@/components/endpoints/detail/endpoint-actions";
import { EndpointPayloadViewer } from "@/components/endpoints/detail/endpoint-payload-viewer";

export function EndpointDetailsPage() {
  const { projectName } = useParams();
  const [searchParams] = useSearchParams();
  const path = searchParams.get("path");
  const method = searchParams.get("method");
  const { activeTeam } = useTeamStore();

  const { data: endpointData, isLoading } = useEndpointDetails(
    projectName || "",
    path || "",
    method || "",
    activeTeam?.id
  );

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto px-6 py-8 animation-fade-in">
        <div className="h-24 w-full bg-muted/30 animate-pulse rounded-2xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="h-40 w-full bg-muted/20 animate-pulse rounded-xl" />
            <div className="h-64 w-full bg-muted/20 animate-pulse rounded-xl" />
          </div>
          <div className="lg:col-span-1">
            <div className="h-72 w-full bg-card border border-border/50 animate-pulse rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  let currentEndpoint = null;
  let currentPath = "";
  let currentMethod = "";

  if (endpointData) {
    currentEndpoint = endpointData;
    currentPath = endpointData.path || path || "";
    currentMethod = endpointData.method || method || "";
  }

  if (!currentEndpoint) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <h2 className="text-xl font-bold mb-2">Endpoint Not Found</h2>
        <p className="text-muted-foreground">The endpoint you are looking for might have been removed or the ID is invalid!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto px-6 py-8 animation-fade-in">
      <EndpointHeader
        path={currentPath}
        method={currentMethod}
        summary={currentEndpoint.summary}
        operationId={currentEndpoint.operationId}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <EndpointPayloadViewer endpoint={currentEndpoint} />
        </div>

        {/* Sidebar Actions Area */}
        <div className="lg:col-span-1">
          <EndpointActions
            projectName={projectName!}
            routeId={endpointData?.id || ""}
            method={currentMethod}
            path={currentPath}
            endpointData={currentEndpoint}
          />
        </div>
      </div>
    </div>
  );
}
