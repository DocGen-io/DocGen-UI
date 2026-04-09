import { Badge } from "@/components/ui/badge";
import type { JobStatus, StatusConfigMap } from "@/types";
import {
  CheckCircle2,
  Clock,
  Loader2,
  XCircle,
  PlayCircle,
  Ban,
} from "lucide-react";

interface JobStatusBadgeProps {
  status: JobStatus;
}

export function JobStatusBadge({ status }: JobStatusBadgeProps) {
  const config: StatusConfigMap = {
    pending: {
      label: "Pending",
      icon: Clock,
      variant: "secondary" as const,
    },
    queued: {
      label: "Queued",
      icon: Clock,
      variant: "secondary" as const,
    },
    running: {
      label: "Running",
      icon: Loader2,
      variant: "default" as const,
      animate: true,
    },
    processing: {
      label: "Processing",
      icon: PlayCircle,
      variant: "default" as const,
    },
    completed: {
      label: "Completed",
      icon: CheckCircle2,
      className: "bg-success text-success-foreground",
    },
    failed: {
      label: "Failed",
      icon: XCircle,
      variant: "destructive" as const,
    },
    cancelled: {
      label: "Cancelled",
      icon: Ban,
      variant: "secondary" as const,
    },
  };

  const { label, icon: Icon, variant, className, animate } = config[status];

  return (
    <Badge variant={variant} className={className}>
      <Icon className={`h-3 w-3 mr-1 ${animate ? "animate-spin" : ""}`} />
      {label}
    </Badge>
  );
}
