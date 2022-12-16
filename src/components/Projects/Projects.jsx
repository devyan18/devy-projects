import { Guild, Portal, CreateProjectForm } from '@components';
import useModal from '../../hooks/useModal';
import { AddIcon } from '../../icons';
import { useProjectProvider } from '../../providers/ProjectsProvider';
import styles from './styles/Projects.module.css';

const Projects = () => {
  const { projects, changeSelectedProject, selectedProject, isLoading } =
    useProjectProvider();

  const { isOpen, toggle } = useModal();

  const handleOpenModal = () => {
    toggle();
  };

  return (
    <div className={styles.projects}>
      <Portal
        show={isOpen}
        onClose={toggle}
        content={CreateProjectForm}
      />

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
        <div className="guild" onClick={handleOpenModal}>
          <span className="pill"></span>
          <span className="img action">
            <AddIcon />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Projects;
