import React from 'react';
import { useSelector } from 'react-redux';
import { IReduxStates } from '../../store/reducers/states';
import { Modal } from '../Portal/Portal';
import './ErrorToast.scss';

const ErrorToast = () => {
  const { hasError } = useSelector((s: IReduxStates) => s.general);
  if (!hasError) {
    return null;
  }

  return (
    <Modal>
      <div className="error">
        <h3>Oops! Something went wrong!</h3>
        <h5>Please Refresh</h5>
      </div>
    </Modal>
  );
};

export default ErrorToast;
