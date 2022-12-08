import { CommentItem } from '@components';
import { useSessionProvider } from '../../providers/SessionProvider';
import styles from './styles/CommentTimeLine.module.css';
import { getAllCommentsByTaskId } from '../../services/comment.service';
import { useEffect, useState } from 'react';
import { useTasks } from '../../providers/TasksProvider';
import groupComments from '../../utilities/groupComments';

const CommentTimeLine = () => {
  const { selectedTask } = useTasks();
  const { session } = useSessionProvider();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (selectedTask) {
      getAllCommentsByTaskId(selectedTask._id)
        .then(setComments);
    }
  }, [selectedTask]);

  return (
    <div className={styles.commenttimeline}>
      {groupComments(comments)?.map((comment) => {
        return (
          <CommentItem key={comment._id} comment={comment} user={session} />
        );
      })}
    </div>
  );
};

export default CommentTimeLine;
