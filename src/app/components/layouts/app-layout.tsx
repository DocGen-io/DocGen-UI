import { Outlet } from "react-router";
import { FileCode2, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { CreateTeamDialog } from "../teams/create-team-dialog";
import Sidebar from "./sidebar/sidebar";
import { useTeamStore } from "../../stores/team-store";

export function AppLayout() {
  const [open, setOpen] = useState(false);
  // Set initial active team

  return (
    <div className="flex h-screen bg-background overflow-hidden border-none">
      <Sidebar open={open} setOpen={setOpen} />
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Mobile Top Header */}
        <header className="lg:hidden h-16 flex items-center justify-between px-4 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-primary/10 rounded-lg">
              <FileCode2 className="h-4 w-4 text-primary" />
            </div>
            <span className="font-bold text-sm tracking-tight uppercase">
              DocGen
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(true)}
            className="rounded-xl hover:bg-primary/5 transition-all active:scale-90"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </header>

        {/* Dynamic Route Content */}
        <main className="flex-1 overflow-auto bg-grid-slate-100/10 dark:bg-grid-white/[0.02]">
          <div className="relative min-h-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Team Dialog */}
      <CreateTeamDialog />
    </div>
  );
}
