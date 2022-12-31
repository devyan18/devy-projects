import { useEffect, useState } from 'react';
import styles from './styles/CommentForm.module.css';
import { createNewComment } from '../../services/comment.service';

const CommentForm = ({ task, onFinish }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      createNewComment(task?._id, content)
        .then(() => {
          onFinish();
        })
        .finally(() => {
          setContent('');
        });
    }
  };

  useEffect(() => {
    if (task) {
      setContent('');
    }
  }, [task]);

  return (
    <div className={styles.commentform}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={`Send comment to # ${task?.task_description}`}
          onChange={(e) => setContent(e.target.value)}
          value={content}
          maxLength="200"
        />
        <button type="submit" className={`button primary ${styles.button}`}>
          send
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
