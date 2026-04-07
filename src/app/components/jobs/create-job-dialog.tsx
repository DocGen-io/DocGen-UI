import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { GitBranch, Folder, Loader2, AlertCircle } from 'lucide-react';
import { useCreateJob } from '../../hooks/use-jobs';
import { useTeamStore } from '../../stores/team-store';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import type { JobType } from '../../types';

interface CreateJobDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateJobDialog({ open, onOpenChange }: CreateJobDialogProps) {
  const { activeTeam } = useTeamStore();
  const createJob = useCreateJob(activeTeam?.id || '');
  const [jobType, setJobType] = useState<JobType>('git');
  const [formData, setFormData] = useState({
    repositoryUrl: '',
    branch: 'main',
    localPath: '',
    apiDir: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTeam?.id) return;

    createJob.mutate(
      {
        source_type: jobType,
        path: jobType === 'git' ? formData.repositoryUrl : formData.localPath,
        api_dir: formData.apiDir || undefined,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          setFormData({ repositoryUrl: '', branch: 'main', localPath: '', apiDir: '' });
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] gap-6">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create Documentation Job</DialogTitle>
          <DialogDescription>
            Start a new job to generate or update documentation for your code
          </DialogDescription>
        </DialogHeader>

        {createJob.isError && (
          <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2 duration-300">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Submission Failed</AlertTitle>
            <AlertDescription className="whitespace-pre-line text-xs font-mono mt-1">
              {createJob.error.message}
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={jobType} onValueChange={(v) => setJobType(v as JobType)}>
          <TabsList className="grid w-full grid-cols-2 p-1 bg-muted/50 rounded-xl mb-4">
            <TabsTrigger value="git" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all py-2.5">
              <GitBranch className="h-4 w-4 mr-2" />
              Git Repository
            </TabsTrigger>
            <TabsTrigger value="local" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all py-2.5">
              <Folder className="h-4 w-4 mr-2" />
              Local Path
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit} className="space-y-5">
            <TabsContent value="git" className="mt-0 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="repositoryUrl">Repository URL</Label>
                <Input
                  id="repositoryUrl"
                  placeholder="https://github.com/user/repo"
                  value={formData.repositoryUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, repositoryUrl: e.target.value })
                  }
                  required={jobType === 'git'}
                  className="bg-muted/30 border-muted/60 focus:bg-background transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="branch">Branch</Label>
                <Input
                  id="branch"
                  placeholder="main"
                  value={formData.branch}
                  onChange={(e) =>
                    setFormData({ ...formData, branch: e.target.value })
                  }
                  className="bg-muted/30 border-muted/60 focus:bg-background transition-colors"
                />
              </div>
            </TabsContent>

            <TabsContent value="local" className="mt-0 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="localPath">Local Path</Label>
                <Input
                  id="localPath"
                  placeholder="/path/to/project"
                  value={formData.localPath}
                  onChange={(e) =>
                    setFormData({ ...formData, localPath: e.target.value })
                  }
                  required={jobType === 'local'}
                  className="bg-muted/30 border-muted/60 focus:bg-background transition-colors"
                />
              </div>
            </TabsContent>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="apiDir">Source Directory (Optional)</Label>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest bg-muted/40 px-1.5 py-0.5 rounded">Advanced</span>
              </div>
              <Input
                id="apiDir"
                placeholder="e.g. ./src/api"
                value={formData.apiDir}
                onChange={(e) =>
                  setFormData({ ...formData, apiDir: e.target.value })
                }
                className="bg-muted/30 border-muted/60 focus:bg-background transition-colors"
              />
              <p className="text-[11px] text-muted-foreground">
                Path relative to root where your API definitions are located.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
                className="hover:bg-muted"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={createJob.isPending}
                className="min-w-[120px]"
              >
                {createJob.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Starting...
                  </>
                ) : (
                  'Create Job'
                )}
              </Button>
            </div>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
