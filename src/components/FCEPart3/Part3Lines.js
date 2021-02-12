import React, { Fragment } from 'react';
import LineTo from 'react-lineto';

const Part3Lines = ({ windowDimensions, lineClass }) => {
  return (
    <Fragment>
      <LineTo
        borderColor={'#dbdbdb'}
        zIndex={0}
        within={'part3-grid-container'}
        innerState={windowDimensions}
        from='part3-option-top-left'
        to='part3-question-centre'
        className={`line ${lineClass}`}
      />
      <LineTo
        borderColor={'#dbdbdb'}
        within={'part3-grid-container'}
        innerState={windowDimensions}
        from='part3-option-top-right'
        to='part3-question-centre'
        className={`line ${lineClass}`}
      />
      <LineTo
        borderColor={'#dbdbdb'}
        within={'part3-grid-container'}
        innerState={windowDimensions}
        from='part3-option-bottom-left'
        to='part3-question-centre'
        className={`line ${lineClass}`}
      />
      <LineTo
        borderColor={'#dbdbdb'}
        within={'part3-grid-container'}
        innerState={windowDimensions}
        from='part3-option-bottom-centre'
        to='part3-question-centre'
        className={`line ${lineClass}`}
      />
      <LineTo
        borderColor={'#dbdbdb'}
        within={'part3-grid-container'}
        innerState={windowDimensions}
        from='part3-option-bottom-right'
        to='part3-question-centre'
        className={`line ${lineClass}`}
      />
    </Fragment>
  );
};

export default Part3Lines;
