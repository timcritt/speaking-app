import React, { Fragment } from 'react';
import { TagCloud } from 'react-tagcloud';

const FCEPart3TestPreviewContent = React.memo(({ test }) => {
  const testOptions = [
    { value: test.topLeft, count: 10 },
    { value: test.topRight, count: 12 },
    { value: test.bottomLeft, count: 18 },
    { value: test.bottomRight, count: 35 },
    { value: test.bottomCentre, count: 26 },
  ];

  const colorOptions = {
    luminosity: 'light',
    hue: 'blue',
  };

  return (
    <Fragment>
      <div className='part3-test-preview-options-container' key={test.id}>
        <TagCloud
          minSize={30}
          maxSize={40}
          colorOptions={colorOptions}
          tags={testOptions}
          style={{ textAlign: 'center' }}
          shuffle={true}
        />
      </div>

      <div className='test-preview-part-label'>
        <span>FCE Part 3</span> <span className='kebab-menu'></span>
      </div>
    </Fragment>
  );
});

export default FCEPart3TestPreviewContent;
