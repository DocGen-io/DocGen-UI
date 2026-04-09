import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw, Loader2, Globe, Lock } from "lucide-react";

interface TeamSettingsFormProps {
  description: string;
  setDescription: (val: string) => void;
  isPublic: boolean;
  setIsPublic: (val: boolean) => void;
  inviteLink: string;
  onCopyInviteLink: () => void;
  onRotateInviteLink: () => void;
  isRotatePending: boolean;
  onSave: () => void;
  onCancel: () => void;
  isSavePending: boolean;
  teamName: string;
}

export function TeamSettingsForm({
  description,
  setDescription,
  isPublic,
  setIsPublic,
  inviteLink,
  onCopyInviteLink,
  onRotateInviteLink,
  isRotatePending,
  onSave,
  onCancel,
  isSavePending,
  teamName,
}: TeamSettingsFormProps) {
  return (
    <div className="space-y-6 py-4">
      {/* Visibility Toggle */}
      <div className="flex items-center justify-between p-4 rounded-xl border bg-muted/30">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            {isPublic ? (
              <Globe className="h-4 w-4 text-primary" />
            ) : (
              <Lock className="h-4 w-4 text-muted-foreground" />
            )}
            <Label className="text-sm font-bold">Public Workspace</Label>
          </div>
          <p className="text-xs text-muted-foreground">
            {isPublic
              ? "Anyone can search for and request to join this workspace."
              : "Only invited members can access this workspace."}
          </p>
        </div>
        <Switch checked={isPublic} onCheckedChange={setIsPublic} />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label
          htmlFor="description"
          className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
        >
          Description
        </Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What is this workspace for?"
          className="bg-muted/20"
        />
      </div>

      {/* Invite Link */}
      <div className="space-y-2 pt-2">
        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Invitation Link
        </Label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              readOnly
              value={inviteLink}
              className="bg-muted/50 font-mono text-[10px] pr-10"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1 h-7 w-7"
              onClick={onCopyInviteLink}
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
          <Button
            size="icon"
            variant="outline"
            className="h-9 w-9 border-destructive/20 text-destructive hover:bg-destructive/10"
            onClick={onRotateInviteLink}
            disabled={isRotatePending}
            title="Rotate Link"
          >
            {isRotatePending ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <RefreshCw className="h-3 w-3" />
            )}
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground mt-1 px-1">
          Share this link with anyone you want to join as a{" "}
          <span className="font-bold text-primary">Viewer</span>.
        </p>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSave} disabled={isSavePending}>
          {isSavePending && (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          )}
          Save Changes
        </Button>
      </div>
    </div>
  );
}
