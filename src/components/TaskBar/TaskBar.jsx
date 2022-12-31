import { useProjectProvider } from '../../providers/ProjectsProvider';
import styles from './styles/TaskBar.module.css';
import { TaskItem, Portal, CreateTaskForm } from '@components';
import { useSessionProvider } from '../../providers/SessionProvider';
import useModal from '../../hooks/useModal';
import { genFakeId } from '../../utilities/genFakeId';
import AddIcon from '@mui/icons-material/Add';

const TaskBar = ({ tasks, changeSeletedTask, selectedTask }) => {
  const { selectedProject } = useProjectProvider();
  const { session } = useSessionProvider();

  const { isOpen, toggle } = useModal();

  return (
    <div className={styles.taskbar}>
      <Portal
        show={isOpen}
        onClose={toggle}
        content={CreateTaskForm}
      />
      <div className={styles.project_title}>
        <h2>{selectedProject?.project_title?.toUpperCase()}</h2>

        <button onClick={toggle} className={styles.create_task}>
          <AddIcon />
        </button>
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

        <div className={styles.user_data}>
          <p>{`${session?.username}`}#{genFakeId(4)}</p>
          <span className={styles.online_text}>Online</span>
        </div>

      </div>
    </div>
  );
};

export default TaskBar;
