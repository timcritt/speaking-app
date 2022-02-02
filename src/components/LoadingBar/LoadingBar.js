import React from 'react';
import styles from './LoadingBar.module.css';

export default function LoadingBar({ fetching, children }) {
  return (
    <div className={`${fetching ? styles.outer_container : ''}`}>
      <div className={`${fetching ? styles.inner_container : ''}`}>{children}</div>
    </div>
  );
}
