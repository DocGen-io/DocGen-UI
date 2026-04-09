// components/jobs/job-page-states.tsx
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function JobErrorState() {
  const navigate = useNavigate();
  return (
    <div className="p-8 flex flex-col items-center justify-center h-full text-center">
      <div className="p-4 bg-destructive/10 rounded-full mb-4">
        <AlertTriangle className="h-8 w-8 text-destructive" />
      </div>
      <h2 className="text-xl font-bold">Job Not Found</h2>
      <p className="text-muted-foreground mt-2 max-w-sm">
        The job you are looking for might have been deleted or you don't have
        access to it.
      </p>
      <Button
        onClick={() => navigate("/jobs")}
        className="mt-6"
        variant="outline"
      >
        Back to Jobs
      </Button>
    </div>
  );
}
