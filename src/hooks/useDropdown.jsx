import { useEffect, useState } from 'react';

export default function useDropdown (initial = false) {
  const [list, setList] = useState([]);
  const [isOpen, setOpen] = useState(initial);
  const [selected, setSeleted] = useState(null);

  const changeSeleted = (id) => {
    setSeleted(list.find(item => item._id === id));
    setOpen(false);
  };

  useEffect(() => {
    if (list) {
      setSeleted(list[0]);
    }
  }, [list]);

  const handleToggle = () => setOpen(prev => !prev);

  return { isOpen, handleToggle, selected, changeSeleted, list, setList };
}
