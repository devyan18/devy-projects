import ReactDOM from 'react-dom';
import { ModalContainer } from '@components';

export default function Portal ({ content, show, onClose }) {
  const handleClickPortal = (e) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    show &&
      ReactDOM.createPortal(
        <ModalContainer
          onClick={handleClickPortal}
          onClose={onClose}
          content={content}
        />,
        document.getElementById('portal')
      )
  );
}
