import React from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import ShareButton from 'components/common/ShareButton';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import AddToMyFolders from 'components/common/AddToMyFolders';

const FCEPart2TestPreviewContent = ({ test, testId, testType }) => {
  return (
    <Fragment>
      <div className='test-grow-hover-container' onClick={(e) => e.stopPropagation()}>
        <div className='img-wrap test-preview-grow-on-hover' key={test.id}>
          <img alt='could not load' className='thumbnail' src={test.imageOneUrl}></img>
          <img alt='could not load' className='thumbnail' src={test.imageTwoUrl}></img>
        </div>
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
      </div>
      <div className='test-preview-part-label'>FCE Part 2</div>
    </Fragment>
  );
};

export default FCEPart2TestPreviewContent;
