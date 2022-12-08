import { Guild } from '@components';
import { AddIcon } from '../../icons';
import { useProjectProvider } from '../../providers/ProjectsProvider';
import styles from './styles/Projects.module.css';

const Projects = () => {
  const {
    projects,
    changeSelectedProject,
    selectedProject,
    isLoading
  } = useProjectProvider();

  return (
    <div className={styles.projects}>
      <div className="guild-container">
        <div className="guild separator"></div>
        {isLoading && <p>Cargando...</p>}
        {projects?.map((e) => {
          return (
            <Guild
              key={e._id}
              title={e.project_title}
              active={e._id === selectedProject?._id}
              img={e.logo}
              onClick={() => changeSelectedProject(e._id)}
            />
          );
        })}
        <div className="guild">
          <span className="pill"></span>
          <span className="img action">
            <AddIcon/>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Projects;
