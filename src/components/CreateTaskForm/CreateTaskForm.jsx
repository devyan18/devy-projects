import { useProjectProvider } from '../../providers/ProjectsProvider';
import { useState } from 'react';
import styles from './styles/CreateTaskForm.module.css';
import {
  createTaskInProject,
  listTasksByProject
} from '../../services/task.service';
import { useQueryClient } from '@tanstack/react-query';
import { useTasks } from '../../providers/TasksProvider';

const CreateTaskForm = ({ onCancel }) => {
  const [task_description, setTaskDescription] = useState('');
  const [isLoading, setLoading] = useState(false);

  const { selectedProject } = useProjectProvider();

  const { insertTasks } = useTasks();

  const queryClient = useQueryClient();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task_description) return;
    setLoading(true);
    createTaskInProject(selectedProject?._id, task_description)
      .then(() => {
        queryClient.invalidateQueries('tasks');
        listTasksByProject(selectedProject?._id).then((response) => {
          insertTasks(response);
        });
        onCancel();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form className={styles.createtaskform} onSubmit={handleSubmit}>
      <h2>Create new Task</h2>
      <div className={styles.section}>
        <div className={styles.input_group}>
          <label htmlFor="task_description">Write a Task Description</label>
          <input
            autoFocus
            type="text"
            name="task_description"
            id="task_description"
            placeholder='Example "Write my first task"'
            value={task_description}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.footer}>
        <button type="button" className="button danger" onClick={onCancel} disabled={isLoading}>
          Cancel
        </button>
        {isLoading
          ? (
          <button type="button" className="button secondary" disabled>
            Loading...
          </button>
            )
          : (
          <>
            {task_description
              ? (
              <button type="submit" className="button primary">
                Create Project
              </button>
                )
              : (
              <button type="button" className="button secondary" disabled>
                Create Project
              </button>
                )}
          </>
            )}
      </div>
    </form>
  );
};

export default CreateTaskForm;
