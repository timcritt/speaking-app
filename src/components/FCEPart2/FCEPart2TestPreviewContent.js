import React from 'react';
import { Fragment } from 'react';
import TestPreviewOverlay from 'components/TestCommon/TestPreviewOverlay';

const FCEPart2TestPreviewContent = ({ test, testId, testType }) => {
  return (
    <Fragment>
      <div className='test-grow-hover-container' onClick={(e) => e.stopPropagation()}>
        <div className='img-wrap test-preview-grow-on-hover' key={test.id}>
          <img alt='could not load' className='thumbnail' src={test.imageOneUrl}></img>
          <img alt='could not load' className='thumbnail' src={test.imageTwoUrl}></img>
        </div>
        <TestPreviewOverlay testId={testId} testType={testType} />
      </div>
      <div className='test-preview-part-label'>FCE Part 2</div>
    </Fragment>
  );
};

export default FCEPart2TestPreviewContent;
