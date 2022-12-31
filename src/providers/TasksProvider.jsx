import { createContext, useState, useContext, useEffect } from 'react';

const TaskContext = createContext(null);

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const changeSeletedTask = (id) => {
    setSelectedTask(tasks.find((task) => task._id === id));
  };

  const insertTasks = (tasks) => {
    if (tasks) {
      setTasks(tasks);
      setSelectedTask(tasks[0]);
    }
  };

  const toggleCompletedTask = (id) => {
    const newTasks = tasks.map((task) => {
      if (task._id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const updateTask = (id, task_description, completed) => {
    const newTasks = tasks.map((task) => {
      if (task._id === id) {
        return { ...task, task_description, completed };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task._id !== id);
    setTasks(newTasks);

    setSelectedTask(newTasks[0]);
  };

  useEffect(() => {
    if (tasks?.length) {
      setSelectedTask(tasks[0]);
    }
  }, []);

  useEffect(() => {
    if (selectedTask) {
      const task = tasks.find((task) => task._id === selectedTask._id);
      setSelectedTask(task);
    }
  }, [tasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        insertTasks,
        selectedTask,
        changeSeletedTask,
        updateTask,
        deleteTask,
        toggleCompletedTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
export default TaskProvider;
