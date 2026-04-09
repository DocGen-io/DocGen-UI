import UserMenu from "@/components/layouts/sidebar/user-menu";
import { FileCode2 } from "lucide-react";
import TeamSwitcher from "@/components/layouts/sidebar/team-switcher";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Dispatch, FC, SetStateAction } from "react";
import Navigation from "@/components/layouts/sidebar/navigation";

interface ISidebarProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const SidebarContent = () => {
  return (
    <div className="flex flex-col h-full bg-card">
      <div className="h-16 flex items-center gap-3 px-6 border-b border-border">
        <div className="p-2 bg-primary/10 rounded-lg">
          <FileCode2 className="h-5 w-5 text-primary" />
        </div>
        <span className="font-semibold tracking-tight uppercase text-xs">
          DocGen AI
        </span>
      </div>

      <TeamSwitcher />

      {/* Navigation */}
      <Navigation />

      {/* User Menu */}
      <UserMenu />
    </div>
  );
};

const Sidebar: FC<ISidebarProps> = ({ open, setOpen }) => {
  return (
    <>
      <aside className="hidden lg:flex w-64 border-r border-border bg-card flex-col shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar (Sheet) */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="p-0 w-80 border-r-0">
          <SheetHeader className="hidden">
            <SheetTitle>Navigation Menu</SheetTitle>
          </SheetHeader>
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Sidebar;
