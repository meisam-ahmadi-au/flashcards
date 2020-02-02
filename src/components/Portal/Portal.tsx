import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Portal.module.scss';

const modalRoot = document.getElementById('portal')!;
const PortalContainer: React.FC = ({ children }) => {
  const el = document.createElement('div');

  React.useEffect(() => {
    modalRoot.appendChild(el);
    return () => {
      modalRoot.removeChild(el);
    };
  }, [el]);

  return ReactDOM.createPortal(children, el);
};

export const Modal: React.FC<{ onClick?: () => void }> = ({
  children,
  onClick
}) => {
  return (
    <PortalContainer>
      <div className={styles.portal} onClick={onClick}>
        {children}
      </div>
    </PortalContainer>
  );
};
