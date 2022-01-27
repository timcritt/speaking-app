import React, { Fragment } from 'react';
import { TagCloud } from 'react-tagcloud';
import TestPreviewOverlay from 'components/TestPreviewOverlay/TestPreviewOverlay';

//css modules
import styles from './Part3TestPreviewContent.module.css';

const Part3TestPreviewContent = React.memo(({ test, testId, testType }) => {
  const testOptions = [
    { value: test.topLeft, count: 10, key: 1 },
    { value: test.topRight, count: 12, key: 2 },
    { value: test.bottomLeft, count: 18, key: 3 },
    { value: test.bottomRight, count: 35, key: 4 },
    { value: test.bottomCentre, count: 26, key: 5 },
  ];

  const colorOptions = {
    luminosity: 'dark',
    hue: 'blue',
  };

  return (
    <Fragment>
      <div className={styles.options_container}>
        <TagCloud
          minSize={15}
          maxSize={30}
          colorOptions={colorOptions}
          tags={testOptions}
          style={{ textAlign: 'center' }}
          shuffle={true}
        />
      </div>
      <TestPreviewOverlay testId={testId} testType={testType} />
    </Fragment>
  );
});

export default Part3TestPreviewContent;
