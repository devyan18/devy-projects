import { useProjectProvider } from '../../providers/ProjectsProvider';
import styles from './styles/TaskBar.module.css';
import { TaskItem } from '@components';
import { useSessionProvider } from '../../providers/SessionProvider';

const TaskBar = ({ tasks, changeSeletedTask, selectedTask }) => {
  const { selectedProject } = useProjectProvider();
  const { session } = useSessionProvider();

  console.log(session);

  return (
    <div className={styles.taskbar}>
      <div className={styles.project_title}>
        <h2>{selectedProject?.project_title}</h2>
      </div>

      <div className={styles.task_list_container}>
        <div className={styles.task_list}>

          {tasks?.map((task) => {
            return (
              <TaskItem
                key={task._id}
                active={selectedTask?._id === task._id}
                onClick={() => changeSeletedTask(task._id)}
                taskName={task.task_description}
                completed={task.completed}
              />
            );
          })}
        </div>
      </div>

      <div className={styles.footer_bar}>
        <picture className={styles.avatar}>
          <img src={`${session?.avatar}`} alt="user image" />
          <span className="indicator online"></span>
        </picture>
      </div>
    </div>
  );
};

export default TaskBar;
