import React from 'react';
import classNames from '../../util/classNames';
import styles from './Spinner.module.scss';

const Spinner: React.FC<{ style?: string }> = ({ style }) => {
  const spinnerClassName = classNames(
    styles['lds-spinner'],
    style ? styles[style] : ''
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
