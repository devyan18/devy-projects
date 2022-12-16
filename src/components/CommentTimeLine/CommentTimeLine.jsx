import { CommentItem } from '@components';
import { useSessionProvider } from '../../providers/SessionProvider';
import styles from './styles/CommentTimeLine.module.css';
import groupComments from '../../utilities/groupComments';
import { useEffect, useRef } from 'react';

const CommentTimeLine = ({ comments }) => {
  const scrollToComment = useRef(null);
  const { session } = useSessionProvider();

  const handleScroll = () => {
    scrollToComment.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    handleScroll();
  }, [comments]);

  return (
    <div className={styles.commenttimeline} >
      {groupComments(comments)?.map((comment) => {
        return (
          <CommentItem key={comment._id} comment={comment} user={session} />
        );
      })}
      <span ref={scrollToComment}></span>
    </div>
  );
};

export default CommentTimeLine;
