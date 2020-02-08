import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './Portal.module.scss';

const modalRoot = document.getElementById('portal')!;
const PortalContainer: React.FC = ({ children }) => {
  const elRef = useRef<HTMLDivElement>();
  if (!elRef.current) {
    const div = document.createElement('div');
    elRef.current = div;
  }

  React.useEffect(() => {
    modalRoot.appendChild(elRef.current!);
    return () => {
      modalRoot.removeChild(elRef.current!);
    };
  }, []);

  return ReactDOM.createPortal(children, elRef.current);
};

export const Modal: React.FC<{ onClick?: () => void; zIndex?: number }> = ({
  children,
  onClick,
  zIndex
}) => {
  return (
    <PortalContainer>
      <div style={{ zIndex }} className={styles.portal} onClick={onClick}>
        {children}
      </div>
    </PortalContainer>
  );
};
