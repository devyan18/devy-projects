import styles from './styles/LandingPage.module.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className={styles.landingpage}>
      <Link to={'/private'}>Go home</Link>
    </div>
  );
};

export default LandingPage;
