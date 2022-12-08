import useProjects from '../hooks/useProjects';
import { createContext, useContext } from 'react';

const ProjectContext = createContext(null);

function ProjectPrivder ({ children }) {
  const {
    selectedProject,
    changeSelectedProject,
    isError,
    isLoading,
    projects
  } = useProjects();

  return (
    <ProjectContext.Provider
      value={{
        selectedProject,
        changeSelectedProject,
        isError,
        isLoading,
        projects
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

const useProjectProvider = () => useContext(ProjectContext);

export { useProjectProvider };
export default ProjectPrivder;
