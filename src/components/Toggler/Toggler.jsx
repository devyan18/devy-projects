import styles from './styles/Toggler.module.css';

const Toggler = ({
  activeIcon: ActiveIcon,
  inactiveIcon: InactiveIcon,
  active,
  onClick
}) => {
  return (
    <button className={styles.toggler} onClick={onClick}>
      {active ? <ActiveIcon /> : <InactiveIcon />}
    </button>
  );
};

export default Toggler;
