import React, { Fragment } from 'react';

const CAEPart2TestPreviewContent = ({ test }) => {
  return (
    <Fragment>
      <img alt='could not load' className='thumbnail part3-thumbnail' src={test.imageOneUrl} />
      <img alt='could not load' className='thumbnail part3-thumbnail' src={test.imageTwoUrl} />
      <img alt='could not load' className='thumbnail part3-thumbnail' src={test.imageThreeUrl} />
    </Fragment>
  );
};

export default CAEPart2TestPreviewContent;
