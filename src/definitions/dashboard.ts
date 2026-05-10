import { FolderGit2, GitPullRequest, DollarSign, Zap } from "lucide-react";

export interface StatItem {
  title: string;
  value: string | number;
  icon: any;
  trend: string;
  trendUp: boolean;
  error?: boolean;
}

export const DASHBOARD_STAT_ITEMS = [
  {
    id: "total_jobs",
    title: "Total Jobs",
    icon: FolderGit2,
  },
  {
    id: "pending_reviews",
    title: "Pending Reviews",
    icon: GitPullRequest,
  },
  {
    id: "total_projects",
    title: "Total Projects",
    icon: Zap,
  },
  {
    id: "total_members",
    title: "Total Members",
    icon: DollarSign,
  },
];
