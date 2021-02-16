import React from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const FCEPart2TestPreviewContent = ({ test }) => {
  return (
    <Fragment>
      <div className='img-wrap' key={test.id}>
        <img className='thumbnail' src={test.imageOneUrl}></img>
        <img className='thumbnail' src={test.imageTwoUrl}></img>
      </div>
      <div className='test-preview-part-label'>FCE Part 2</div>
    </Fragment>
  );
};

export default FCEPart2TestPreviewContent;
