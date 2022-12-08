import { useState } from 'react';
import { loginWithCredentials } from '../services/user.service';

export default function useLogin (cb) {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(null);
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleChangeForm = (e) => {
    setError(null);
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    loginWithCredentials(form)
      .then(response => {
        cb(response.data);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    isLoading,
    isError,
    handleSubmit,
    handleChangeForm
  };
}
