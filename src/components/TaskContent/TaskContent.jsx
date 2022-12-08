import { CommentTimeLine } from '@components';
import styles from './styles/TaskContent.module.css';

const TaskContent = ({ task }) => {
  const pascalCaseParser = (str) => {
    return `${str[0].toUpperCase()}${str.slice(1)}`;
  };

  return (
    <div className={styles.taskcontent}>
      <div className={styles.taskcontent_title}>
        <span className={styles.task_title}>
          # {task?.task_description && pascalCaseParser(task?.task_description)}
        </span>
      </div>
      <div className={styles.comments_container}>
        <CommentTimeLine />
      </div>
      <div className={styles.footer}>
      </div>
    </div>
  );
};

export default TaskContent;
