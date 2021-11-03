import React, { useEffect, useState } from 'react';
import ShareButton from 'components/common/ShareButton';
import { Link } from 'react-router-dom';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import AddToMyFolders from 'components/common/AddToMyFolders';

const TestPreviewOverlay = ({ testType, testId }) => {
  //stores the url of the test. is passed down to ShareButton, which appears in the hover overlay.

  const [location, setLocation] = useState();

  //Location is passed down as the link to be used on the ShareButton. Sharebutton url defaults to window.location.href if location prop not provided.
  useEffect(() => {
    console.log('testPreviewOverlay is mounted');
    setLocation(`${window.location.host}/${testType}/${testId}`);
  }, [testType, testId]);

  return (
    <div className='test-preview-overlay'>
      <div className='overlay-bottom-right'>
        <div className='circle-icon-container'>
          <ShareButton sharedItemType='' iconColour='white' location={location} />
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
