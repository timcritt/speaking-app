import React from 'react';
import LineTo from 'react-lineto';

const Part3Lines = ({
  windowDimensions,
  lineClass,
  top_left,
  top_right,
  bottom_left,
  bottom_centre,
  bottom_right,
  centre,
}) => {
  return (
    <div key={Date.now()} className={'fadeIn'}>
      <LineTo
        borderColor={'#dbdbdb'}
        zIndex={0}
        within={'part3-grid-container'}
        innerState={windowDimensions}
        from={top_left}
        to={centre}
        className={`line ${lineClass}`}
      />
      <LineTo
        borderColor={'#dbdbdb'}
        within={'part3-grid-container'}
        innerState={windowDimensions}
        from={top_right}
        to={centre}
        className={`line ${lineClass}`}
      />
      <LineTo
        borderColor={'#dbdbdb'}
        within={'part3-grid-container'}
        innerState={windowDimensions}
        from={bottom_centre}
        to={centre}
        className={`line ${lineClass}`}
      />
      <LineTo
        borderColor={'#dbdbdb'}
        within={'part3-grid-container'}
        innerState={windowDimensions}
        from={bottom_left}
        to={centre}
        className={`line ${lineClass}`}
      />
      <LineTo
        borderColor={'#dbdbdb'}
        within={'part3-grid-container'}
        innerState={windowDimensions}
        from={bottom_right}
        to={centre}
        className={`line ${lineClass}`}
      />
    </div>
  );
};

export default Part3Lines;
