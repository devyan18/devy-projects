import styles from './styles/TaskItem.module.css';

const TaskItem = ({ taskName, active, onClick, completed }) => {
  const taskNameFormed = (name) => {
    return `${name[0].toUpperCase()}${name.slice(1)}`;
  };

  return (
    <div
      className={`${active ? styles.taskitem_seleted : styles.taskitem}`}
      onClick={onClick}
    >
      <span className={styles.span}>{taskNameFormed(taskName)}</span>
      {completed && <span className={styles.completed}>✅</span>}
    </div>
  );
};

export default TaskItem;
