import React, { Fragment } from 'react';

import styles from './Part4TestPreviewContent.module.css';

const Part4TestPreviewContent = ({ test }) => {
  return (
    <div className={styles.container}>
      <span>{test.questionOne}</span>
      <span>{test.questionTwo}</span>
      <span>{test.questionThree}</span>
      <span>{test.questionFour}</span>
      <span>{test.questionFive}</span>
      <span>{test.questionSix}</span>
    </div>
  );
};

export default Part4TestPreviewContent;
