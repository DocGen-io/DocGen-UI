import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NoActiveTeamProps {
  onSetupClick: () => void;
}

const NoActiveTeam = ({ onSetupClick }: NoActiveTeamProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-muted/5">
      <div className="p-6 bg-primary/5 rounded-full mb-6 border border-primary/10">
        <Zap className="h-12 w-12 text-primary animate-pulse" />
      </div>
      <h2 className="text-3xl font-bold tracking-tight">Welcome to DocGen</h2>
      <p className="text-muted-foreground mt-4 max-w-md text-lg">
        Connect your first team to start automating your documentation pipeline
        with ease.
      </p>
      <Button onClick={onSetupClick} className="mt-8" size="lg">
        Setup Your Team
      </Button>
    </div>
  );
};

export default NoActiveTeam;
