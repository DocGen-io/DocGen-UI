import React, { FC } from "react";
import { LogEntry } from "../../types";
import { cn } from "../ui/utils";

interface JobLogProps {
  log: LogEntry;
}
const JobLog: FC<JobLogProps> = ({ log }) => {
  return (
    <div className="flex gap-4 group hover:bg-white/5 py-0.5 rounded transition-colors -mx-2 px-2">
      <span className="text-slate-600 flex-shrink-0 font-bold tabular-nums">
        {new Date(log.timestamp).toLocaleTimeString([], { hour12: false })}
      </span>
      <span
        className={cn(
          "leading-relaxed",
          log.level === "error" && "text-rose-400 font-semibold",
          log.level === "warning" && "text-amber-400",
          log.level === "success" && "text-emerald-400",
          log.level === "info" && "text-slate-300",
        )}
      >
        <span className="uppercase text-[9px] mr-2 px-1 rounded bg-slate-800 text-slate-400 font-bold border border-slate-700/50">
          {log.level}
        </span>
        {log.message}
      </span>
    </div>
  );
};

export default JobLog;
