import styles from './styles/CommentForm.module.css';

const CommentForm = ({ taskId }) => {
  return (
    <div className={styles.commentform}>
      <div>
        <input type="text" />
        <button type="submit" className="button primary">
          send
        </button>
      </div>
    </div>
  );
};

export default CommentForm;
