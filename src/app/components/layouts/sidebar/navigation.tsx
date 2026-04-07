import { useState } from "react";
import { Link } from "react-router";
import { cn } from "../../ui/utils";
import {
  Bug,
  FileCode2,
  FileText,
  FolderGit2,
  GitPullRequest,
  LayoutDashboard,
  Settings,
  Sliders,
  Users,
} from "lucide-react";
import { useLocation } from "react-router";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Jobs", href: "/jobs", icon: FolderGit2 },
  { name: "Revisions", href: "/revisions", icon: GitPullRequest },
  { name: "Traces", href: "/traces", icon: Bug },
  { name: "Config", href: "/config", icon: Sliders },
  { name: "Endpoints", href: "/endpoints", icon: FileCode2 },
  { name: "Prompts", href: "/prompts", icon: FileText },

  { name: "Teams", href: "/teams", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto custom-scrollbar">
      {navigation.map((item) => {
        const isActive = location.pathname.startsWith(item.href);
        return (
          <Link
            key={item.name}
            to={item.href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group relative",
              isActive
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 font-bold"
                : "text-muted-foreground hover:bg-primary/5 hover:text-primary",
            )}
          >
            <item.icon
              className={cn(
                "h-5 w-5 transition-transform group-hover:scale-110",
                isActive ? "scale-110" : "opacity-70",
              )}
            />
            <span className="text-sm">{item.name}</span>
            {isActive && (
              <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-primary-foreground/50" />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
