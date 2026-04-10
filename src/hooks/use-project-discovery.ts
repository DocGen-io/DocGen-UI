import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router";

export function useProjectDiscovery(availableProjects: string[] = []) {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlProject = searchParams.get("project");

  const [projectName, setProjectName] = useState(urlProject || "");

  useEffect(() => {
    if (urlProject) {
      const isValidProject = availableProjects.includes(urlProject);
      if (isValidProject) {
        setProjectName(urlProject);
      } else if (availableProjects.length > 0 && !projectName) {
        setProjectName(availableProjects[0]);
      }
    } else if (availableProjects.length > 0 && !projectName) {
      setProjectName(availableProjects[0]);
    }
  }, [urlProject, availableProjects, projectName]);

  const updateProjectName = useCallback((name: string) => {
    setProjectName(name);
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set("project", name);
      return next;
    });
  }, [setSearchParams]);

  return {
    projectName,
    setProjectName: updateProjectName,
    availableProjects,
    setSearchParams,
  };
}
