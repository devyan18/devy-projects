import { useEffect } from 'react';

export default function ModalContainer ({ content: Content, onClick, onClose }) {
  const handlePressEscape = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handlePressEscape);

    return () => {
      document.removeEventListener('keydown', handlePressEscape);
    };
  }, []);

  return (
    <div className="portal-styles">
      <Content onCancel={onClose}/>
    </div>
  );
};
