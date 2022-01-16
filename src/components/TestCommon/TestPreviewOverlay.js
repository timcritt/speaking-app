import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { firebaseAuth } from '../../context/AuthProvider';

//3rd party components
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';

//custom components
import ShareButton from 'components/common/ShareButton';
import AddToMyFolders from 'components/common/AddToMyFolders';

//custom hooks
import useToggleClassOnClick from 'hooks/useToggleClassOnClick';

const TestPreviewOverlay = ({ testType, testId }) => {
  //stores the url of the test. is passed down to ShareButton, which appears in the hover overlay.
  const { token } = useContext(firebaseAuth);
  const { ref, classApplied, setClassApplied } = useToggleClassOnClick();

  const [location, setLocation] = useState();

  //Location is passed down as the link to be used on the ShareButton. Sharebutton url defaults to window.location.href if location prop not provided.
  useEffect(() => {
    setLocation(`${window.location.host}/${testType}/${testId}`);
  }, [testType, testId]);

  const handleClick = () => {
    //checks if device is touchscreen. Needed to deal with lack of hover effect on touchscreen devices, which would cause buttons to be accidentally clicked when overlay touched.
    const isTouchDevice = () => {
      return (
        'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
      );
    };

    if (isTouchDevice()) {
      setClassApplied('test-grow-hover-container-hover-mobile');
    }
  };

  return (
    <div className={`test-preview-overlay ${classApplied}`} ref={ref} onClick={handleClick}>
      <div className='overlay-bottom-right'>
        <div className='circle-icon-container'>
          <ShareButton sharedItemType='' iconColour='white' location={location} />
        </div>
        <Link to={`/${testType}/${testId}`} className='tool-bar-btn' style={{ color: 'white' }}>
          <div className='circle-icon-container'>
            <VisibilityOutlinedIcon />
          </div>
        </Link>
        {token && (
          <div className='circle-icon-container'>
            <AddToMyFolders iconColor={'white'} testId={testId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TestPreviewOverlay;
