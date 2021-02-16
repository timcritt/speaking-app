import React, { Fragment } from 'react';

const FCEPart3TestPreviewContent = ({ test }) => {
  return (
    <Fragment>
      <div className='part3-test-preview-options-container' key={test.id}>
        <div>
          <span>{test.topLeft}</span>
        </div>
        <div>
          <span>{test.topRight}</span>
        </div>
        <div>
          <span>{test.bottomLeft}</span>
        </div>
        <div>
          <span>{test.bottomRight}</span>
        </div>
        <span>{test.bottomCentre}</span>
      </div>
      <div className='test-preview-part-label'>FCE Part 3</div>
    </Fragment>
  );
};

export default FCEPart3TestPreviewContent;
