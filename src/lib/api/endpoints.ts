import { api } from '@/lib/api/client';

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
  listEndpoints: async (projectName: string) => {
    const res = await api.get<any>(`/endpoints/${projectName}`);
    return res;
  },
  
  listProjects: async () => {
    const res = await api.get<{ projects: string[] }>('/endpoints/');
    return res;
  },

  queryEndpoints: async (projectName: string, query: string) => {
    const res = await api.get<any>(`/endpoints/${projectName}/query?q=${encodeURIComponent(query)}`);
    return res;
  },

  getClusters: async (projectName: string, nClusters?: number) => {
    const res = await api.get<any>(`/endpoints/${projectName}/clusters${nClusters ? `?n_clusters=${nClusters}` : ''}`);
    return res;
  },

  generateExamples: async (projectName: string, swaggerData: any) => {
    const res = await api.post<any>(`/endpoints/${projectName}/examples`, swaggerData);
    return res;
  }
};
