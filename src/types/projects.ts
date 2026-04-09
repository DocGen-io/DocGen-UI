// ==================== Project Configuration ====================

export interface RAGConfig {
  embedding_model: string;
  top_k_retriever: number;
  top_k_reranker: number;
  chunk_size: number;
}

export interface GeneratorConfig {
  url?: string;
  api_key?: string;
  model: string;
  project_id?: string;
  location?: string;
}

export interface CodeAnalyzerConfig {
  active_generator: string;
  analyzer_output_path: string;
  dependency_search_top_k: number;
}

export interface DocCreatorConfig {
  active_generator: string;
  output_dir: string;
}

export interface DocMergerConfig {
  api_title: string;
  api_version: string;
  api_description: string;
  base_url: string;
}

export interface ASTExtractorConfig {
  save_ast: boolean;
  save_ast_path: string;
  verbose: boolean;
}

export interface QueriesConfig {
  general: string;
  controllers: string;
}

export interface ProjectConfig {
  id: string;
  team_id: string;
  rag: RAGConfig;
  WEAVIATE_URL: string;
  WEAVIATE_API_KEY?: string;
  tracing: boolean;
  phoenix_data_dir: string;
  code_analyzer: CodeAnalyzerConfig;
  generators: {
    ollama: GeneratorConfig;
    gemini: GeneratorConfig;
  };
  doc_creator: DocCreatorConfig;
  doc_merger: DocMergerConfig;
  app: {
    environment: string;
  };
  ast_extractor: ASTExtractorConfig;
  queries: QueriesConfig;
  api_frameworks: string[];
  languages: string[];
  created_at: string;
  updated_at: string;
}

export interface UpdateProjectConfigRequest {
  rag?: Partial<RAGConfig>;
  WEAVIATE_URL?: string;
  WEAVIATE_API_KEY?: string;
  tracing?: boolean;
  phoenix_data_dir?: string;
  code_analyzer?: Partial<CodeAnalyzerConfig>;
  generators?: {
    ollama?: Partial<GeneratorConfig>;
    gemini?: Partial<GeneratorConfig>;
  };
  doc_creator?: Partial<DocCreatorConfig>;
  doc_merger?: Partial<DocMergerConfig>;
  app?: {
    environment?: string;
  };
  ast_extractor?: Partial<ASTExtractorConfig>;
  queries?: Partial<QueriesConfig>;
  api_frameworks?: string[];
  languages?: string[];
}
