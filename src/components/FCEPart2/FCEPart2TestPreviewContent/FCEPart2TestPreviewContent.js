import React from 'react';
import { Fragment } from 'react';

const FCEPart2TestPreviewContent = ({ test }) => {
  return (
    <Fragment>
      <img alt='could not load' className='thumbnail' src={test.imageOneThumbUrl}></img>
      <img alt='could not load' className='thumbnail' src={test.imageTwoThumbUrl}></img>
    </Fragment>
  );
};

export default FCEPart2TestPreviewContent;
