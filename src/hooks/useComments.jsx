import { useQuery } from '@tanstack/react-query';
import { getAllCommentsByTaskId } from '../services/comment.service';

export default function useComments (taskId) {
  const { data: comments, ...restOfQuery } = useQuery({
    queryKey: ['comments'],
    queryFn: () => getAllCommentsByTaskId(taskId)
  }); ;

  return { comments, ...restOfQuery };
}
