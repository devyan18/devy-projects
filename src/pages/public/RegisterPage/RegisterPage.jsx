import { useSetNewSession } from '../../../providers/SessionProvider';
import { Link, useNavigate } from 'react-router-dom';
import useRegister from '../../../hooks/useRegister';
import styles from './styles/RegisterPage.module.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const setNewSession = useSetNewSession();

  const setSession = (data) => {
    if (data.access_token && data.user_data) {
      setNewSession(data.access_token, data.user_data);
      navigate('/private/project');
    }
  };

  const {
    handleChangeForm,
    handleSubmit,
    isError,
    isLoading
  } = useRegister(setSession);

  return (
    <div className={styles.card}>
      <div className={styles.content_form}>
        <h2 className="text headline">Crear una cuenta</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.input_container}>
            <label htmlFor="email" className="text secondary">
               {isError ? <span className='text secondary text danger'>Error con Email, Contraseña o Usuario</span> : 'CORREO ELECTRÓNICO'}
            </label>
            <input
              className="input"
              type="email"
              name="email"
              onChange={handleChangeForm}
            />
          </div>
          <div className={styles.input_container}>
            <label htmlFor="username" className="text secondary">
               {isError ? <span className='text secondary text danger'>Error con Email, Contraseña o Usuario</span> : 'NOMBRE DE USUARIO'}
            </label>
            <input
              className="input"
              type="text"
              name="username"
              onChange={handleChangeForm}
            />
          </div>
          <div className={styles.input_container}>
            <label htmlFor="password" className="text secondary">
               {isError ? <span className='text secondary text danger'>Error con Email, Contraseña o Usuario</span> : 'CONTRASEÑA'}
            </label>
            <input
              className="input"
              type="password"
              name="password"
              onChange={handleChangeForm}
            />
          </div>

          <footer className={styles.footer}>

            {isLoading
              ? (
              <button type="button" className="button secondary">
                Cargando...
              </button>
                )
              : (
              <button type="submit" className="button primary">
                Continuar
              </button>
                )}
            <span className="text muted">
              <Link to={'/auth/login'} className="text muted text link">
                ¿Ya tienes cuenta?
              </Link>
            </span>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
