import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import ShareButton from 'components/common/ShareButton';
import AddToMyFolders from 'components/common/AddToMyFolders';

//icons
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FullscreenOutlinedIcon from '@material-ui/icons/FullscreenOutlined';
import FullscreenExitOutlinedIcon from '@material-ui/icons/FullscreenExitOutlined';

import styles from './ToolBarButtonsFCEPart2.module.css';

const ToolBarButtons = ({ userId, creatorId, testType, docRef, handleFullScreen }) => {
  return (
    <Fragment>
      {creatorId === userId && (
        <Link
          to={{
            pathname: `/Edit${testType}/${docRef}`,
          }}
        >
          <button className={`${styles.btn} hide-on-fullscreen`}>
            <EditOutlinedIcon />
          </button>
        </Link>
      )}
      <ShareButton styles={styles} className={`hide-on-fullscreen`} sharedItemType={'FCE Part 2'} />
      <div className='hide-on-fullscreen'>
        {userId && <AddToMyFolders styles={styles} testId={docRef} />}
      </div>
      <button
        className={`${styles.btn} open-fullscreen-btn hide-on-fullscreen`}
        onClick={() => handleFullScreen.enter()}
      >
        <FullscreenOutlinedIcon />
      </button>
      <button
        className={`${styles.btn} close-fullscreen-btn show-on-fullscreen`}
        onClick={() => handleFullScreen.exit()}
      >
        <FullscreenExitOutlinedIcon fontSize='large' style={{ color: 'black' }} />
      </button>
    </Fragment>
  );
};

export default ToolBarButtons;
