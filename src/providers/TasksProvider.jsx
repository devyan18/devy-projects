import { createContext, useState, useContext, useEffect } from 'react';

const TaskContext = createContext(null);

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const changeSeletedTask = (id) => {
    setSelectedTask(tasks.find(task => task._id === id));
  };

  const insertTasks = (tasks) => {
    if (tasks) {
      setTasks(tasks);
      setSelectedTask(tasks[0]);
    }
  };

  useEffect(() => {
    console.log(tasks);
    console.log(selectedTask);
  }, [tasks, selectedTask]);

  return (
    <TaskContext.Provider value={{ tasks, insertTasks, selectedTask, changeSeletedTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
export default TaskProvider;
