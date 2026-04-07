import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';
import { toast } from 'sonner';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: any) => {
      // Don't show toast for 401 as it's handled by redirect in client.ts
      if (error.status !== 401) {
        toast.error(error.message || 'An unexpected error occurred');
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error: any) => {
      if (error.status !== 401) {
        toast.error(error.message || 'Action failed');
      }
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: (failureCount, error: any) => {
        // Don't retry on client errors
        if (error.status >= 400 && error.status < 500) return false;
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});
