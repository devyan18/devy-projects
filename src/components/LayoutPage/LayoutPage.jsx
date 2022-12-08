import styles from './styles/LayoutPage.module.css';

const LayoutPage = ({ children }) => {
  return (
    <main className={styles.layoutpage}>
      {children}
    </main>
  );
};

export default LayoutPage;
