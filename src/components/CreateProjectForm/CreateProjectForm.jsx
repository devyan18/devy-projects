import styles from './styles/CreateProjectForm.module.css';
import { useRef } from 'react';
import useProjectForm from '../../hooks/useProjectForm';
import { useQueryClient } from '@tanstack/react-query';

const CreateProjectForm = ({ onCancel }) => {
  const btnRef = useRef(null);
  const handleClick = () => {
    btnRef.current.click();
  };

  const queryClient = useQueryClient();

  const { isLoading, data, handleChangeData, letters, preview, handleSubmit } =
    useProjectForm();

  const myCb = (res) => {
    queryClient.invalidateQueries('projects');
    onCancel();
  };

  const myHandleSubmit = (e) => {
    if (data.project_title && data.repository_url) {
      handleSubmit(e, myCb);
    }
  };

  return (
    <form className={styles.createprojectform} onSubmit={myHandleSubmit}>
      <h2>Create new Project</h2>
      <div className={styles.section}>
        <div className={styles.logo_selector}>
          {data.logo || preview
            ? (
            <img src={preview} alt="logo preview" />
              )
            : (
            <div className={styles.letter_logo} onClick={handleClick}>
              <span className="img one-letter">{letters}</span>
            </div>
              )}

          <div className={styles.logo_manager}>
            <span className={styles.description}>
              Se recomienda una imagen cuadrada de 128px x 128px.
            </span>
            <button
              type="button"
              className={styles.logo_button}
              onClick={handleClick}
            >
              Upload Image
            </button>
          </div>
          {/* only accept images */}
          <input
            type="file"
            name="logo"
            id="logo"
            ref={btnRef}
            onChange={handleChangeData}
            accept="image/*"
          />
        </div>
        <div className={styles.input_group}>
          <label htmlFor="project_title">PROJECT TITLE</label>
          <input
            type="text"
            name="project_title"
            id="project_title"
            placeholder='Example "My Project"'
            value={data.project_title}
            onChange={handleChangeData}
            autoFocus
          />
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.input_group}>
          <label htmlFor="repository_url">REPOSITORY URL</label>
          <input
            type="text"
            name="repository_url"
            placeholder="www.github.com/user/example"
            id="repository_url"
            value={data.repository_url}
            onChange={handleChangeData}
          />
          <span className={styles.description}>
            Description de para que pingo sirve el repository url y si realmente
            queres usarlo o non uwu
          </span>
        </div>
      </div>
      <div className={styles.footer}>
        <button type="button" className="button danger" onClick={onCancel} disabled={isLoading}>
          Cancel
        </button>
        {isLoading
          ? (
          <button type="button" className="button secondary" disabled>
            Loading...
          </button>
            )
          : (
          <>
            {data.project_title && data.repository_url
              ? (
              <button type="submit" className="button primary">
                Create Project
              </button>
                )
              : (
              <button type="button" className="button secondary" disabled>
                Create Project
              </button>
                )}
          </>
            )}
      </div>
    </form>
  );
};

export default CreateProjectForm;
