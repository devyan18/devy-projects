import {
  CommentTimeLine,
  CommentForm,
  Switch,
  Portal,
  SettingsTaskForm
} from '@components';
import { useEffect, useState } from 'react';
import { getAllCommentsByTaskId } from '../../services/comment.service';
import { useTasks } from '../../providers/TasksProvider';
import styles from './styles/TaskContent.module.css';
import { toggleTaskByTaskId } from '../../services/task.service';
import SettingsIcon from '@mui/icons-material/Settings';
import useModal from '../../hooks/useModal';

const pascalCaseParser = (str) => {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
};

const TaskContent = ({ task }) => {
  const { selectedTask, toggleCompletedTask } = useTasks();
  const [comments, setComments] = useState([]);

  const [completed, setCompleted] = useState(false);
  const [loadingCompleted, setLoadingCompleted] = useState(false);

  const { isOpen, toggle } = useModal();

  const getComments = () => {
    getAllCommentsByTaskId(selectedTask._id).then(setComments);
  };

  useEffect(() => {
    if (selectedTask) {
      getComments();
      setCompleted(selectedTask.completed);
    }
  }, [selectedTask]);

  const toggleCompleted = () => {
    setLoadingCompleted(true);

    if (task) {
      toggleTaskByTaskId(task._id)
        .then((response) => {
          setCompleted(response.data.completed);
        })
        .finally(() => {
          setLoadingCompleted(false);
          toggleCompletedTask(task._id);
        });
    }
  };

  const titleFormated = (text) => {
    return `# ${text && pascalCaseParser(text)}`;
  };

  if (!task) {
    return (
      <div className={styles.taskcontent}>
        <div className={styles.taskcontent_title}>
          <p className={styles.task_title}>{titleFormated('Create a Task')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.taskcontent}>
      <div className={styles.taskcontent_title}>
        <Portal content={SettingsTaskForm} show={isOpen} onClose={toggle} />

        <button className={styles.setting_task} onClick={toggle}>
          <SettingsIcon />
        </button>
        <p className={styles.task_title}>
          {titleFormated(task?.task_description)}
        </p>
        <div className={styles.toggle_completed}>
          <Switch
            checked={completed}
            onClick={toggleCompleted}
            disabled={loadingCompleted}
          />
        </div>
      </div>
      <CommentTimeLine comments={comments} />
      <CommentForm task={task} onFinish={getComments} />
    </div>
  );
};

export default TaskContent;
