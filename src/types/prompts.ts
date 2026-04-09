// ==================== Prompt Templates ====================

export interface PromptTemplate {
  id: string;
  name: string;
  content: string;
  is_system_default: boolean;
  team_id?: string;
  created_at: string;
  updated_at: string;
}

export interface UpdatePromptTemplateRequest {
  content: string;
}
