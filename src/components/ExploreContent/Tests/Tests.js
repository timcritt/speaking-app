import React from 'react';

//constants
import { FCEPart2, FCEPart3, CAEPart2, CAEPart3 } from 'APIHandlers/firebaseConsts';

//custom components
import TestPreview from 'components/common/TestPreview';
import FCEPart2TestPreviewContent from '../../FCEPart2/FCEPart2TestPreviewContent';
import CAEPart2TestPreviewContent from 'components/CAEPart2/CAEPart2TestPreviewContent';
import Part3TestPreviewContent from 'components/Part3Common/Part3TestPreviewContent';

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
                  <TestPreview
                    testId={doc.id}
                    questionOne={doc.questionOne}
                    key={doc.id}
                    testType={testType}
                  >
                    <Part3TestPreviewContent test={doc} />
                  </TestPreview>
                );
              } else if (testType === CAEPart2) {
                return (
                  <TestPreview
                    testId={doc.id}
                    questionOne={doc.questionOne}
                    key={doc.id}
                    testType={testType}
                  >
                    <CAEPart2TestPreviewContent test={doc} />
                  </TestPreview>
                );
              } else if (testType === CAEPart3) {
                return (
                  <TestPreview
                    testId={doc.id}
                    questionOne={doc.questionOne}
                    key={doc.id}
                    testType={testType}
                  >
                    <Part3TestPreviewContent test={doc} />
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
