import React from 'react';
import TestPreviewOverlay from 'components/TestPreviewOverlay/TestPreviewOverlay';
import styles from './TestPreview.module.css';

//Thumnail template for preview of each test type

const TestPreview = ({ questionOne, children, testId, testType, testLabel }) => {
  return (
    <div className={styles.outer_container} key={testId}>
      <div className={`${styles.inner_container} fade-in`}>
        <div className={styles.grow_hover_container} onClick={(e) => e.stopPropagation()}>
          <div className={`${styles.img_wrap} ${styles.grow_on_hover} `}>
            {/*content of each type of test preview is placed here via composition */}
            {React.cloneElement(children, { testId: testId, testType: testType })}
          </div>
          <TestPreviewOverlay testId={testId} testType={testType} />
        </div>
      </div>
      <div className='test-preview-part-label'>{testLabel}</div>
      <div className={`${styles.question_container} dont-break-out`}>
        <span className={styles.question_text}>{questionOne}</span>
      </div>
    </div>
  );
};

export default TestPreview;
