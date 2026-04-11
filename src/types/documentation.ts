// ==================== Documentation Revisions ====================

export type RevisionStatus = "PENDING" | "APPROVED" | "REJECTED";
export type DiffAction = "add" | "modify" | "delete";

export interface Revision {
  id: string;
  team_id: string;
  submitted_by?: string;
  endpoint_id: string;
  original_content: string;
  proposed_content: string;
  status: RevisionStatus;
  created_at: string;
  updated_at: string;
}

export interface RevisionSummary {
  job_id: string;
  total_revisions: number;
  pending: number;
  approved: number;
  rejected: number;
  revisions: Revision[];
}

export interface ApproveRevisionRequest {
  comment?: string;
}

export interface RejectRevisionRequest {
  reason?: string;
}

export interface ProposeRevisionRequest {
  endpoint_id: string;
  file_path: string;
  action: DiffAction;
  original_content?: string;
  proposed_content: string;
  explanation?: string;
}
