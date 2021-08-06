import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

//custom components
import CreatorInfo from 'components/common/CreatorInfo';
import Timer from 'components/common/Timer';
import ShareButton from 'components/common/ShareButton';
import Modal from 'components/common/Modal';
import AddToMyFolders from 'components/common/AddToMyFolders';

//icons
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import FullscreenOutlinedIcon from '@material-ui/icons/FullscreenOutlined';
import FullscreenExitOutlinedIcon from '@material-ui/icons/FullscreenExitOutlined';

const TestToolBarView = ({
  creatorId,
  userId,
  docRef,
  time,
  handleFullScreen,
  testType,
}) => {
  const openAddToFolderModal = () => {
    setAddToFolderModalOpen(true);
  };
  const closeAddToFolderModal = () => {
    setAddToFolderModalOpen(false);
  };
  const [AddToFolderModalOpen, setAddToFolderModalOpen] = useState(false);
  return (
    <Fragment>
      {AddToFolderModalOpen && (
        <Modal
          className='open-add-folder-modal-btn'
          heading='Add test to folder'
          setModalOpen={closeAddToFolderModal}
        >
          <AddToMyFolders testId={docRef} />
        </Modal>
      )}
      <div className='tool-bar-row'>
        {creatorId && <CreatorInfo creatorId={creatorId} />}
        <Timer time={time} />

        <div className='tool-btn-container'>
          {creatorId === userId && (
            <Link
              to={{
                pathname: `/Edit${testType}/${docRef}`,
              }}
            >
              <button className='tool-bar-btn hide-on-fullscreen'>
                <EditOutlinedIcon />
              </button>
            </Link>
          )}
          <ShareButton
            className='tool-bar-btn hide-on-fullscreen'
            sharedItemType={'FCE Part 2'}
          />
          <button
            className='tool-bar-btn hide-on-fullscreen'
            onClick={() => openAddToFolderModal(true)}
          >
            <PlaylistAddOutlinedIcon />
          </button>
          <button
            className='tool-bar-btn open-fullscreen-btn hide-on-fullscreen'
            onClick={() => handleFullScreen.enter()}
          >
            <FullscreenOutlinedIcon />
          </button>
          <button
            className='tool-bar-btn close-fullscreen-btn show-on-fullscreen'
            onClick={() => handleFullScreen.exit()}
          >
            <FullscreenExitOutlinedIcon
              fontSize='large'
              style={{ color: 'black' }}
            />
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default TestToolBarView;
