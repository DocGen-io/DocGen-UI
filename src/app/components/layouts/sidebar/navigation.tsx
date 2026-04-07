import { useState } from "react";
import { Link } from "react-router";
import { cn } from "../../ui/utils";
import { useLocation } from "react-router";
import { NAVIGATION_ITEMS } from "../../../definitions/navigation";

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto custom-scrollbar">
      {NAVIGATION_ITEMS.map((item) => {
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
