import { createBrowserRouter, Navigate } from "react-router";
import ProtectedLayout from "@/components/layouts/protected-layout";
import PublicLayout from "@/components/layouts/public-layout";

export const router = createBrowserRouter([
  {
    // Public Routes (Login, Register)
    element: <PublicLayout />,
    children: [
      {
        path: "/login",
        lazy: async () => {
          const { LoginPage } = await import("@/pages/auth/login-page");
          return { Component: LoginPage };
        },
      },
      {
        path: "/register",
        lazy: async () => {
          const { RegisterPage } = await import("@/pages/auth/register-page");
          return { Component: RegisterPage };
        },
      },
    ],
  },
  {
    // Protected Routes (App)
    path: "/",
    element: <ProtectedLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        lazy: async () => {
          const { DashboardPage } =
            await import("@/pages/dashboard/dashboard-page");
          return { Component: DashboardPage };
        },
      },
      {
        path: "jobs",
        lazy: async () => {
          const { JobsPage } = await import("@/pages/jobs/jobs-page");
          return { Component: JobsPage };
        },
      },
      {
        path: "jobs/:jobId",
        lazy: async () => {
          const { JobDetailsPage } =
            await import("@/pages/jobs/job-details-page");
          return { Component: JobDetailsPage };
        },
      },
      {
        path: "revisions",
        lazy: async () => {
          const { RevisionsPage } =
            await import("@/pages/revisions/revisions-page");
          return { Component: RevisionsPage };
        },
      },
      {
        path: "teams",
        lazy: async () => {
          const { TeamsPage } = await import("@/pages/teams/teams-page");
          return { Component: TeamsPage };
        },
      },
      {
        path: "teams/discover",
        lazy: async () => {
          const { TeamDiscoveryPage } =
            await import("@/pages/teams/team-discovery-page");
          return { Component: TeamDiscoveryPage };
        },
      },
      {
        path: "join/:token",
        lazy: async () => {
          const { JoinTeamPage } = await import("@/pages/teams/join-team-page");
          return { Component: JoinTeamPage };
        },
      },

      {
        path: "traces",
        lazy: async () => {
          const { TracesPage } = await import("@/pages/traces/traces-page");
          return { Component: TracesPage };
        },
      },
      {
        path: "traces/:traceId",
        lazy: async () => {
          const { TraceDetailsPage } =
            await import("@/pages/traces/trace-details-page");
          return { Component: TraceDetailsPage };
        },
      },
      {
        path: "config",
        lazy: async () => {
          const { ConfigPage } = await import("@/pages/config/config-page");
          return { Component: ConfigPage };
        },
      },
      {
        path: "prompts",
        lazy: async () => {
          const { PromptsPage } = await import("@/pages/prompts/prompts-page");
          return { Component: PromptsPage };
        },
      },
      {
        path: "endpoints",
        lazy: async () => {
          const { EndpointsPage } =
            await import("@/pages/endpoints/endpoints-page");
          return { Component: EndpointsPage };
        },
      },
    ],
  },
]);
