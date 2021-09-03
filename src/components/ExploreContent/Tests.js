import React from 'react';
import { Link } from 'react-router-dom';

//custom components
import TestPreview from 'components/common/TestPreview';
import FCEPart3TestPreviewContent from 'components/Part3Common/Part3TestPreviewContent';
import { FCEPart2, FCEPart3, CAEPart2, CAEPart3 } from 'APIHandlers/firebaseConsts';

import FCEPart2TestPreviewContent from '../FCEPart2/FCEPart2TestPreviewContent';
import CAEPart2TestPreviewContent from 'components/CAEPart2/CAEPart2TestPreviewContent';

const Tests = ({ results = [], testType }) => {
  console.log(testType);

  return (
    <main>
      <div className='explore-content-main'>
        <div className='all-tests-container'>
          {results && results.length > 0 ? (
            results.map((doc) => {
              if (testType === FCEPart2) {
                return (
                  <TestPreview
                    testId={doc.id}
                    questionOne={doc.questionOne}
                    testType={testType}
                    key={doc.id}
                  >
                    <FCEPart2TestPreviewContent test={doc} />
                  </TestPreview>
                );
              } else if (testType === FCEPart3) {
                return (
                  <TestPreview testId={doc.id} questionOne={doc.questionOne} key={doc.id}>
                    <FCEPart3TestPreviewContent
                      test={doc}
                      key={doc.id}
                      bottomLabel={'FCE Part 3'}
                    />
                  </TestPreview>
                );
              } else if (testType === CAEPart2) {
                return (
                  <TestPreview testId={doc.id} questionOne={doc.questionOne} key={doc.id}>
                    <CAEPart2TestPreviewContent test={doc} key={doc.id} />
                  </TestPreview>
                );
              } else if (testType === CAEPart3) {
                return (
                  <TestPreview testId={doc.id} questionOne={doc.questionOne} key={doc.id}>
                    <FCEPart3TestPreviewContent
                      test={doc}
                      key={doc.id}
                      bottomLabel={'CAE Part 3'}
                    />
                  </TestPreview>
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
    </main>
  );
};

export default Tests;
