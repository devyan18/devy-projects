import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getAllProjects } from '../services/project.service';

export default function useProjects () {
  const [selectedProject, setSelectedProject] = useState(null);

  const { data: projects, ...restOfQuery } = useQuery({
    queryKey: ['projects'],
    queryFn: getAllProjects
  });

  const changeSelectedProject = (projectId) => {
    const findProject = projects.find((e) => e._id === projectId);

    if (findProject) {
      setSelectedProject(findProject);
    } else {
      setSelectedProject(null);
    }
  };

  useEffect(() => {
    if (projects) {
      changeSelectedProject(projects[0]._id);
    }
  }, [projects]);

  return {
    projects,
    selectedProject,
    changeSelectedProject,
    ...restOfQuery
  };
}
