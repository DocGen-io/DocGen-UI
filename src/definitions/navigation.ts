import {
  Bug,
  FileCode2,
  FileText,
  FolderGit2,
  GitPullRequest,
  LayoutDashboard,
  Sliders,
  Users,
} from "lucide-react";

export const NAVIGATION_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Jobs", href: "/jobs", icon: FolderGit2 },
  { name: "Revisions", href: "/revisions", icon: GitPullRequest },
  { name: "Traces", href: "/traces", icon: Bug },
  { name: "Config", href: "/config", icon: Sliders },
  { name: "Endpoints", href: "/endpoints", icon: FileCode2 },
  { name: "Prompts", href: "/prompts", icon: FileText },
  { name: "Teams", href: "/teams", icon: Users },
] as const;
