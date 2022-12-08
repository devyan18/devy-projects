import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { changeProjectLogo } from '../services/project.service';

export default function useChangeProjectLogo () {
  const queryClient = useQueryClient();

  const [progress, setProgress] = useState(0);

  const changeProgress = (e) => {
    setProgress((e.loaded * 100) / e.total);
  };

  const onSubmit = async (projectId, file) => {
    return await changeProjectLogo(projectId, file, changeProgress).then((res) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setProgress(0);
      return res;
    });
  };

  return { progress, onSubmit };
}
