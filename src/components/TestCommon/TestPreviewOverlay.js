import React from 'react';
import ShareButton from 'components/common/ShareButton';
import { Link } from 'react-router-dom';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import AddToMyFolders from 'components/common/AddToMyFolders';

const TestPreviewOverlay = ({ testType, testId }) => {
  return (
    <div className='test-preview-overlay'>
      <div className='overlay-bottom-right'>
        <div className='circle-icon-container'>
          <ShareButton sharedItemType='' iconColour='white' />
        </div>
        <Link to={`/${testType}/${testId}`} className='tool-bar-btn' style={{ color: 'white' }}>
          <div className='circle-icon-container'>
            <VisibilityOutlinedIcon />
          </div>
        </Link>
        <div className='circle-icon-container'>
          <AddToMyFolders iconColor={'white'} testId={testId} />
        </div>
      </div>
    </div>
  );
};

export default TestPreviewOverlay;
