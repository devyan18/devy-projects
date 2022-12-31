import { Switch } from '@components';
import { useEffect, useState } from 'react';
import {
  editTaskByTaskId,
  removeTaskByTaskId
} from '../../services/task.service';
import { useTasks } from '../../providers/TasksProvider';
import { deleteAllCommentsFromTask } from '../../services/comment.service';

import styles from './styles/SettingsTaskForm.module.css';

import { ask } from '@tauri-apps/api/dialog';

const pascalCaseParser = (str) => {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
};

const SettingsTaskForm = ({ onCancel }) => {
  const { tasks, selectedTask, updateTask, deleteTask } = useTasks();

  const [taskDescription, setTaskDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  const [isLoading, setLoading] = useState(false);

  const handleCancel = () => {
    onCancel();
  };

  const titleFormated = () => {
    return `# ${
      selectedTask?.task_description &&
      pascalCaseParser(selectedTask?.task_description)
    }`;
  };

  const toggleCompleted = () => {
    setCompleted((prev) => !prev);
  };

  useEffect(() => {
    if (selectedTask) {
      setTaskDescription(selectedTask.task_description);
      setCompleted(selectedTask.completed);
    }
  }, [selectedTask, tasks]);

  const renderButton = () => {
    if (isLoading) {
      return (
        <button type="button" className="button secondary" disabled>
          Loading...
        </button>
      );
    }

    return (
      <button type="submit" className="button primary">
        Save
      </button>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    editTaskByTaskId(selectedTask._id, taskDescription, completed).then(() => {
      setLoading(false);
      updateTask(selectedTask._id, taskDescription, completed);
      onCancel();
    });
  };

  const handleClickDetete = async () => {
    const askText = `Are you sure you want to delete the task: ${selectedTask.task_description}?`;

    const confirmDeleteTask = await ask(askText, {
      title: 'Delete a Task',
      type: 'error'
    });

    if (confirmDeleteTask) {
      setLoading(true);

      Promise.allSettled([
        deleteAllCommentsFromTask(selectedTask._id),
        removeTaskByTaskId(selectedTask._id)
      ]).then(() => {
        setLoading(false);
        deleteTask(selectedTask._id);
        onCancel();
      });
    }
  };

  return (
    <form className={styles.createtaskform} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <h2>
          Settings Task: <i>{titleFormated()}</i>
        </h2>
      </div>
      <div className={styles.section}>
        <div className={styles.input_group}>
          <label htmlFor="task_description">Task Description</label>
          <input
            autoFocus
            type="text"
            name="task_description"
            id="task_description"
            placeholder='Example "Write my first task"'
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.section_switch}>
        <label htmlFor="completed">Set a completed task</label>
        <Switch checked={completed} id="completed" onClick={toggleCompleted} />
      </div>

      <div className={styles.section_delete}>
        <div className="note danger">
          <p>
            <strong>Warning!</strong> If you delete this task, you will not be
            able to recover it.
          </p>
        </div>
      </div>
      <div className={styles.section_switch}>
        <label htmlFor="completed">Delete this task</label>
        <button
          type="button"
          className="button danger"
          onClick={handleClickDetete}
          disabled={isLoading}
        >
          Delete
        </button>
      </div>

      <div className={styles.footer}>
        <button
          type="button"
          className="button danger"
          onClick={handleCancel}
          disabled={isLoading}
        >
          Cancel
        </button>

        {renderButton()}
      </div>
    </form>
  );
};

export default SettingsTaskForm;
