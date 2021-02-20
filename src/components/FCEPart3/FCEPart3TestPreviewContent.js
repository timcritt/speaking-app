import React, { Fragment } from 'react';

const FCEPart3TestPreviewContent = ({ test }) => {
  return (
    <Fragment>
      <div className='part3-test-preview-options-container' key={test.id}>
        <div className='part3-test-preview-option-container ellipsis'>
          <span className='ellipsis'>- {test.topLeft}</span>
        </div>
        <div className='part3-test-preview-option-container ellipsis'>
          <span className='ellipsis'>- {test.topRight}</span>
        </div>
        <div className='part3-test-preview-option-container ellipsis'>
          <span className='ellipsis'> - {test.bottomLeft}</span>
        </div>
        <div className='part3-test-preview-option-container ellipsis'>
          <span className='ellipsis'> - {test.bottomRight}</span>
        </div>
        <div className='part3-test-preview-option-container ellipsis'>
          <span className='ellipsis'>- {test.bottomCentre}</span>
        </div>
      </div>

      <div className='test-preview-part-label'>
        <span>FCE Part 3</span> <span className='kebab-menu'></span>
      </div>
    </Fragment>
  );
};

export default FCEPart3TestPreviewContent;
