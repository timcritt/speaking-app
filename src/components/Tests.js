import React from 'react';
import TestPreview from './TestPreview';

const Tests = ({ results = [] }) => {
  return (
    <content>
      <div className='explore-content-main'>
        <div className='all-tests-container'>
          {results && results.length > 0 ? (
            results.map((doc) => <TestPreview key={doc.id} test={doc} />)
          ) : (
            <div>
              <span>no results!</span>
            </div>
          )}
        </div>
      </div>
    </content>
  );
};

export default Tests;
