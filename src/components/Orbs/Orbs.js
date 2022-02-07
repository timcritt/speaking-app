import React from 'react';
import styles from './Orbs.module.css';

const Orbs = () => {
  return (
    <div>
      <div className={styles.orbs_container}>
        <div className={styles.orb}>
          <div
            className={`${styles.orb_inner} ${styles.large} ${styles.gradient_1} ${styles.sway_horizontally}`}
          ></div>
        </div>
        <div className={styles.orb}>
          <div className={`${styles.orb_inner} ${styles.large} ${styles.gradient_2}`}></div>
        </div>
        <div className={styles.orb}>
          <div
            className={`${styles.orb_inner} ${styles.medium} ${styles.gradient_3} ${styles.bob_vertically}`}
          ></div>
        </div>
        <div className={styles.orb}>
          <div className={`${styles.orb_inner} ${styles.medium} ${styles.gradient_4}`}></div>
        </div>
        <div className={styles.orb}>
          <div
            className={`${styles.orb_inner} ${styles.large} ${styles.gradient_5} ${styles.sway_horizontally}`}
          ></div>
        </div>
        <div className={styles.orb}>
          <div className={`${styles.orb_inner} ${styles.medium} ${styles.gradient_6}`}></div>
        </div>
        <div className={styles.orb}>
          <div className={`${styles.orb_inner} ${styles.medium} ${styles.gradient_7}`}></div>
        </div>
      </div>
    </div>
  );
};

export default Orbs;
