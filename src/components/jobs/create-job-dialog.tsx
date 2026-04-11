import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GitBranch, Folder, Loader2, AlertCircle } from "lucide-react";
import { useCreateJob } from "@/hooks/use-jobs";
import { useTeamStore } from "@/stores/team-store";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { JobType } from "@/types";
import { GitSourceFields } from "@/components/jobs/create-job/git-source-fields";
import { LocalSourceFields } from "@/components/jobs/create-job/local-source-fields";
import { AdvancedJobOptions } from "@/components/jobs/create-job/advanced-job-options";

interface CreateJobDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateJobDialog({ open, onOpenChange }: CreateJobDialogProps) {
  const { activeTeam } = useTeamStore();
  const createJob = useCreateJob(activeTeam?.id || "");
  const [jobType, setJobType] = useState<JobType>("git");
  const [formData, setFormData] = useState({
    repositoryUrl: "",
    branch: "main",
    localPath: "",
    apiDir: "",
    projectName: "",
  });

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTeam?.id) return;

    createJob.mutate(
      {
        source_type: jobType,
        path: jobType === "git" ? formData.repositoryUrl : formData.localPath,
        project_name: formData.projectName || undefined,
        api_dir: formData.apiDir || undefined,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          setFormData({
            repositoryUrl: "",
            branch: "main",
            localPath: "",
            apiDir: "",
            projectName: "",
          });
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] gap-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Create Documentation Job
          </DialogTitle>
          <DialogDescription>
            Start a new job to generate or update documentation for your code
          </DialogDescription>
        </DialogHeader>

        {createJob.isError && (
          <Alert
            variant="destructive"
            className="animate-in fade-in slide-in-from-top-2 duration-300"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Submission Failed</AlertTitle>
            <AlertDescription className="whitespace-pre-line text-xs font-mono mt-1">
              {createJob.error.message}
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={jobType} onValueChange={(v) => setJobType(v as JobType)}>
          <TabsList className="grid w-full grid-cols-2 p-1 bg-muted/50 rounded-xl mb-6">
            <TabsTrigger
              value="git"
              className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all py-2.5"
            >
              <GitBranch className="h-4 w-4 mr-2" />
              Git Repository
            </TabsTrigger>
            <TabsTrigger
              value="local"
              className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all py-2.5"
            >
              <Folder className="h-4 w-4 mr-2" />
              Local Path
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit} className="space-y-6">
            <TabsContent value="git" className="m-0">
              <GitSourceFields
                repositoryUrl={formData.repositoryUrl}
                branch={formData.branch}
                onChange={handleFieldChange}
                required={jobType === "git"}
              />
            </TabsContent>

            <TabsContent value="local" className="m-0">
              <LocalSourceFields
                localPath={formData.localPath}
                onChange={handleFieldChange}
                required={jobType === "local"}
              />
            </TabsContent>

            <AdvancedJobOptions
              projectName={formData.projectName}
              apiDir={formData.apiDir}
              onChange={handleFieldChange}
            />

            <div className="flex justify-end gap-3 pt-4 border-t border-border/40 mt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
                className="hover:bg-muted font-semibold transition-colors"
                disabled={createJob.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createJob.isPending}
                className="min-w-[130px] font-bold shadow-lg shadow-primary/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {createJob.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Starting...
                  </>
                ) : (
                  "Create Job"
                )}
              </Button>
            </div>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
