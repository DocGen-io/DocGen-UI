import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { useAvailableProjects } from "@/hooks/use-endpoints";

export function useProjectDiscovery(activeTeamName?: string) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: availableProjectsData } = useAvailableProjects();

  const teamProjectName =
    activeTeamName?.toLowerCase().replace(/\s+/g, "-") || "default-project";

  const urlProject = searchParams.get("project");
  const [projectName, setProjectName] = useState(urlProject || teamProjectName);

  useEffect(() => {
    if (urlProject) {
      setProjectName(urlProject);
    } else if (availableProjectsData?.projects && !urlProject) {
      const exists = availableProjectsData.projects.find(
        (p) => p.toLowerCase() === teamProjectName.toLowerCase(),
      );
      if (exists) {
        setProjectName(exists); // Use the actual casing from the backend
      }
    }
  }, [urlProject, availableProjectsData, teamProjectName]);

  const updateProjectName = (name: string) => {
    setProjectName(name);
  };

  return {
    projectName,
    setProjectName: updateProjectName,
    availableProjects: availableProjectsData?.projects || [],
    setSearchParams,
  };
}
