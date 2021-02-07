import React, { Fragment, useState } from 'react';
import Modal from './Modal';
import ShareModalContent from './ShareModalContent';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';

//place this component anywhere in the project and it will add a "share current page" ability with a modal that opens on button click.
const ShareButton = ({ sharedItemType = '' }) => {
  const [shareModalIsOpen, setShareModalIsOpen] = useState(false);

  return (
    <Fragment>
      {shareModalIsOpen && (
        <Modal
          className='open-add-folder-modal-btn'
          modalOpen={shareModalIsOpen}
          heading={`Share ${sharedItemType}`}
          setModalOpen={setShareModalIsOpen}
        >
          <ShareModalContent />
        </Modal>
      )}

      <button
        className='tool-bar-btn hide-on-fullscreen'
        onClick={() => setShareModalIsOpen(true)}
      >
        <ShareOutlinedIcon />
      </button>
    </Fragment>
  );
};

export default ShareButton;
