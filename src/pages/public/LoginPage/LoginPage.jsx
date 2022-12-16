import styles from './styles/LoginPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import useLogin from '../../../hooks/useLogin';
import { useSetNewSession } from '../../../providers/SessionProvider';

const LoginPage = () => {
  const navigate = useNavigate();
  const setNewSession = useSetNewSession();

  const verLog = (data) => {
    if (data.access_token && data.user_data) {
      setNewSession(data.access_token, data.user_data);
      navigate('/private');
    }
  };

  const {
    handleChangeForm,
    handleSubmit,
    isError,
    isLoading
  } = useLogin(verLog);

  return (
    <div className={styles.card}>
      <div className={styles.content_form}>
        <h2 className="text headline">¡Hola de nuevo!</h2>
        <p className="text secondary">
          ¡Nos alegramos mucho de volver a verte!
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.input_container}>
            <label htmlFor="email" className="text secondary">
               {isError ? <span className='text secondary text danger'>Error con Email o Contraseña</span> : 'CORREO ELECTRÓNICO'}
            </label>
            <input
              className="input"
              type="email"
              name="email"
              onChange={handleChangeForm}
            />
          </div>
          <div className={styles.input_container}>
            <label htmlFor="password" className="text secondary">
               {isError ? <span className='text secondary text danger'>Error con Email o Contraseña</span> : 'CONTRASEÑA'}
            </label>
            <input
              className="input"
              type="password"
              name="password"
              onChange={handleChangeForm}
            />
          </div>

          <footer className={styles.footer}>
            <Link className="text link">¿Has olvidado la contraseña?</Link>

            {isLoading
              ? (
              <button type="button" className="button secondary">
                Cargando...
              </button>
                )
              : (
              <button type="submit" className="button primary">
                Iniciar sesión
              </button>
                )}
            <span className="text muted">
              <span>¿Necesitas una cuenta? </span>
              <Link to={'/auth/register'} className="text muted text link">
                Registrate
              </Link>
            </span>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
