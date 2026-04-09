import { useState, useEffect } from "react";
import { useTeamStore } from "@/stores/team-store";
import { useTeamConfig, useUpdateTeamConfig } from "@/hooks/use-config";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, RotateCcw, Save } from "lucide-react";
import { toast } from "sonner";

import { RagConfigForm } from "@/components/config/rag-config-form";
import { WeaviateConfigForm } from "@/components/config/weaviate-config-form";
import { TracingConfigForm } from "@/components/config/tracing-config-form";
import { GeneratorConfigForm } from "@/components/config/generator-config-form";
import { PipelineConfigForm } from "@/components/config/pipeline-config-form";

export function ConfigPage() {
  const { activeTeam } = useTeamStore();
  const [hasChanges, setHasChanges] = useState(false);
  const [config, setConfig] = useState<any>(null);

  const { data: fetchedConfigWrapper, isLoading } = useTeamConfig(
    activeTeam?.id,
  );

  const fetchedConfig =
    fetchedConfigWrapper?.config_data || fetchedConfigWrapper;

  useEffect(() => {
    if (fetchedConfig && !config) {
      setConfig(fetchedConfig);
    }
  }, [fetchedConfig, config]);

  const updateMutation = useUpdateTeamConfig(activeTeam?.id || "");

  if (!activeTeam) {
    return (
      <div className="p-6">
        <Alert>
          <AlertDescription>
            Please select a team to view configuration
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading || !fetchedConfig || !config) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const handleChange = (path: string[], value: any) => {
    setConfig((prev: any) => {
      if (!prev) return prev;
      const newConfig = JSON.parse(JSON.stringify(prev));
      let current: any = newConfig;
      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) current[path[i]] = {};
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      setHasChanges(true);
      return newConfig;
    });
  };

  const handleSave = () => {
    if (config) {
      updateMutation.mutate(config);
    }
  };

  const handleRevert = () => {
    setConfig(fetchedConfig);
    setHasChanges(false);
    toast.info("Changes reverted to saved configuration");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-border bg-card">
        <div className="flex items-center justify-between p-6">
          <div>
            <h1 className="text-2xl font-semibold">Project Configuration</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Configure project-specific settings for {activeTeam.name}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {hasChanges && (
              <Button
                variant="outline"
                onClick={handleRevert}
                disabled={updateMutation.isPending}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Revert Changes
              </Button>
            )}
            <Button
              onClick={handleSave}
              disabled={!hasChanges || updateMutation.isPending}
            >
              {updateMutation.isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save Configuration
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Alert>
            <AlertDescription>
              This page contains project-specific technical configuration.
            </AlertDescription>
          </Alert>

          <RagConfigForm config={config} onChange={handleChange} />
          <WeaviateConfigForm config={config} onChange={handleChange} />
          <TracingConfigForm config={config} onChange={handleChange} />
          <GeneratorConfigForm config={config} onChange={handleChange} />
          <PipelineConfigForm config={config} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
}
