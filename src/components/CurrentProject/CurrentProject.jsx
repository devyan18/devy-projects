import { TaskBar, TaskContent } from '@components';
import { useProjectProvider } from '../../providers/ProjectsProvider';
import { useEffect } from 'react';
import { useTasks } from '../../providers/TasksProvider';
import { listTasksByProject } from '../../services/task.service';
import styles from './styles/CurrentProject.module.css';

const CurrentProject = () => {
  const { selectedProject } = useProjectProvider();

  const { tasks, insertTasks, selectedTask, changeSeletedTask } = useTasks();

  useEffect(() => {
    if (selectedProject) {
      listTasksByProject(selectedProject._id)
        .then((response) => {
          insertTasks(response);
        });
    }
  }, [selectedProject]);

  return (
    <div className={styles.currentproject}>
      <div className={styles.content}>
        <TaskBar
          tasks={tasks}
          changeSeletedTask={changeSeletedTask}
          selectedTask={selectedTask}
        />
        <TaskContent task={selectedTask} />
      </div>
    </div>
  );
};

export default CurrentProject;
