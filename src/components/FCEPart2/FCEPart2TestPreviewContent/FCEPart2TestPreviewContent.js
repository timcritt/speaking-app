import React from 'react';
import { Fragment } from 'react';

const FCEPart2TestPreviewContent = ({ test }) => {
  return (
    <Fragment>
      <img alt='could not load' className='thumbnail' src={test.imageOneUrl}></img>
      <img alt='could not load' className='thumbnail' src={test.imageTwoUrl}></img>
    </Fragment>
  );
};

export default FCEPart2TestPreviewContent;
