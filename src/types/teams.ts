// ==================== Team Management ====================
import { User } from "@/types";
export interface Team {
  id: string;
  name: string;
  slug: string;
  description?: string;
  is_public: boolean;
  invite_token?: string;
  member_count?: number;
  role?: TeamRole;
}

export type TeamRole = "ADMIN" | "MAINTAINER" | "EDITOR" | "VIEWER";

export interface TeamMember {
  id: string;
  user_id: string;
  team_id: string;
  role: TeamRole;
  user: User;
  joined_at: string;
}

export interface TeamInvitation {
  id: string;
  team_id: string;
  inviter_id: string;
  invitee_id?: string;
  invitee_email?: string;
  status: "pending" | "accepted" | "rejected" | "expired";
  created_at: string;
  expires_at: string;
  team: Team;
  inviter: User;
}

export interface CreateTeamRequest {
  name: string;
  description?: string;
}

export interface InviteUserRequest {
  user_id?: string;
  email?: string;
}

export interface RespondToInvitationRequest {
  accept: boolean;
}

// ==================== Team Configuration ====================

export interface TeamConfig {
  id: string;
  team_id: string;
  config_data: {
    llm_provider: "openai" | "anthropic" | "google" | "azure";
    llm_api_key?: string;
    llm_model: string;
    target_repository_url?: string;
    target_branch?: string;
    documentation_style?: string;
    auto_approve_threshold?: number;
    webhook_url?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface UpdateTeamConfigRequest {
  llm_provider?: "openai" | "anthropic" | "google" | "azure";
  llm_api_key?: string;
  llm_model?: string;
  target_repository_url?: string;
  target_branch?: string;
  documentation_style?: string;
  auto_approve_threshold?: number;
  webhook_url?: string;
}
