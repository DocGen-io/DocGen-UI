// ==================== Job Management ====================

import { LucideIcon } from "lucide-react";
import { LogEntry } from "./logs";

export type JobType = "git" | "local" | "upload";
export type JobStatus =
  | "pending"
  | "queued"
  | "running"
  | "processing"
  | "completed"
  | "failed"
  | "cancelled";

export interface Job {
  id: string;
  team_id: string;
  submitted_by?: string;
  source_type: string;
  path: string;
  api_dir?: string;
  status: JobStatus;
  result?: Record<string, any>;
  error?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateJobRequest {
  source_type: string;
  path: string;
  credentials?: string;
  api_dir?: string;
}

export interface JobStatusResponse {
  job: Job;
  logs: LogEntry[];
}

export type UIComponentVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | null
  | undefined;

export interface StatusConfig {
  label: string;
  icon: LucideIcon;
  variant?: UIComponentVariant;
  animate?: boolean;
  className?: string;
}

export type StatusConfigMap = Record<JobStatus, StatusConfig>;
