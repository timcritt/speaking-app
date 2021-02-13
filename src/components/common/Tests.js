import React from 'react';
import TestPreview from 'components/common/TestPreview';
import Part3Preview from 'components/FCEPart3/Part3Preview';
import { FCEPart2 } from 'APIHandlers/firebaseConsts';
import { FCEPart3 } from 'APIHandlers/firebaseConsts';

const Tests = ({ results = [], testType }) => {
  return (
    <content>
      <div className='explore-content-main'>
        <div className='all-tests-container'>
          {results && results.length > 0 ? (
            results.map((doc) => {
              if (testType === FCEPart2) {
                return (
                  <TestPreview
                    key={`fce2` + doc.id}
                    test={doc}
                    testType={testType}
                  />
                );
              } else if ((testType = FCEPart3)) {
                return <Part3Preview key={doc.id} test={doc} />;
              }
              return <h1>fail</h1>;
            })
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
