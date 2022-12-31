import ReactDOM from 'react-dom';
import { ModalContainer } from '@components';

export default function Portal ({ content, show, onClose }) {
  return (
    show &&
      ReactDOM.createPortal(
        <ModalContainer
          onClose={onClose}
          content={content}
        />,
        document.getElementById('portal')
      )
  );
}
