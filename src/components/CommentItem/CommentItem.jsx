import { dateParser } from '../../utilities/dateParser';
import styles from './styles/CommentItem.module.css';

const CommentItem = ({ comment, user }) => {
  return (
    <div className={styles.commentitem}>
      <picture className={styles.comment_avatar}>
        <img src={user?.avatar} alt="user avatar" className={styles.comment_avatar_img} loading='lazy' />
      </picture>
      <section className={styles.comment_container}>
        <header>
          <span className={styles.comment_user}>{user?.username} </span>
          <span className={styles.comment_created}>{dateParser(comment.createdAt)}</span>
        </header>
        <aside className={styles.comment_contents}>
          {
            comment.contents?.map((content, idx) => {
              return (
                <span key={idx} className={styles.comment_content}>{content}</span>
              );
            })
          }
        </aside>
      </section>
    </div>
  );
};

export default CommentItem;
