import { FolderGit2, GitPullRequest, DollarSign, Zap } from "lucide-react";

export interface StatItem {
  title: string;
  value: string | number;
  icon: any;
  trend: string;
  trendUp: boolean;
  error?: boolean;
}

export const getDashboardStats = (
  jobs: any[] | undefined,
  jobsLoading: boolean,
  jobsError: boolean,
  revisions: any[] | undefined,
  revisionsLoading: boolean,
  revisionsError: boolean,
): StatItem[] => {
  return [
    {
      title: "Total Jobs",
      value: jobsLoading ? "..." : jobs?.length || 0,
      icon: FolderGit2,
      trend: "+12%",
      trendUp: true,
      error: jobsError,
    },
    {
      title: "Pending Reviews",
      value: revisionsLoading
        ? "..."
        : revisions?.filter((r) => r.status === "pending").length || 0,
      icon: GitPullRequest,
      trend: "-5%",
      trendUp: false,
      error: revisionsError,
    },
    {
      title: "AI Cost (Today)",
      value: "N/A",
      icon: DollarSign,
      trend: "0%",
      trendUp: true,
    },
    {
      title: "Avg Response Time",
      value: "N/A",
      icon: Zap,
      trend: "0%",
      trendUp: false,
    },
  ];
};
