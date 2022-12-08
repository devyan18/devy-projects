import { useQuery } from '@tanstack/react-query';
import { listTasksByProject } from '../services/task.service';

export default function useTasks (projectId) {
  const { data: tasks, ...restOfQuery } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => listTasksByProject(projectId)
  });

  return {
    tasks,
    ...restOfQuery
  };
}
