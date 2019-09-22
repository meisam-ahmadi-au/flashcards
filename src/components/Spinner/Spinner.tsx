import React from 'react';
import styles from './Spinner.module.scss';

const Spinner = () => {
  return (
    <div className={styles.loader}>
      <div className={`${styles.inner} ${styles.one}`} />
      <div className={`${styles.inner} ${styles.two}`} />
      <div className={`${styles.inner} ${styles.three}`} />
    </div>
  );
};

export default Spinner;
