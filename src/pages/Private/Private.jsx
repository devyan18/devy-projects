import { CurrentProject, LayoutPage, Projects } from '@components';
import TaskProvider from '../../providers/TasksProvider';
import TagProvider from '../../providers/TagsProvider';
import { useProjectProvider } from '../../providers/ProjectsProvider';

const Private = () => {
  const { projects } = useProjectProvider();

  return (
    <TagProvider >
      <TaskProvider initialTasks={projects?.tasks}>
        <LayoutPage>
          <Projects />
          <CurrentProject />
        </LayoutPage>
      </TaskProvider>
    </TagProvider>
  );
};

export default Private;
