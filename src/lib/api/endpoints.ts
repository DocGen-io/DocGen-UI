import { api } from "@/lib/api/client";

export interface Endpoint {
  path: string;
  method: string;
  summary: string;
  content: string;
}

export interface Cluster {
  [key: number]: Endpoint[];
}

export const endpointsApi = {
  listEndpoints: async (projectName: string, teamId: string) => {
    const res = await api.get<any>(
      `/endpoints/${projectName}?team_id=${encodeURIComponent(teamId)}`,
    );
    return res;
  },

  listProjects: async (teamId?: string) => {
    const url = teamId ? `/endpoints/?team_id=${teamId}` : "/endpoints/";
    const res = await api.get<{ projects: string[] }>(url);
    return res;
  },

  queryEndpoints: async (
    projectName: string,
    query: string,
    team_id: string,
  ) => {
    const res = await api.get<any>(
      `/endpoints/${projectName}/query?q=${encodeURIComponent(query)}&team_id=${encodeURIComponent(team_id)}`,
    );
    return res;
  },

  getClusters: async (
    projectName: string,
    team_id: string,
    nClusters?: number,
  ) => {
    const res = await api.get<any>(
      `/endpoints/${projectName}/clusters?team_id=${encodeURIComponent(team_id)}${nClusters ? `&n_clusters=${nClusters}` : ""}`,
    );
    return res;
  },

  generateExamples: async (
    projectName: string, 
    teamId: string, 
    path: string, 
    method: string
  ) => {
    const res = await api.post<any>(
      `/endpoints/${projectName}/examples?team_id=${encodeURIComponent(teamId)}`,
      { path, method },
    );
    return res;
  },
  
  getGrouping: async (projectName: string, teamId: string) => {
    const res = await api.get<{ clusters: Record<string, string[]> | null }>(
      `/endpoints/${projectName}/grouping?team_id=${encodeURIComponent(teamId)}`,
    );
    return res;
  },
};
