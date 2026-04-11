import { useState, useEffect, useMemo } from "react";
import { parseISO, intervalToDuration, formatDuration } from "date-fns";
import type { JobStatus } from "@/types/jobs";

interface JobDurationProps {
  createdAt?: string;
  updatedAt?: string;
  status: JobStatus;
  className?: string;
}

/**
 * A standalone component to display job duration.
 * If the job is active (processing/running), it ticks every second.
 * If the job is finished, it shows the static total duration.
 */
export function JobDuration({ createdAt, updatedAt, status, className }: JobDurationProps) {
  const [now, setNow] = useState(new Date());

  const isFinished = status === "completed" || status === "failed" || status === "cancelled";

  useEffect(() => {
    if (isFinished) return;

    // Tick every second to update the "now" reference for live duration
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [isFinished]);

  const durationStr = useMemo(() => {
    if (!createdAt) return "N/A";

    try {
      const start = parseISO(createdAt);
      const end = isFinished && updatedAt ? parseISO(updatedAt) : now;
      
      const duration = intervalToDuration({ start, end });
      
      // If we are under a minute, ensure we show seconds clearly
      if (!duration.minutes && !duration.hours && !duration.days) {
          const diffInSeconds = Math.floor((end.getTime() - start.getTime()) / 1000);
          return `${Math.max(0, diffInSeconds)}s`;
      }

      return formatDuration(duration, { format: ["minutes", "seconds"] }) || "0s";
    } catch (e) {
      return "0s";
    }
  }, [createdAt, updatedAt, isFinished, now]);

  return <span className={className}>{durationStr}</span>;
}
