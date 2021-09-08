import React, { Fragment } from 'react';
import TestPreviewOverlay from 'components/TestCommon/TestPreviewOverlay';

const CAEPart2TestPreviewContent = ({ test, testId, testType }) => {
  return (
    <Fragment>
      <div className='test-grow-hover-container' onClick={(e) => e.stopPropagation()}>
        <div className='img-wrap test-preview-grow-on-hover' key={test.id}>
          <img className='thumbnail part3-thumbnail' src={test.imageOneUrl} />
          <img className='thumbnail part3-thumbnail' src={test.imageTwoUrl} />
          <img className='thumbnail part3-thumbnail' src={test.imageThreeUrl} />
        </div>
        <TestPreviewOverlay testId={testId} testType={testType} />
      </div>
      <div className='test-preview-part-label'>CAE Part 2</div>
    </Fragment>
  );
};

export default CAEPart2TestPreviewContent;
