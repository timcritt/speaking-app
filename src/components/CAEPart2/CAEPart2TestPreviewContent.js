import React from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const CAEPart2TestPreviewContent = ({ test }) => {
  return (
    <Fragment>
      <div className='img-wrap' key={test.id}>
        <img
          className='thumbnail'
          src={test.imageOneUrl}
          style={{ maxWidth: '33.333%' }}
        />
        <img
          className='thumbnail'
          src={test.imageTwoUrl}
          style={{ maxWidth: '33.333%' }}
        />
        <img
          className='thumbnail'
          src={test.imageThreeUrl}
          style={{ maxWidth: '33.333%' }}
        />
      </div>
      <div className='test-preview-part-label'>CAE Part 2</div>
    </Fragment>
  );
};

export default CAEPart2TestPreviewContent;
