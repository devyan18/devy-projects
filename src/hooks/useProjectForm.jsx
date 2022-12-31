import { useState, useCallback, useEffect } from 'react';
import { createTaskInProject } from '../services/task.service';
import { changeProjectLogo, createNewProject } from '../services/project.service';

export default function useProjectForm () {
  const [data, setData] = useState({
    project_title: '',
    repository_url: '',
    logo: null
  });
  const [preview, setPreview] = useState(null);

  const [letters, setLetters] = useState('N');

  const [isLoading, setIsLoading] = useState(false);

  const handleChangeData = (e) => {
    if (e.target.name === 'logo') {
      handleCreateBase64(e);
      setData({
        ...data,
        [e.target.name]: e.target.files[0]
      });
      return;
    }

    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleCreateBase64 = useCallback(async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPreview(base64);
    e.target.value = '';
  });

  const getFirstLetterOnUpperCase = (string) => {
    const strSplit = string.trim().split(' ');
    let ans = '';

    if (strSplit.length > 1) {
      for (let i = 0; i < strSplit.length; i++) {
        if (strSplit[i][0]) {
          ans += strSplit[i][0].toUpperCase();
        }
      }

      if (ans.length > 3) {
        ans = ans.slice(0, 3);
      }

      return ans;
    }
    return string ? string[0].toUpperCase() : 'N';
  };

  const generalTaskCreator = async (project) => {
    const projectId = project._id;
    const task_description = 'General';

    await createTaskInProject(projectId, task_description);
  };

  const handleSubmit = (e, cb) => {
    e.preventDefault();
    setIsLoading(true);
    createNewProject(data)
      .then(res => {
        generalTaskCreator(res.data)
          .then(() => {
            if (!data.logo) {
              setIsLoading(false);
              cb(res);
            }
            changeProjectLogo(res.data._id, data.logo)
              .then(res => {
                setIsLoading(false);
                cb(res);
              });
          });
      });
  };

  useEffect(() => {
    if (data.project_title) {
      setLetters(getFirstLetterOnUpperCase(data.project_title));
    } else {
      setLetters('N');
    }
  }, [data.project_title]);

  return {
    isLoading,
    data,
    preview,
    handleChangeData,
    letters,
    handleSubmit
  };
}
