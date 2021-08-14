import React from 'react';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';

import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import AddToMyFolders from 'components/common/AddToMyFolders';
import ShareButton from 'components/common/ShareButton';

const TestPreview = ({ question, children, testId }) => {
  return (
    <Fragment>
      <div className='test-preview-overlay'>
        <div className='overlay-bottom-right'>
          <div className='circle-icon-container'>
            <ShareButton sharedItemType='' iconColour='white' />
          </div>
          <Link
            to={`/FCEPart2/${testId}`}
            className='tool-bar-btn'
            style={{ color: 'white' }}
          >
            <div className='circle-icon-container'>
              <VisibilityOutlinedIcon />
            </div>
          </Link>
          <div className='circle-icon-container'>
            <AddToMyFolders iconColor={'white'} testId={testId} />
          </div>
        </div>
      </div>
      <div className='test-preview-container fade-in'>
        <div className='test-preview-question-container dont-break-out'>
          <span>{question}</span>
        </div>
        {children}
      </div>
    </Fragment>
  );
};

export default TestPreview;
