import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/sonner';
import { queryClient } from './lib/query-client';
import { router } from './routes';

import { ErrorBoundary } from './components/shared/error-boundary';

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" richColors />
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
