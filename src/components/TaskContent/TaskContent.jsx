import { CommentTimeLine, CommentForm } from '@components';
import { useEffect, useState } from 'react';
import { getAllCommentsByTaskId } from '../../services/comment.service';
import { useTasks } from '../../providers/TasksProvider';
import styles from './styles/TaskContent.module.css';

const pascalCaseParser = (str) => {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
};

const TaskContent = ({ task }) => {
  const { selectedTask } = useTasks();
  const [comments, setComments] = useState([]);

  const getComments = () => {
    getAllCommentsByTaskId(selectedTask._id)
      .then(setComments);
  };

  useEffect(() => {
    if (selectedTask) {
      getComments();
    }
  }, [selectedTask]);

  return (
    <div className={styles.taskcontent}>
      <div className={styles.taskcontent_title}>
        <span className={styles.task_title}>
          # {task?.task_description && pascalCaseParser(task?.task_description)}
        </span>
      </div>
      <CommentTimeLine comments={comments} />
      <CommentForm task={task} onFinish={getComments} />
    </div>
  );
};

export default TaskContent;
