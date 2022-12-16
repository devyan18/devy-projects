import { useState } from 'react';

export default function useModal () {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((show) => !show);

  return {
    isOpen,
    toggle
  };
}
