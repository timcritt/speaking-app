import React from 'react';
import useFirestore from '../../hooks/useFirestore';
import Modal from 'components/common/Modal';
import { folders } from '../../APIHandlers/firebaseConsts';
import Folders from 'components/common/Folders';
import FolderSummaryShort from './FolderSummaryShort';
import CreateNewFolder from 'components/common/CreateNewFolder';

function AddToMyFoldersModal({ userId, closeAddToFolderModal, testId }) {
  const { docs } = useFirestore(folders, userId);
  return (
    <Modal
      onClick={(e) => e.stopPropagation()}
      className='open-add-folder-modal-btn'
      heading='Add test to...'
      setModalOpen={closeAddToFolderModal}
    >
      <div style={{ maxHeight: '50vh', overflowY: 'scroll' }} onClick={(e) => e.stopPropagation()}>
        <Folders folders={docs} testId={testId}>
          <FolderSummaryShort userId={userId} />
        </Folders>
      </div>
      <div className='modal-bottom-button-container'>
        <CreateNewFolder label={'NEW FOLDER'} />
      </div>
    </Modal>
  );
}

export default AddToMyFoldersModal;
