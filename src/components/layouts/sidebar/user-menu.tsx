import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup, // 1. Add this import
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, LogOut, Moon, Sun } from "lucide-react";
import { useCurrentUser, useLogout } from "@/hooks/use-auth";
import { useThemeStore } from "@/stores/theme-store";
import { useNavigate } from "react-router";

const UserMenu = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useThemeStore();
  const logout = useLogout();
  const { data: user } = useCurrentUser();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="p-4 border-t border-border bg-card/50">
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 px-2 h-12 rounded-xl hover:bg-primary/5"
          >
            <div className="flex-1 text-left overflow-hidden">
              <p className="text-xs font-bold truncate leading-tight">
                {user?.full_name || user?.username}
              </p>
              <p className="text-[10px] text-muted-foreground truncate">
                {user?.email}
              </p>
            </div>
            <ChevronDown className="h-3 w-3 opacity-30" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 rounded-xl shadow-2xl" align="end">
          {/* 3. Wrap your label and standard account items in a Group */}
          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-muted-foreground">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-lg"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="h-4 w-4 mr-2" />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 mr-2" />
                  Dark Mode
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handleLogout}
            className="rounded-lg text-destructive focus:text-destructive focus:bg-destructive/10 font-bold"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
