import React from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const CAEPart2TestPreviewContent = ({ test }) => {
  return (
    <Fragment>
      <div className='test-preview-image-row' key={test.id}>
        <div className='test-preview-image-container-left'>
          <img className='CAE-Part2-thumbnail-image' src={test.imageOneUrl} />
        </div>
        <div className='test-preview-image-container-centre'>
          <img className='CAE-Part2-thumbnail-image' src={test.imageTwoUrl} />
        </div>
        <div className='test-preview-image-container-right'>
          <img className='CAE-Part2-thumbnail-image' src={test.imageThreeUrl} />
        </div>
      </div>
      <div className='test-preview-part-label'>CAE Part 2</div>
    </Fragment>
  );
};

export default CAEPart2TestPreviewContent;
