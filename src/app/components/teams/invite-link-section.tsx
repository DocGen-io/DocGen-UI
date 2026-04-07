import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Copy, RefreshCw, Loader2, Link as LinkIcon, Check } from "lucide-react";

interface InviteLinkSectionProps {
  inviteLink: string;
  copied: boolean;
  onCopy: () => void;
  onRotate: () => void;
  isRotatePending: boolean;
}

export function InviteLinkSection({
  inviteLink,
  copied,
  onCopy,
  onRotate,
  isRotatePending,
}: InviteLinkSectionProps) {
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 space-y-3">
        <div className="flex items-center gap-2 text-primary">
          <LinkIcon className="h-4 w-4" />
          <span className="text-xs font-bold uppercase tracking-widest">
            Shareable Invitation Link
          </span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Send this link to whoever you want to join. They will be added as a{" "}
          <span className="font-bold text-foreground">Viewer</span> by default.
        </p>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            readOnly
            value={inviteLink}
            className="bg-muted/50 font-mono text-[11px] pr-12 h-11 border-primary/10"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-1 top-1 h-9 w-9 text-primary hover:bg-primary/10"
            onClick={onCopy}
          >
            {copied ? (
              <Check className="h-4 w-4 text-emerald-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        <Button
          size="icon"
          variant="outline"
          className="h-11 w-11 border-destructive/20 text-destructive hover:bg-destructive/10 transition-colors"
          onClick={onRotate}
          disabled={isRotatePending}
          title="Regenerate Link (Revokes old link)"
        >
          {isRotatePending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
