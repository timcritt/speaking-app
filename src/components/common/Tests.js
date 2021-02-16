import React from 'react';
import TestPreview from 'components/common/TestPreview';
import FCEPart3TestPreviewContent from 'components/FCEPart3/FCEPart3TestPreviewContent';
import { FCEPart2 } from 'APIHandlers/firebaseConsts';
import { FCEPart3 } from 'APIHandlers/firebaseConsts';
import FCEPart2TestPreviewContent from './FCEPart2TestPreviewContent';
import { Link } from 'react-router-dom';

const Tests = ({ results = [], testType }) => {
  return (
    <content>
      <div className='explore-content-main'>
        <div className='all-tests-container'>
          {results && results.length > 0 ? (
            results.map((doc) => {
              if (testType === FCEPart2) {
                return (
                  <Link
                    className='test-preview-link'
                    to={`/FCEPart2/${doc.id}`}
                    key={`fce2` + doc.id}
                  >
                    <TestPreview
                      testId={doc.id}
                      question={doc.question}
                      testType={testType}
                    >
                      <FCEPart2TestPreviewContent test={doc} />
                    </TestPreview>
                  </Link>
                );
              } else if ((testType = FCEPart3)) {
                return (
                  <Link
                    className='test-preview-link'
                    to={`/FCEPart3/${doc.id}`}
                    key={doc.id}
                  >
                    <TestPreview testId={doc.id} question={doc.question}>
                      <FCEPart3TestPreviewContent test={doc} />
                    </TestPreview>
                  </Link>
                );
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
