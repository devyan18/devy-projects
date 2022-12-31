import styles from './styles/Guild.module.css';

const Guild = ({ title, active, img, onClick }) => {
  return (
    <div className={styles.guild}>
      <div
          className={`guild ${active && 'active'}`}
          onClick={() => onClick()}
        >
          <span className="pill"></span>
          {img
            ? (
            <img className="img" src={img} loading='lazy' />
              )
            : (
            <span className="img one-letter">{title[0].toUpperCase()}</span>
              )}
        </div>
    </div>
  );
};

export default Guild;
