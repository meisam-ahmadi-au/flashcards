import React from 'react';
import classNames from '../../util/classNames';
import styles from './Spinner.module.scss';

const Spinner: React.FC<{ stylex?: string }> = ({ stylex }) => {
  const spinnerClassName = classNames(
    styles['lds-spinner'],
    stylex ? styles[stylex] : ''
  );
  return (
    <div className={spinnerClassName}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default Spinner;
