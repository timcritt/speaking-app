import React, { Fragment } from 'react';
import { TagCloud } from 'react-tagcloud';
import TestPreviewOverlay from 'components/TestCommon/TestPreviewOverlay';

const CAEPart3TestPreviewContent = React.memo(({ test, testId, testType }) => {
  const testOptions = [
    { value: test.topLeft, count: 10, key: 1 },
    { value: test.topRight, count: 12, key: 2 },
    { value: test.bottomLeft, count: 18, key: 3 },
    { value: test.bottomRight, count: 35, key: 4 },
    { value: test.bottomCentre, count: 26, key: 5 },
  ];

  const colorOptions = {
    luminosity: 'light',
    hue: 'blue',
  };

  return (
    <Fragment>
      <div className='test-grow-hover-container' onClick={(e) => e.stopPropagation()}>
        <div
          className='part3-test-preview-options-container test-preview-grow-on-hover'
          key={test.id}
        >
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
      </div>
      <div className='test-preview-part-label'>
        <span>CAE Part 3</span>
      </div>
    </Fragment>
  );
});

export default CAEPart3TestPreviewContent;
